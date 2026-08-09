package com.matreshka.feed_service.internal.infrastructure.mapper;

import com.matreshka.feed_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.feed_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.feed_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.feed_service.delivery.http.dto.UserWithVideosResponseDTO;
import com.matreshka.feed_service.internal.infrastructure.persistence.FavoriteVideo;
import com.matreshka.feed_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {IVideoRepo.class})
public interface IUserMapper {

    @Mapping(target = "videos", ignore = true)
    @Mapping(target = "id", ignore = true )
    UserResponseDTO toResponseDTO(Optional<UserEntity> userEntity);

    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "favoriteVideos", ignore = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "videos", ignore = true)
    UserEntity toEntity(UserRegisteredEvent userRequestDTO);

    @Mapping(target = "videos", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "favoriteVideos", ignore = true)
    UserEntity toEntity(UserUpdatedEvent userRequestDTO);

    @Mapping(target = "favoriteVideos", source = "favoriteVideos", qualifiedByName = "mapFavoriteVideosToIds")
    UserWithVideosResponseDTO toDtoWithFavorites(UserEntity entity);

    @Named("mapFavoriteVideosToIds")
    default List<String> mapFavoriteVideosToIds(List<FavoriteVideo> favoriteVideos) {
        if (favoriteVideos == null) {
            return Collections.emptyList();
        }
        return favoriteVideos.stream()
                .map(fav -> {
                    assert fav.getVideo().getId() != null;
                    return fav.getVideo().getId().toString();
                })
                .toList();
    }
}

