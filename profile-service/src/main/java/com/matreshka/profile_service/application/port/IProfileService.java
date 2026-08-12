package com.matreshka.profile_service.application.port;


import com.matreshka.profile_service.delivery.broker.dto.UserRegisteredEvent;
import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.profile_service.delivery.http.dto.*;

public interface IProfileService{
    UserResponseDTO getProfile(String userId, String currentUserId);
    UserUpdatedEvent updateProfile(String userId, UserUpdateRequestDTO dto);
    void processUser(UserRegisteredEvent userRegisteredEvent);
    void updateUserAvatar(String avatarUrl, String userId);
    void addEmployee(String userId, EmployeeRequestDTO employeeRequestDTO);
    void updateEmployee(String userId, EmployeeUpdateRequestDTO employeeUpdateRequestDTO);
}
