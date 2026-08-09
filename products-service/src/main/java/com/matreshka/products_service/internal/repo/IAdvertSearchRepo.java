package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.domain.AdvertDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@EnableElasticsearchRepositories
public interface IAdvertSearchRepo extends ElasticsearchRepository<AdvertDocument, UUID> {
}
