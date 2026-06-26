package com.matreshka.auth_service.application.port;

import com.matreshka.auth_service.delivery.http.dto.*;

public interface IAuthService {
    AuthResult<RegisterUserResponseDTO> register(RegisterUserRequestDTO registerUserRequestDTO);
    AuthResult<LoginUserResponseDTO> login(LoginUserRequestDTO loginUserRequestDTO);

}
