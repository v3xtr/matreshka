package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.http.dto.*;
import com.matreshka.products_service.internal.domain.AdvertDocument;
import com.matreshka.products_service.internal.infrastructure.persistence.*;
import org.mapstruct.*;

import java.util.List;
import java.util.Objects;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = "spring"
)
public interface IAdvertEntityMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pictures", expression = "java(mapPictures(dto.pictures()))")
    @Mapping(target = "services", expression = "java(mapServices(dto.services()))")
    @Mapping(target = "workSchedule", expression = "java(mapWorkSchedule(dto.workSchedule()))")
    @Mapping(target = "video", expression = "java(mapVideoIdToEntity(dto.videoId()))")
    AdvertEntity toEntity(AdvertCreateRequestDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pictures", expression = "java(mapPictures(dto.pictures()))")
    @Mapping(target = "services", expression = "java(mapServices(dto.services()))")
    @Mapping(target = "workSchedule", expression = "java(mapWorkSchedule(dto.workSchedule()))")
    @Mapping(target = "video", expression = "java(mapVideoIdToEntity(dto.videoId()))")
    void toEntity(AdvertUpdateRequestDTO dto, @MappingTarget AdvertEntity existing);

    default List<PictureEntity> mapPictures(List<AdvertCreateRequestDTO.PictureDTO> pictureDTOs) {
        if (pictureDTOs == null) return null;
        return pictureDTOs.stream()
                .map(dto -> PictureEntity.builder()
                        .pictureUrl(dto.pictureUrl())
                        .build())
                .toList();
    }

    default List<ServiceEntity> mapServices(List<AdvertCreateRequestDTO.ServiceDTO> serviceDTOs) {
        if (serviceDTOs == null) return null;
        return serviceDTOs.stream()
                .map(dto -> ServiceEntity.builder()
                        .text(dto.text())
                        .build())
                .toList();
    }

    default List<WorkPeriodEntity> mapWorkSchedule(List<AdvertCreateRequestDTO.WorkScheduleDTO> scheduleDTOs) {
        if (scheduleDTOs == null) return null;
        return scheduleDTOs.stream()
                .map(dto -> WorkPeriodEntity.builder()
                        .fromDay(dto.fromDay() != null ? dto.fromDay().getValue() : null)
                        .toDay(dto.toDay() != null ? dto.toDay().getValue() : null)
                        .fromTime(dto.fromTime())
                        .toTime(dto.toTime())
                        .is24h(dto.is24h())
                        .build())
                .toList();
    }

    default MediaEntity mapVideoIdToEntity(String videoId) {
        if (videoId == null || videoId.isBlank()) return null;
        return MediaEntity.builder().id(videoId).build();
    }

    @Mapping(target = "id", expression = "java(entity.getId() != null ? entity.getId().toString() : null)")
    @Mapping(target = "pictureUrls", expression = "java(mapPictureUrls(entity.getPictures()))")
    AdvertDocument toDocument(AdvertEntity entity);

    default List<String> mapPictureUrls(List<PictureEntity> pictures) {
        if (pictures == null || pictures.isEmpty()) {
            return List.of();
        }
        return pictures.stream()
                .map(PictureEntity::getPictureUrl)
                .filter(Objects::nonNull)
                .toList();
    }

    @Mapping(target = "pictureUrls", expression = "java(mapPictureUrls(entity.getPictures()))")
    @Mapping(target = "video", source = "video")
    @Mapping(target = "services", source = "services")
    @Mapping(target = "workSchedule", source = "workSchedule")
    AdvertGetAdvertResponseDTO toResponseDTO(AdvertEntity entity);

    ServiceResponseDTO toServiceDTO(ServiceEntity entity);

    WorkPeriodResponseDTO toWorkPeriodDTO(WorkPeriodEntity entity);

    MediaResponseDTO toMediaResponseDTO(MediaEntity mediaEntity);

    AdvertUpdateRequestDTO toUpdateRequestDTO(AdvertEntity entity);

    @Mapping(target = "pictureUrls", expression = "java(getFirstPictureUrl(document.getPictureUrls()))")
    AdvertSearchResponseDTO toSearchResponseDTO(AdvertDocument document);

    default String getFirstPictureUrl(List<String> urls) {
        if (urls == null || urls.isEmpty()) {
            return null;
        }
        String first = urls.getFirst();
        return (first == null || first.isBlank()) ? null : first;
    }
}