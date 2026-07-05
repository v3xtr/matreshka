package com.matreshka.chat_service.internal.adapter;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDBTemplate {

    @Value("${spring.data.mongodb.uri}")
    private String mongoDBUri;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoDBUri);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "chat_db");
    }
}
