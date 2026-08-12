package com.matreshka.authservice.application.port;

import com.matreshka.authservice.application.model.AuthenticationResult;
import com.matreshka.authservice.delivery.http.dto.*;

public interface AuthUseCase {
    AuthenticationResult<RegisterUserResponse> register(RegisterUserRequest registerUserRequestDTO);
    AuthenticationResult<LoginUserResponse> login(LoginUserRequest loginUserRequestDTO);
    String refreshAccessToken(String accessToken);

    void saveRefreshToken(String userId, String refreshToken);
}
