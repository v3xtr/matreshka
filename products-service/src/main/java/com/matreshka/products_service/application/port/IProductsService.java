package com.matreshka.products_service.application.port;

import com.matreshka.products_service.delivery.http.dto.AdvertCreateRequestDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertCreateResponseDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertSearchRequestDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertUpdateRequestDTO;
import com.matreshka.products_service.internal.domain.AdvertDocument;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IProductsService {
    AdvertCreateResponseDTO create(AdvertCreateRequestDTO advertRequestDTO);

    List<AdvertDocument> search(AdvertSearchRequestDTO dto) throws IOException;

    Optional<AdvertCreateResponseDTO> getOne(String id);

    AdvertUpdateRequestDTO update(AdvertUpdateRequestDTO advertRequestDTO);

    void delete(String id, String s3Key) throws IOException;
}
