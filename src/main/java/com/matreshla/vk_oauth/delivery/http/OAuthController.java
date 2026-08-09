package com.matreshla.vk_oauth.delivery.http;

import com.matreshla.vk_oauth.application.port.IOAuthService;
import com.matreshla.vk_oauth.delivery.broker.port.IBrokerProducer;
import com.matreshla.vk_oauth.delivery.http.dto.CombinedUserResponseDTO;
import com.matreshla.vk_oauth.delivery.http.dto.UserResponseDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final IOAuthService oAuthService;
    private final IBrokerProducer brokerProducer;

    @GetMapping("/vk-url")
    public ResponseEntity<List<String>> authenticate(){
        String url = oAuthService.formUrl();
        return ResponseEntity.status(HttpStatus.OK).body(List.of("url", url));
    }

    @GetMapping("vk-authenticate")
    public ResponseEntity<UserResponseDTO> authenticate(String code, HttpServletResponse response){
        CombinedUserResponseDTO user = oAuthService.authanticate(code);

        injectTokens(response, user.userResponseDTO().accessToken());

        brokerProducer.produce(user.userRegisteredEvent());

        return ResponseEntity.status(HttpStatus.FOUND).build();
    }

    private void injectTokens(HttpServletResponse response, String accessToken) {
        Cookie accessCookie = new Cookie("access_token", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(15 * 60);
        response.addCookie(accessCookie);
    }}
