package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.ICommentsService;
import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import com.matreshka.feed_service.internal.infrastructure.mapper.ICommentMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import com.matreshka.feed_service.internal.repo.ICommentRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentsService implements ICommentsService {

    private final ICommentRepo commentRepo;
    private final ICommentMapper commentMapper;

    @Transactional
    public void addComment(CommentRequestDTO commentRequestDTO) {
        CommentEntity commentEntity = commentMapper.toEntity(commentRequestDTO);
        commentRepo.save(commentEntity);
    }
}
