package com.matreshka.profile_service.application;

import com.matreshka.profile_service.application.port.IProfileService;
import com.matreshka.profile_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.profile_service.delivery.http.dto.*;
import com.matreshka.profile_service.internal.configs.JsonNullable;
import com.matreshka.profile_service.internal.infrastructure.mapper.IEmployeeMapper;
import com.matreshka.profile_service.internal.infrastructure.mapper.IReviewMapper;
import com.matreshka.profile_service.internal.infrastructure.mapper.IUserMapper;
import com.matreshka.profile_service.internal.infrastructure.persistence.EmployeeEntity;
import com.matreshka.profile_service.internal.infrastructure.persistence.ROLE;
import com.matreshka.profile_service.internal.infrastructure.persistence.UserEntity;
import com.matreshka.profile_service.internal.repo.IEmployeeRepo;
import com.matreshka.profile_service.internal.repo.IReviewRepo;
import com.matreshka.profile_service.internal.repo.IUserRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService implements IProfileService {

    private final IUserRepo userRepository;
    private final IEmployeeRepo employeeRepo;
    private final IUserMapper userMapper;
    private final IEmployeeMapper employeeMapper;
    private final IReviewMapper reviewMapper;
    private final IReviewRepo reviewRepo;

    @Override
    public void processUser(UserRegisteredEvent userRegisteredEvent) {
        UserEntity entity = userMapper.toEntity(userRegisteredEvent);
        userRepository.save(entity);
    }

    @Override
    @Transactional
    public UserUpdatedEvent updateProfile(String userId, UserUpdateRequestDTO dto) {
        log.info("DEBUG: Update request for userId: '{}', dto: {}", userId, dto);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (isSet(dto.name())) user.setName(dto.name().get());
        if (isSet(dto.address())) user.setAddress(dto.address().get());
        if (isSet(dto.city())) user.setCity(dto.city().get());
        if (isSet(dto.description())) user.setDescription(dto.description().get());

        if (isSet(dto.type())) {
            try {
                user.setRole(ROLE.valueOf(dto.type().get().toUpperCase()));
            } catch (Exception e) {
                log.error("Invalid role provided: {}", dto.type().get());
            }
        }

        if (isSet(dto.avatarUrl())) user.setAvatarUrl(dto.avatarUrl().get());

        UserEntity savedUser = userRepository.save(user);

        return userMapper.toEvent(savedUser);
    }

    private boolean isSet(JsonNullable<?> field) {
        return field != null;
    }

    @Override
    public UserResponseDTO getProfile(String targetUserId, String currentUserId) {
        UserEntity user = userRepository.findWithEmployeesById(targetUserId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        boolean editable = Objects.equals(targetUserId, currentUserId);

        List<ReviewResponseDTO> reviewDTOs = reviewRepo.findAllByTargetUserId(targetUserId).stream()
                .map(review -> {
                    ReviewResponseDTO dto = reviewMapper.toResponseDTO(review);

                    UserEntity author = userRepository.findById(review.getAuthorId()).orElse(null);
                    String authorName = (author != null) ? author.getName() : "Аноним";
                    String authorAvatar = (author != null) ? author.getAvatarUrl() : null;

                    return new ReviewResponseDTO(
                            dto.id(),
                            dto.targetUserId(),
                            dto.authorId(),
                            authorName,
                            authorAvatar,
                            dto.rating(),
                            dto.comment(),
                            dto.ownerReply(),
                            dto.isReplied(),
                            dto.createdAt(),
                            dto.productId()
                    );
                })
                .toList();

        return userMapper.toResponseDTO(user, reviewDTOs, editable);
    }

    @Override
    @Transactional
    public void updateUserAvatar(String avatarUrl, String userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        userEntity.setAvatarUrl(avatarUrl);

        log.info("User avatar updated successfully");
    }

    @Override
    public void addEmployee(String userId, EmployeeRequestDTO dto) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        EmployeeEntity employee = employeeMapper.toEntity(dto);

        employee.setUserEntity(userEntity);

        employeeRepo.save(employee);
    }

    @Override
    @Transactional
    public void updateEmployee(String userId, EmployeeUpdateRequestDTO dto) {
        EmployeeEntity existingEmployee = employeeRepo.findById(Long.parseLong(dto.id()))
                .orElseThrow(() -> new EntityNotFoundException("Сотрудник не найден"));

        if (!existingEmployee.getUserEntity().getId().equals(userId)) {
            throw new SecurityException("Доступ запрещен");
        }

        employeeMapper.toEntity(dto, existingEmployee);
    }
}