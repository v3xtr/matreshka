package com.matreshka.products_service.delivery.http;

import com.matreshka.products_service.application.port.IMediaService;
import com.matreshka.products_service.application.port.IProductsService;
import com.matreshka.products_service.delivery.http.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/adverts")
@Slf4j
public class ProductsController {

    private final IProductsService productsService;
    private final IMediaService mediaService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(
            @Valid @RequestBody AdvertCreateRequestDTO advertCreateRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        productsService.create(userId, advertCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Объявление создано"));
    }

    @PutMapping
    public ResponseEntity<AdvertUpdateRequestDTO> update(@Valid @RequestBody AdvertUpdateRequestDTO advertUpdateRequestDTO) {
        AdvertUpdateRequestDTO advert = productsService.update(advertUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(advert);
    }

    @PostMapping("/search")
    public ResponseEntity<List<AdvertSearchResponseDTO>> search(@Valid @RequestBody AdvertSearchRequestDTO dto)
            throws IOException {
        List<AdvertSearchResponseDTO> advertDocuments = productsService.search(dto);
        return ResponseEntity.status(HttpStatus.OK).body(advertDocuments);
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<Void> addFavorite(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        productsService.addFavorite(userId, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/favorite")
    public ResponseEntity<Void> removeFavorite(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        productsService.removeFavorite(userId, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<FavoriteAdvertResponseDTO>> getFavorites(@AuthenticationPrincipal String userId) {
        List<FavoriteAdvertResponseDTO> favorites = productsService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/my")
    public ResponseEntity<List<AdvertGetAdvertResponseDTO>> getUserAdverts(@AuthenticationPrincipal String userId) {
        List<AdvertGetAdvertResponseDTO> adverts = productsService.getUserAdverts(userId);
        return ResponseEntity.status(HttpStatus.OK).body(adverts);
    }

    @PatchMapping
    public ResponseEntity<Void> updateAdvertVideo(UpdateVideoInAdvertRequestDTO updateVideoInAdvertRequestDTO) {
        productsService.updateVideoId(updateVideoInAdvertRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/media/{videoId}/status")
    public ResponseEntity<MediaResponseDTO> getMediaStatus(@PathVariable String videoId) {
        return mediaService.getStatus(videoId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal String userId
    ) throws IOException {
        productsService.delete(id, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Объявление было успешно удалено");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AdvertGetAdvertResponseDTO>> getOne(@PathVariable UUID id) {
        Optional<AdvertGetAdvertResponseDTO> advert = productsService.getOne(id);
        return ResponseEntity.status(HttpStatus.OK).body(advert);
    }
}