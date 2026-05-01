package com.matreshka.notification_service.delivery.http;

import com.matreshka.notification_service.application.port.INotificationService;
import com.matreshka.notification_service.delivery.dto.NotificationResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final INotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(Principal principal) {
        return ResponseEntity.ok(notificationService.getNotifications(principal.getName()));
    }
}
