package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.broker.dto.MediaEvent;
import com.matreshka.feed_service.delivery.http.dto.*;
import com.matreshka.feed_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.feed_service.internal.infrastructure.mapper.IVideoMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.FavoriteVideo;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import com.matreshka.feed_service.internal.repo.IFavoriteVideoRepo;
import com.matreshka.feed_service.internal.repo.IUserRepo;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import com.matreshka.feed_service.internal.repo.port.IVideoCacheRepo;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public void addView(VideoRequestDTO videoRequestDTO){
        videoCacheRepo.addView(videoRequestDTO.id());
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
    public VideoDetailResponseDTO getVideo(UUID videoId) {
        VideoEntity video = videoRepo.getVideoWithLikesAndComments(videoId);
        if (video == null) {
            throw new IllegalArgumentException("Видео не найдено: " + videoId);
        }
        return videoMapper.toDetailResponseDTO(video);
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
}