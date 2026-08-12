package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.http.dto.*;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IProductsService {
    void create(String userId, AdvertCreateRequestDTO advertRequestDTO);

    List<AdvertSearchResponseDTO> search(@NotNull AdvertSearchRequestDTO dto) throws IOException;

    Optional<AdvertGetAdvertResponseDTO> getOne(UUID id);

    AdvertUpdateRequestDTO update(AdvertUpdateRequestDTO advertRequestDTO, String userId);

    String delete(UUID id, String s3Key) throws IOException;

    void addFavorite(String userId, UUID advertId);

    List<FavoriteAdvertResponseDTO> getFavorites(String userId);

    void removeFavorite(String userId, UUID advertId);

    List<AdvertGetAdvertResponseDTO> getUserAdverts(String userId);

    void updateVideoId(UpdateVideoInAdvertRequestDTO updateVideoInAdvertRequestDTO, String userId);
}
