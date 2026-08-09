package com.matreshka.products_service.application;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;
import co.elastic.clients.transport.TransportException;
import com.matreshka.products_service.application.port.IProductsService;
import com.matreshka.products_service.delivery.http.dto.*;
import com.matreshka.products_service.internal.domain.AdvertDocument;
import com.matreshka.products_service.internal.infrastructure.NotFoundException;
import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IAdvertEntityMapper;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IUserMapper;
import com.matreshka.products_service.internal.repo.IAdvertRepo;
import com.matreshka.products_service.internal.repo.IAdvertSearchRepo;
import com.matreshka.products_service.internal.repo.IMediaRepo;
import com.matreshka.products_service.internal.repo.IUserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsService implements IProductsService {

    private final IAdvertRepo advertRepo;
    private final IUserRepo userRepo;
    private final IUserMapper userMapper;
    private final IAdvertEntityMapper advertEntityMapper;
    private final ElasticsearchClient elasticsearchClient;
    private final IAdvertSearchRepo advertSearchRepo;
    private final IMediaRepo mediaRepo;

    @Override
    @Transactional
    public void create(String userId, AdvertCreateRequestDTO advertRequestDTO) {
        try {
            AdvertEntity advert = advertEntityMapper.toEntity(advertRequestDTO);
            advert.setUserId(userId);

            if (advert.getPictures() != null) {
                advert.getPictures().forEach(picture -> picture.setAdvert(advert));
            }
            if (advert.getServices() != null) {
                advert.getServices().forEach(service -> service.setAdvert(advert));
            }
            if (advert.getWorkSchedule() != null) {
                advert.getWorkSchedule().forEach(schedule -> schedule.setAdvert(advert));
            }
            if (advert.getVideo() != null) {
                advert.getVideo().setAdvert(advert);
            }

            AdvertEntity savedAdvert = advertRepo.save(advert);

            AdvertDocument advertDocument = advertEntityMapper.toDocument(savedAdvert);

            advertSearchRepo.save(advertDocument);

        } catch (NotFoundException e) {
            log.error("Товар не найден", e);
            throw new NotFoundException("Товар не найден");
        } catch (Exception e) {
            log.error("Error creating advert", e);
            throw new RuntimeException("Error creating advert", e);
        }
    }

    @Override
    public Optional<AdvertGetAdvertResponseDTO> getOne(UUID id) {
        return advertRepo.findById(id)
                .map(advertEntityMapper::toResponseDTO);
    }

    @Override
    @Transactional
    public AdvertUpdateRequestDTO update(AdvertUpdateRequestDTO advertRequestDTO) {
        AdvertEntity advert = advertEntityMapper.toEntity(advertRequestDTO);

        if (advert.getPictures() != null) {
            advert.getPictures().forEach(picture -> picture.setAdvert(advert));
        }
        if (advert.getServices() != null) {
            advert.getServices().forEach(service -> service.setAdvert(advert));
        }
        if (advert.getWorkSchedule() != null) {
            advert.getWorkSchedule().forEach(schedule -> schedule.setAdvert(advert));
        }

        AdvertDocument advertDocument = advertEntityMapper.toDocument(advert);
        advertRepo.save(advert);
        advertSearchRepo.save(advertDocument);

        return advertEntityMapper.toUpdateRequestDTO(advert);
    }

    @Override
    public List<AdvertSearchResponseDTO> search(@NotNull AdvertSearchRequestDTO dto) throws IOException {
        List<Query> filters = Stream.of(
                        term("category", dto.category()),
                        term("subCategory", dto.subCategory()),
                        term("employment", dto.employment()),
                        term("workFormat", dto.workFormat()),
                        term("userId", dto.userId()),
                        term("hasParking", dto.hasParking()),
                        term("hasElevator", dto.hasElevator()),
                        term("hasBalcony", dto.hasBalcony()),
                        term("propertyType", dto.propertyType()),
                        term("vehicleKpp", dto.vehicleKpp()),
                        range("yearOfManufacture", dto.yearOfManufactureFrom(), dto.yearOfManufactureTo()),
                        range("engineCapacity", dto.engineCapacityFrom(), dto.engineCapacityTo()),
                        range("horsePower", dto.horsePowerFrom(), dto.horsePowerTo()),
                        range("totalArea", dto.totalAreaFrom(), dto.totalAreaTo())
                )
                .filter(Objects::nonNull)
                .toList();

        int page = dto.page() != null && dto.page() > 0 ? dto.page() : 0;
        int size = dto.take() > 0 ? dto.take() : 10;
        int from = page * size;

        try {
            SearchResponse<AdvertDocument> response = elasticsearchClient.search(s -> s
                            .index("adverts")
                            .from(from)
                            .size(size)
                            .sort(sort -> sort.field(f -> f.field("createdAt").order(SortOrder.Desc)))
                            .query(q -> q.bool(b -> {
                                if (dto.query() != null) {
                                    b.must(m -> m.multiMatch(mm -> mm
                                            .query(dto.query())
                                            .fields("title", "description")
                                            .fuzziness("AUTO")
                                    ));
                                }
                                return b.filter(filters);
                            })),
                    AdvertDocument.class
            );

            return response.hits().hits().stream()
                    .map(Hit::source)
                    .map(advertEntityMapper::toSearchResponseDTO)
                    .toList();

        } catch (TransportException e) {
            log.error("Elasticsearch failed to decode/execute search response", e);
            throw new IOException("Ошибка выполнения поиска", e);
        } catch (IOException e) {
            log.error("Elasticsearch IO error during search", e);
            throw new IOException("Неверные данные", e);
        }
    }

    @Override
    @Transactional
    public void addFavorite(String userId, UUID advertId) {
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        AdvertEntity advert = advertRepo.findById(advertId)
                .orElseThrow(() -> new EntityNotFoundException("Advert not found with id: " + advertId));

        if (!user.getFavoriteAdverts().contains(advert)) {
            user.getFavoriteAdverts().add(advert);
            userRepo.save(user);
        }
    }

    @Override
    @Transactional
    public List<AdvertGetAdvertResponseDTO> getUserAdverts(String userId) {
        List<AdvertEntity> advertEntities = advertRepo.findAdvertsByUserId(userId);
        return advertEntities.stream().map(advertEntityMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional
    public void removeFavorite(String userId, UUID advertId) {
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        AdvertEntity advert = advertRepo.findById(advertId)
                .orElseThrow(() -> new EntityNotFoundException("Advert not found with id: " + advertId));

        if (user.getFavoriteAdverts().contains(advert)) {
            user.getFavoriteAdverts().remove(advert);
            userRepo.save(user);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteAdvertResponseDTO> getFavorites(String userId) {
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        return user.getFavoriteAdverts().stream().map(userMapper::toFavoriteAdvertResponseDTO).toList();
    }

    @Override
    public String delete(UUID id, String s3Key) throws IOException {
        try {
            elasticsearchClient.delete(d -> d
                    .index("adverts")
                    .id(id.toString())
            );

            advertRepo.deleteById(id);
            return s3Key;
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new IOException("Не удалось удалить объявление попробуйте снова");
        }
    }

    @Override
    @Transactional
    public void updateVideoId(UpdateVideoInAdvertRequestDTO updateVideoInAdvertRequestDTO) {
        try {
            AdvertEntity advertEntity = advertRepo.findById(updateVideoInAdvertRequestDTO.id())
                    .orElseThrow(() -> new NotFoundException("Товар не найден"));

            MediaEntity mediaEntity = mediaRepo.findById(updateVideoInAdvertRequestDTO.videoId())
                    .orElseThrow(() -> new NotFoundException("Видео не найдено"));

            advertEntity.setVideo(mediaEntity);

        } catch (Exception e) {
            throw new RuntimeException("Внутряняя Ошибка Сервера", e);
        }
    }

    private Query term(String field, Object value) {
        if (value == null) {
            return null;
        }
        String strValue = value instanceof Enum<?> e ? e.name() : String.valueOf(value);
        return Query.of(q -> q.term(t -> t.field(field).value(strValue)));
    }

    private Query range(String field, Number from, Number to) {
        if (from == null && to == null) {
            return null;
        }
        return Query.of(q -> q.range(r -> {
            r.field(field);
            if (from != null) {
                r.gte(JsonData.of(from.doubleValue()));
            }
            if (to != null) {
                r.lte(JsonData.of(to.doubleValue()));
            }
            return r;
        }));
    }
}