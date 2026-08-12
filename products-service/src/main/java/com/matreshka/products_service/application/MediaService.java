package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import com.matreshka.products_service.internal.infrastructure.exception.NotFoundException;
import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.products_service.internal.repo.IAdvertRepo;
import com.matreshka.products_service.internal.repo.IMediaRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService implements IMediaService {

    private final IMediaRepo mediaRepo;
    private final IAdvertRepo advertRepo;
    private final IMediaMapper mediaMapper;

    @Override
    public void processMedia(MediaEvent event) {
        MediaEntity media = mediaRepo.findById(event.id())
                .orElseGet(() -> mediaMapper.toMediaEntity(event));

        media.setCdnUrl(event.cdnUrl());
        media.setMimeType(event.mimeType());
        media.setType(event.type());
        media.setPublishedAt(event.publishedAt());

        if (StringUtils.hasText(event.advertId())) {
            UUID advertId;
            try {
                advertId = UUID.fromString(event.advertId());
            } catch (IllegalArgumentException e) {
                log.error("[MediaService] Invalid productId in MediaEvent: {}", event.advertId(), e);
                throw new NotFoundException("Некорректный id объявления: " + event.advertId());
            }

            AdvertEntity advert = advertRepo.findById(advertId)
                    .orElseThrow(() -> new NotFoundException("Товар не найден: " + advertId));

            media.setAdvert(advert);
        }

        mediaRepo.save(media);
    }

    @Override
    public void deleteMedia(String s3Key) {
        mediaRepo.deleteBys3Key(s3Key);
    }
}