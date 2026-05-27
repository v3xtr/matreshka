package com.matreshka.products_service.delivery.http;

import com.matreshka.products_service.application.port.IProductsService;
import com.matreshka.products_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.products_service.delivery.http.dto.*;
import com.matreshka.products_service.internal.domain.AdvertDocument;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/advert")
@Slf4j
public class ProductsController {

    private final IProductsService productsService;
    private final IBrokerProducer brokerProducer;

    @PostMapping("/create")
    public ResponseEntity<AdvertCreateResponseDTO> create(@Valid @RequestBody AdvertCreateRequestDTO advertCreateRequestDTO) {
        AdvertCreateResponseDTO advert = productsService.create(advertCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(advert);
    }

    @PatchMapping("/update")
    public ResponseEntity<AdvertUpdateRequestDTO> update(@Valid @RequestBody AdvertUpdateRequestDTO advertUpdateRequestDTO){
        AdvertUpdateRequestDTO advert = productsService.update(advertUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(advert);
    }

    @GetMapping()
    public ResponseEntity<List<AdvertDocument>> search(@Valid AdvertSearchRequestDTO dto) throws IOException {
        List<AdvertDocument> advertDocuments = productsService.search(dto);
        return ResponseEntity.status(HttpStatus.OK).body(advertDocuments);
    }

    @DeleteMapping()
    public ResponseEntity<String> delete(@Valid @RequestParam AdvertDeleteRequestDTO advertDeleteRequestDTO) throws IOException {
        productsService.delete(advertDeleteRequestDTO.id(), advertDeleteRequestDTO.s3Key());
        brokerProducer.publishDeleteAdvertEvent(advertDeleteRequestDTO.s3Key());
        return ResponseEntity.status(HttpStatus.OK).body("Объявление было успешно удалено");
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Optional<AdvertCreateResponseDTO>> getOne(@Valid @PathVariable String id) {
        Optional<AdvertCreateResponseDTO> advertEntity = productsService.getOne(id);
        return ResponseEntity.status(HttpStatus.OK).body(advertEntity);
    }
}

