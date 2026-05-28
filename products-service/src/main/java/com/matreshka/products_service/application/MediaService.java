package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.products_service.internal.repo.IMediaRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService implements IMediaService {

    private final IMediaRepo mediaRepo;
    private final IMediaMapper videoMapper;

    public void processMedia(MediaEvent event) {
        MediaEntity media = videoMapper.toMediaEntity(event);
        mediaRepo.save(media);
    }
}