package com.matreshka.authservice.application.port;

public interface VerificationUseCase {
    boolean verifyCode(String to, String code);
}
