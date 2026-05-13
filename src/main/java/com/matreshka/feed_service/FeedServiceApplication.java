package com.matreshka.feed_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class FeedServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(FeedServiceApplication.class, args);
	}
}