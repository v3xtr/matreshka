package com.matreshka.auth_service.application;

import com.matreshka.auth_service.application.port.INotificationService;
import com.matreshka.auth_service.internal.repo.port.ICacheRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final JavaMailSender mailSender;
    private final ICacheRepo cacheRepo;

    @Value("${spring.mail.username}")
    private String fromEmail;


    public void sendMail(String to) {
        String code = String.format("%06d", new Random().nextInt(999999));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Verification Code");
        message.setText(code);

        cacheRepo.saveCode(to, code);

        mailSender.send(message);
    }
}
