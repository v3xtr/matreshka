package com.matreshka.feed_service.application.port;

import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;

public interface ICommentsService {
    void addComment(CommentRequestDTO commentRequestDTO, String userId);
}