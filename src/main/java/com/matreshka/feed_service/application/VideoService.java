package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.broker.dto.MediaDeleteEvent;
import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;
import com.matreshka.feed_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.feed_service.internal.infrastructure.mapper.IVideoMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.FavoriteVideo;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.ViewEntity;
import com.matreshka.feed_service.internal.repo.IFavoriteVideoRepo;
import com.matreshka.feed_service.internal.repo.IUserRepo;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import com.matreshka.feed_service.internal.repo.IViewRepo;
import com.matreshka.feed_service.internal.repo.port.IVideoCacheRepo;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService implements IVideoService {
    private final IVideoRepo videoRepo;
    private final IVideoMapper videoMapper;
    private final IUserMapper userMapper;
    private final IUserRepo userRepo;
    private final IFavoriteVideoRepo favoriteVideoRepo;
    private final IVideoCacheRepo videoCacheRepo;
    private final IViewRepo viewRepo;

    @Override
    @Transactional
    public void processMedia(MediaEvent mediaEvent) {
        UUID mediaId = UUID.fromString(mediaEvent.id());

        if (videoRepo.existsById(mediaId)) {
            log.info("[VideoService] Video {} already exists, skipping", mediaId);
            return;
        }

        UserEntity user = userRepo.findById(mediaEvent.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + mediaEvent.userId()));

        VideoEntity video = videoMapper.toEntity(mediaEvent);

        video.setUser(user);

        videoRepo.save(video);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserViews(String userId) {
        UserEntity user = userRepo.findByIdWithVideos(userId)
                .orElseThrow(() -> new IllegalArgumentException("Пользователь не найден: " + userId));

        return userMapper.toResponseDTO(Optional.of(user));
    }

    @Override
    @Transactional(readOnly = true)
    public VideoDetailResponseDTO getVideo(String userId, UUID videoId) {
        VideoEntity video = videoRepo.getVideoWithLikesAndComments(videoId);
        if (video == null) {
            throw new IllegalArgumentException("Видео не найдено: " + videoId);
        }

        boolean isFavorite = favoriteVideoRepo.existsByUserIdAndVideoId(userId, videoId);
        return videoMapper.toDetailResponseDTO(video, isFavorite);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VideoShortResponseDTO> getVideosWelcome(VideoShortRequestDTO videoShortRequestDTO){
        List<VideoEntity> videos = videoRepo.findRandomWithSeed(
                videoShortRequestDTO.seed(),
                videoShortRequestDTO.size(),
                videoShortRequestDTO.page() * videoShortRequestDTO.size()
        );
        return videoMapper.toShortResponseDTO(videos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserWithVideosResponseDTO> getFavoriteVideos(String userId){
        UserEntity user = userRepo.findWithFavoritesById(userId);
        return Collections.singletonList(userMapper.toDtoWithFavorites(user));
    }

    @Override
    @Transactional
    public void markAsFavorite(String userId, UUID videoUuid) {
        if (favoriteVideoRepo.findByUserIdAndVideoId(userId, videoUuid).isPresent()) {
            log.info("[VideoService] Video {} already in favorites for user {}", videoUuid, userId);
            return;
        }

        UserEntity userRef = userRepo.getReferenceById(userId);
        VideoEntity videoRef = videoRepo.getReferenceById(videoUuid);

        FavoriteVideo favoriteVideo = new FavoriteVideo();
        favoriteVideo.setUser(userRef);
        favoriteVideo.setVideo(videoRef);
        favoriteVideo.setFavorite(true);

        favoriteVideoRepo.save(favoriteVideo);
        log.info("[VideoService] Video {} marked as favorite for user {}", videoUuid, userId);
    }

    @Override
    @Transactional
    public void unmarkAsFavorite(String userId, UUID videoUuid) {
        favoriteVideoRepo.deleteByUserIdAndVideoId(userId, videoUuid);
        log.info("[VideoService] Video {} unmarked from favorites for user {}", videoUuid, userId);
    }

    @Override
    @Transactional
    public void addView(VideoRequestDTO dto) {
        String videoId = dto.videoId();
        String userId = dto.userId();

        boolean isViewInCache = videoCacheRepo.hasViewed(videoId, userId);

        if (isViewInCache) {
            log.debug("[VideoService] View already in cache for video {} and user {}", videoId, userId);
            return;
        }

        boolean isViewInDB = videoRepo.hasViewed(UUID.fromString(videoId), userId);

        if (isViewInDB) {
            videoCacheRepo.addView(videoId, userId);
            return;
        }

        videoCacheRepo.addView(videoId, userId);

        UserEntity userRef = userRepo.getReferenceById(userId);
        VideoEntity videoRef = videoRepo.getReferenceById(UUID.fromString(videoId));

        ViewEntity view = new ViewEntity();
        view.setUser(userRef);
        view.setVideo(videoRef);
        view.setViewedAt(LocalDateTime.now());

        viewRepo.save(view);

        log.info("[VideoService] New view registered for video {} by user {}", videoId, userId);
    }

    public void deleteVideo(DeleteVideoRequestDTO deleteVideoRequestDTO){
        try{
            videoRepo.deleteBys3Key(deleteVideoRequestDTO.s3Key());
        }catch (Exception e){
            throw new RuntimeException("Не удалось удалить видео");
        }
    }

    @Transactional
    public void deleteVideo(MediaDeleteEvent mediaDeleteEvent) {
        try {
            log.info("Attempting to delete video with s3Key: {}", mediaDeleteEvent.s3Key());

            videoRepo.findById(mediaDeleteEvent.id()).ifPresentOrElse(
                    video -> {
                        videoRepo.deleteBys3Key(video.getCdnUrl());
                        log.debug("Видео успешно удалено из БД");
                    },
                    () -> log.debug("Такого видео не существует, так что нечего удалять")
            );

        } catch (Exception e) {
            log.error("Failed to delete video from database for s3Key: {}", mediaDeleteEvent.s3Key(), e);
            throw new RuntimeException("Не удалось удалить видео", e);
        }
    }
}