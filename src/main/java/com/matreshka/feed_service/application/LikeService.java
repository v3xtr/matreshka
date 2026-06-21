package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.ILikeService;
import com.matreshka.feed_service.delivery.http.dto.LikeRequestDTO;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import com.matreshka.feed_service.internal.repo.port.IVideoCacheRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService implements ILikeService {

    private final IVideoCacheRepo videoCacheRepo;
    private final IVideoRepo videoRepo;

    @Override
    public void like(LikeRequestDTO likeRequestDTO) {
        videoCacheRepo.like(likeRequestDTO.videoId());
    }

    @Override
    public void unlike(LikeRequestDTO likeRequestDTO) {
        videoCacheRepo.unlike(likeRequestDTO.videoId());
    }

    @Override
    public long getLikesCount(String videoId) {
        long dbLikes = videoRepo.getLikes(UUID.fromString(videoId));
        long cacheDelta = videoCacheRepo.getDelta(videoId);
        return dbLikes + cacheDelta;
    }
}
