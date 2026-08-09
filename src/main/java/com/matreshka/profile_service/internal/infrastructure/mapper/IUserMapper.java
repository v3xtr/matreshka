package com.matreshka.profile_service.internal.infrastructure.mapper;

import com.matreshka.profile_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.profile_service.delivery.http.dto.ReviewResponseDTO;
import com.matreshka.profile_service.delivery.http.dto.UserResponseDTO;
import com.matreshka.profile_service.internal.infrastructure.persistence.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {IEmployeeMapper.class, IReviewMapper.class})
public interface IUserMapper {

    @Mapping(target = "receivedReviews", ignore = true)
    @Mapping(target = "ratingsCount", ignore = true)
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "employeeEntities", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "city", ignore = true)
    @Mapping(target = "avatarUrl", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "createdAt", ignore = true)
    UserEntity toEntity(UserRegisteredEvent userRegisteredEvent);

    @Mapping(target = "userId", source = "id")
    @Mapping(target = "avatar", source = "avatarUrl")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "rating", expression = "java(userUpdatedEvent.getRating() != null ? userUpdatedEvent.getRating().toString() : \"5.0\")")
    UserUpdatedEvent toEvent(UserEntity userUpdatedEvent);

    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "editable", ignore = true)
    @Mapping(target = "employees", source = "employeeEntities")
    UserResponseDTO toResponseDTO(UserEntity user);

    default UserResponseDTO toResponseDTO(UserEntity user, List<ReviewResponseDTO> reviewDTOs, boolean editable) {
        UserResponseDTO dto = toResponseDTO(user);

        return new UserResponseDTO(
                dto.id(),
                dto.email(),
                dto.name(),
                dto.phone(),
                dto.description(),
                dto.avatarUrl(),
                dto.city(),
                dto.employees(),
                reviewDTOs,
                dto.role(),
                editable,
                dto.rating(),
                dto.createdAt()
        );
    }
}