package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IVideoService;
import com.matreshka.products_service.delivery.broker.dto.VideoEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.VideoEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IVideoMapper;
import com.matreshka.products_service.internal.repo.IVideoRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService implements IVideoService {

    private final IVideoRepo videoRepo;
    private final IVideoMapper videoMapper;

    public void processVideo(VideoEvent event) {
        VideoEntity video = videoMapper.toVideoEntity(event);
        videoRepo.save(video);
    }
}