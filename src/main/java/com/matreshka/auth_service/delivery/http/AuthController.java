package com.matreshka.auth_service.delivery.http;

import com.matreshka.auth_service.application.port.IAuthService;
import com.matreshka.auth_service.application.port.INotificationService;
import com.matreshka.auth_service.application.port.IVerificationService;
import com.matreshka.auth_service.delivery.broker.port.IBrokerProducer;
import com.matreshka.auth_service.delivery.http.dto.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;
    private final IBrokerProducer brokerProducer;
    private final INotificationService notificationService;
    private final IVerificationService verificationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDTO> register(
            @Valid @RequestBody RegisterUserRequestDTO registerUserRequestDTO,
            HttpServletResponse response
    ) {
        AuthResult<RegisterUserResponseDTO> result = authService.register(registerUserRequestDTO);

        injectTokens(response, result.accessToken());

        RegisterUserResponseDTO userDto = result.userResponseDto();

        brokerProducer.produce(userDto);

        return ResponseEntity.ok(result.userResponseDto());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDTO> login(
            @Valid @RequestBody LoginUserRequestDTO loginUserRequestDTO,
            HttpServletResponse response
    ){
        AuthResult<LoginUserResponseDTO> result = authService.login(loginUserRequestDTO);

        injectTokens(response, result.accessToken());

        return ResponseEntity.ok(result.userResponseDto());
    }

    @PostMapping("/sendmail")
    public ResponseEntity<String> sendMail(@Valid @RequestBody SendMailRequestDTO sendMailRequestDTO) {
        notificationService.sendMail(sendMailRequestDTO.email());
        return ResponseEntity.ok("Mail sent");
    }

    @PostMapping("/check-code")
    public ResponseEntity<Boolean> checkCode(@Valid @RequestBody CheckCodeDTO checkCodeDTO) {
        return ResponseEntity.ok(verificationService.verifyCode(checkCodeDTO.userId(), checkCodeDTO.code()));
    }

    private void injectTokens(HttpServletResponse response, String accessToken) {
        Cookie accessCookie = new Cookie("access_token", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(15 * 60);
        response.addCookie(accessCookie);
    }
}