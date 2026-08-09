package com.matreshka.notification_service.delivery.http;

import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.http.dto.NotificationRequestDTO;
import com.matreshka.notification_service.delivery.http.dto.NotificationResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final INotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(notificationService.getNotifications(userId));
    }

    @PostMapping()
    public ResponseEntity<Void> post(@RequestBody NotificationRequestDTO notificationRequestDTO) {
        notificationService.saveToken(notificationRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
