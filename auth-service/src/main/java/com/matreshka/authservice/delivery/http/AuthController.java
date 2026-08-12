package com.matreshka.authservice.delivery.http;

import com.matreshka.authservice.application.port.AuthUseCase;
import com.matreshka.authservice.application.port.NotificationUseCase;
import com.matreshka.authservice.application.port.VerificationUseCase;
import com.matreshka.authservice.application.model.AuthenticationResult;
import com.matreshka.authservice.delivery.http.dto.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final String ACCESS_COOKIE_NAME = "access_token";
    private static final String REFRESH_COOKIE_NAME = "refresh_token";

    private static final int ACCESS_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
    private static final int REFRESH_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

    private final AuthUseCase authService;
    private final NotificationUseCase notificationService;
    private final VerificationUseCase verificationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(
            @Valid @RequestBody RegisterUserRequest registerUserRequestDTO,
            HttpServletResponse response
    ) {
        AuthenticationResult<RegisterUserResponse> result = authService.register(registerUserRequestDTO);

        injectTokens(response, result.accessToken(), result.refreshToken());

        return ResponseEntity.status(HttpStatus.CREATED).body(result.userResponseDto());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponse> login(
            @Valid @RequestBody LoginUserRequest loginUserRequestDTO,
            HttpServletResponse response
    ) {
        AuthenticationResult<LoginUserResponse> result = authService.login(loginUserRequestDTO);

        injectTokens(response, result.accessToken(), result.refreshToken());

        return ResponseEntity.status(HttpStatus.OK).body(result.userResponseDto());
    }

    @PostMapping("/sendmail")
    public ResponseEntity<String> sendMail(@Valid @RequestBody SendMailRequest sendMailRequestDTO) {
        notificationService.sendMail(sendMailRequestDTO.email());
        return ResponseEntity.ok("Mail sent");
    }

    @PostMapping("/check-code")
    public ResponseEntity<Boolean> checkCode(@Valid @RequestBody CheckCodeRequest checkCodeDTO) {
        return ResponseEntity.ok(verificationService.verifyCode(checkCodeDTO.userId(), checkCodeDTO.code()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refreshAccessToken(
            @CookieValue(name = ACCESS_COOKIE_NAME, required = false) String accessToken,
            HttpServletResponse response
    ) {
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String newAccessToken = authService.refreshAccessToken(accessToken);

        response.addCookie(buildCookie(ACCESS_COOKIE_NAME, newAccessToken, ACCESS_COOKIE_MAX_AGE_SECONDS));

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private void injectTokens(HttpServletResponse response, String accessToken, String refreshToken) {
        response.addCookie(buildCookie(ACCESS_COOKIE_NAME, accessToken, ACCESS_COOKIE_MAX_AGE_SECONDS));
        response.addCookie(buildCookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_MAX_AGE_SECONDS));
    }

    private Cookie buildCookie(String name, String value, int maxAgeSeconds) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAgeSeconds);
        return cookie;
    }
}