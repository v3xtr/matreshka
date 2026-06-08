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

    public void processMedia(MediaEvent mediaEvent){
        VideoEntity video = videoMapper.toEntity(mediaEvent);
        videoRepo.save(video);
    }

    public void addView(VideoRequestDTO videoRequestDTO){
        VideoEntity videoEntity = videoMapper.toEntity(videoRequestDTO);

        videoRepo.save(videoEntity);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserViews(String userId) {
        UserEntity user = userRepo.findByIdWithVideos(userId)
                .orElseThrow(() -> new RuntimeException("Внутренняя ошибка сервера"));

        return userMapper.toResponseDTO(Optional.of(user));
    }

    @Transactional
    public VideoDetailResponseDTO getVideo(String videoId) {
        try{
            VideoEntity video = videoRepo.getVideoWithLikesAndComments(UUID.fromString(videoId));
            return videoMapper.toDetailResponseDTO(video);
        }catch (Exception e){
            log.error("[VideoService getVideo]: {}", e.getMessage());
            throw new RuntimeException("Внутряняя ошибка сервера");
        }
    }

    public List<VideoShortResponseDTO> getVideosWelcome(VideoShortRequestDTO videoShortRequestDTO){
        try{
            List<VideoEntity> videos = videoRepo.findRandomWithSeed(videoShortRequestDTO.seed(), videoShortRequestDTO.size(),
                    videoShortRequestDTO.page());
            return videoMapper.toShortResponseDTO(videos);
        }catch (Exception e){
            log.error("[VideoService getVideosWelcome]: {}", e.getMessage());
            throw new RuntimeException("Внутряняя ошибка сервера");
        }
    }

    @Transactional(readOnly = true)
    public List<UserWithVideosResponseDTO> getFavoriteVideos(String userId){
       UserEntity user = userRepo.findWithFavoritesById(userId);

       return Collections.singletonList(userMapper.toDtoWithFavorites(user));
    }

    @Transactional
    public void markAsFavorite(String userId, String videoId) {
        try {
            UUID videoUuid = UUID.fromString(videoId);

            if (favoriteVideoRepo.findByUserIdAndVideoId(userId, videoUuid).isPresent()) {
                log.info("[FavoriteService]: Video {} already in favorites for user {}", videoId, userId);
                return;
            }

            UserEntity userRef = userRepo.getReferenceById(userId);
            VideoEntity videoRef = videoRepo.getReferenceById(videoUuid); // Используй аналог getReferenceById / getById

            FavoriteVideo favoriteVideo = new FavoriteVideo();
            favoriteVideo.setUser(userRef);
            favoriteVideo.setVideo(videoRef);
            favoriteVideo.setFavorite(true);

            favoriteVideoRepo.save(favoriteVideo);
            log.info("[VideoService markAsFavorite]: Video {} marked as favorite for user {}", videoId, userId);

        } catch (Exception e) {
            log.error("[VideoService markAsFavorite] Error: {}", e.getMessage(), e);
            throw new RuntimeException("Внутренняя ошибка сервера");
        }
    }

    @Transactional
    public void unmarkAsFavorite(String userId, String videoId) {
        try {
            UUID videoUuid = UUID.fromString(videoId);

            favoriteVideoRepo.deleteByUserIdAndVideoId(userId, videoUuid);
            log.info("[VideoService unmarkAsFavorite]: Video {} unmarked from favorites for user {}", videoId, userId);
        } catch (Exception e) {
            log.error("[VideoService unmarkAsFavorite] Error: {}", e.getMessage(), e);
            throw new RuntimeException("Внутренняя ошибка сервера");
        }
    }
}
