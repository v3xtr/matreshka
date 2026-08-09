package com.matreshka.products_service.internal.repo;

import com.matreshka.products_service.internal.infrastructure.persistence.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IMediaRepo extends JpaRepository<MediaEntity, String> {
    @Modifying
    @Query("DELETE FROM MediaEntity m WHERE m.id = :id")
    void deleteBys3Key(@Param("id") String id);}
