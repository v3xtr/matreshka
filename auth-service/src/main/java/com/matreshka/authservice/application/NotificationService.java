package com.matreshka.authservice.application;

import com.matreshka.authservice.application.port.NotificationUseCase;
import com.matreshka.authservice.internal.repo.RedisAuthCacheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class NotificationService implements NotificationUseCase {

    private final JavaMailSender mailSender;
    private final RedisAuthCacheRepository authCacheRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendMail(String to) {
        String code = String.format("%06d", new Random().nextInt(999999));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Verification Code");
        message.setText(code);

        authCacheRepository.saveVerificationCode(to, code);

        mailSender.send(message);
    }
}
