package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.http.dto.LikeRequestDTO;

public interface ILikeService {
    void like(LikeRequestDTO likeRequestDTO);
    void unlike(LikeRequestDTO likeRequestDTO);
    long getLikesCount(String videoId);
}
