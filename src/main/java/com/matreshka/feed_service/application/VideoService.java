package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.IVideoService;
import com.matreshka.feed_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoDetailResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoRequestDTO;
import com.matreshka.feed_service.delivery.http.dto.VideoResponseDTO;
import com.matreshka.feed_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.feed_service.internal.infrastructure.mapper.IVideoMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.infrastructure.persistence.VideoEntity;
import com.matreshka.feed_service.internal.repo.IUserRepo;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    public void addView(VideoRequestDTO videoRequestDTO){
        VideoEntity videoEntity = videoMapper.toEntity(videoRequestDTO);

        videoRepo.save(videoEntity);
    }

    @Transactional
    public UserResponseDTO getUserViews(String userId){
        Optional<UserEntity> userWithVideos = userRepo.findByIdWithVideos(userId);
        return userMapper.toResponseDTO(userWithVideos);
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
}
