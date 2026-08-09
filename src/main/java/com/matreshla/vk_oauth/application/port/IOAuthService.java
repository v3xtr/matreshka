package com.matreshla.vk_oauth.application.port;

import com.matreshla.vk_oauth.delivery.http.dto.CombinedUserResponseDTO;

public interface IOAuthService {
    String formUrl();
    CombinedUserResponseDTO authanticate(String code);
}
