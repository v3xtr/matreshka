package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.http.dto.AdvertCreateRequestDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertCreateResponseDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertUpdateRequestDTO;
import com.matreshka.products_service.internal.domain.AdvertDocument;
import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import org.mapstruct.*;

import java.util.Optional;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = "spring"
)
public interface IAdvertEntityMapper {

    AdvertEntity toEntity(AdvertCreateRequestDTO dto);

    AdvertEntity toEntity(AdvertUpdateRequestDTO dto);

    AdvertDocument toDocument(AdvertEntity entity);

    AdvertCreateResponseDTO toResponseDTO(Optional<AdvertEntity> entity);

    AdvertCreateResponseDTO toDocumentResponseDTO(AdvertDocument document);

    AdvertUpdateRequestDTO toUpdateRequestDTO(AdvertEntity entity);

}