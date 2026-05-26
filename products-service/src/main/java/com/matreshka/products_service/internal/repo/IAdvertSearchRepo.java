package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.domain.AdvertDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableElasticsearchRepositories
public interface IAdvertSearchRepo extends ElasticsearchRepository<AdvertDocument, String> {
}
