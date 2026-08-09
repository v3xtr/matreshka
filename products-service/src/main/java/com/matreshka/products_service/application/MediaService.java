package com.matreshka.products_service.application;

import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.delivery.broker.dto.MediaEvent;
import com.matreshka.products_service.delivery.http.dto.MediaResponseDTO;
import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IMediaMapper;
import com.matreshka.products_service.internal.repo.IMediaRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService implements IMediaService {

    private final IMediaRepo mediaRepo;
    private final IMediaMapper mediaMapper;

    @Override
    public void processMedia(MediaEvent event) {
        MediaEntity media = mediaRepo.findById(event.id())
                .orElseGet(() -> mediaMapper.toMediaEntity(event));

        media.setCdnUrl(event.cdnUrl());
        media.setMimeType(event.mimeType());
        media.setType(event.type());
        media.setPublishedAt(event.publishedAt());

        mediaRepo.save(media);
    }

    @Override
    public void deleteMedia(String s3Key) {
        mediaRepo.deleteBys3Key(s3Key);
    }

    @Override
    public Optional<MediaResponseDTO> getStatus(String videoId) {
        return mediaRepo.findById(videoId)
                .filter(media -> media.getCdnUrl() != null)
                .map(media -> new MediaResponseDTO(
                        media.getId(),
                        media.getCdnUrl(),
                        media.getType(),
                        media.getMimeType(),
                        media.getPublishedAt()
                ));
    }
}