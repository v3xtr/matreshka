package com.matreshka.auth_service.application.port;

public interface IVerificationService {
    boolean verifyCode(String to, String code);
}
