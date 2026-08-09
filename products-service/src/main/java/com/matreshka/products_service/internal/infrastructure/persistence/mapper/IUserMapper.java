package com.matreshka.products_service.internal.infrastructure.persistence.mapper;

import com.matreshka.products_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.products_service.delivery.http.dto.FavoriteAdvertResponseDTO;
import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IUserMapper {
    @Mapping(target = "favoriteAdverts", ignore = true)
    UserEntity toEntity(UserRegisteredEvent user);

    @Mapping(target = "isFavorite", constant = "true")
    FavoriteAdvertResponseDTO toFavoriteAdvertResponseDTO(AdvertEntity advert);
}