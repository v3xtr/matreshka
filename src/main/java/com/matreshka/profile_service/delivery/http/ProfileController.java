package com.matreshka.profile_service.delivery.http;

import com.matreshka.profile_service.application.port.IProfileService;
import com.matreshka.profile_service.delivery.broker.BrokerProducer;
import com.matreshka.profile_service.delivery.broker.dto.UserUpdatedEvent;
import com.matreshka.profile_service.delivery.http.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final IProfileService profileService;
    private final BrokerProducer brokerProducer;

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> getProfile(
            @PathVariable String userId,
            @AuthenticationPrincipal String currentUserId
    ) {
        profileService.getProfile(userId, currentUserId);
        return ResponseEntity.status(HttpStatus.OK).body(profileService.getProfile(userId, currentUserId));
    }

    @PreAuthorize("#userId == authentication.principal")
    @PutMapping("/update")
    public ResponseEntity<Void> updateProfile(
            @Valid @RequestBody UserUpdateRequestDTO userUpdateRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        UserUpdatedEvent userUpdatedEvent = profileService.updateProfile(userId, userUpdateRequestDTO);

        brokerProducer.publishUpdatedUser(userUpdatedEvent);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/add-employee")
    public ResponseEntity<String> addEmployee(
            @Valid @RequestBody EmployeeRequestDTO employeeRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        profileService.addEmployee(userId, employeeRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Сотрудник был успешно добавлен");
    }

    @PutMapping("/update-employee")
    public ResponseEntity<String> updateEmployee(
            @Valid @RequestBody EmployeeUpdateRequestDTO employeeRequestDTO,
            @AuthenticationPrincipal String userId
    ) {
        profileService.updateEmployee(userId, employeeRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Сотрудник был успешно обнавлен");
    }

}