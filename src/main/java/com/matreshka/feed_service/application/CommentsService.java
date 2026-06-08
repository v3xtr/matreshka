package com.matreshka.feed_service.application;

import com.matreshka.feed_service.application.port.ICommentsService;
import com.matreshka.feed_service.delivery.http.dto.CommentRequestDTO;
import com.matreshka.feed_service.internal.infrastructure.mapper.ICommentMapper;
import com.matreshka.feed_service.internal.infrastructure.persistence.CommentEntity;
import com.matreshka.feed_service.internal.repo.ICommentRepo;
import com.matreshka.feed_service.internal.repo.IUserRepo;
import com.matreshka.feed_service.internal.repo.IVideoRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentsService implements ICommentsService {

    private final ICommentRepo commentRepo;
    private final IUserRepo userRepo;
    private final IVideoRepo videoRepo;
    private final ICommentMapper commentMapper;

    @Override
    @Transactional
    public void addComment(CommentRequestDTO commentRequestDTO) {
        CommentEntity commentEntity = commentMapper.toEntity(commentRequestDTO);

        if (commentEntity.getCreatedAt() == null) {
            commentEntity.setCreatedAt(LocalDateTime.now());
        }

        commentEntity.setUser(userRepo.getReferenceById(commentRequestDTO.userId()));

        commentEntity.setVideo(videoRepo.getReferenceById(commentRequestDTO.videoId()));

        commentRepo.save(commentEntity);
    }
}