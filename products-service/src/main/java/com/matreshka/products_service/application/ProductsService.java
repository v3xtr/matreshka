package com.matreshka.products_service.application;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.matreshka.products_service.application.port.IProductsService;
import com.matreshka.products_service.delivery.http.dto.AdvertCreateRequestDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertCreateResponseDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertSearchRequestDTO;
import com.matreshka.products_service.delivery.http.dto.AdvertUpdateRequestDTO;
import com.matreshka.products_service.internal.domain.AdvertDocument;
import com.matreshka.products_service.internal.infrastructure.persistence.AdvertEntity;
import com.matreshka.products_service.internal.infrastructure.persistence.mapper.IAdvertEntityMapper;
import com.matreshka.products_service.internal.repo.IAdvertRepo;
import com.matreshka.products_service.internal.repo.IAdvertSearchRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProductsService implements IProductsService {

    private final IAdvertRepo advertRepo;
    private final IAdvertEntityMapper advertEntityMapper;
    private final ElasticsearchClient elasticsearchClient;
    private final IAdvertSearchRepo advertSearchRepo;

    @Transactional
    public AdvertCreateResponseDTO create(AdvertCreateRequestDTO advertRequestDTO) {
        AdvertEntity advert = advertEntityMapper.toEntity(advertRequestDTO);
        AdvertDocument advertDocument = advertEntityMapper.toDocument(advert);
        advertRepo.save(advert);
        advertSearchRepo.save(advertDocument);

        return advertEntityMapper.toDocumentResponseDTO(advertDocument);
    }

    public Optional<AdvertCreateResponseDTO> getOne(String id){
        Optional<AdvertEntity> advertEntity = advertRepo.findById(id);
        return Optional.of(advertEntityMapper.toResponseDTO(advertEntity));
    }

    public AdvertUpdateRequestDTO update(AdvertUpdateRequestDTO advertRequestDTO) {
        AdvertEntity advert = advertEntityMapper.toEntity(advertRequestDTO);
        AdvertDocument advertDocument = advertEntityMapper.toDocument(advert);
        advertRepo.save(advert);
        advertSearchRepo.save(advertDocument);

        return advertEntityMapper.toUpdateRequestDTO(advert);
    }

    public List<AdvertDocument> search(@NotNull AdvertSearchRequestDTO dto) throws IOException {
        try{
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

            SearchResponse<AdvertDocument> response = elasticsearchClient.search(s -> s
                    .index("adverts")
                    .size(dto.take() > 0 ? dto.take() : 10)
                    .query(q -> q.bool(b -> {
                        if (dto.query() != null) {
                            b.must(m -> m.multiMatch(mm -> mm
                                    .query(dto.query())
                                    .fields("title", "description")
                            ));
                        }
                        return b.filter(filters);
                    })),
            AdvertDocument.class
            );

            return response.hits().hits().stream()
                    .map(Hit::source)
                    .toList();
        }catch (IOException e){
            log.error(e.getMessage());
            throw new IOException("Неверные Данные");
        }
    }

    public void delete(String id, String s3Key) throws IOException {
        try{
            elasticsearchClient.delete(d -> d
                    .index("adverts")
                    .id(id)
            );


            advertRepo.deleteById(id);
            advertSearchRepo.deleteById(id);
        }catch (IOException e){
            log.error(e.getMessage());
            throw new IOException("Не удалось удалить объявление попробуйте снова");
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
        return Query.of(q -> q.range(r -> r
                .number(n -> {
                    n.field(field);
                    if (from != null) {
                        n.gte(from.doubleValue());
                    }
                    if (to != null) {
                        n.lte(to.doubleValue());
                    }
                    return n;
                })
        ));
    }
}