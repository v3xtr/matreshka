package com.matreshla.vk_oauth.application;

import com.matreshla.vk_oauth.application.port.IOAuthService;
import com.matreshla.vk_oauth.delivery.broker.dto.UserRegisteredEvent;
import com.matreshla.vk_oauth.delivery.http.dto.CombinedUserResponseDTO;
import com.matreshla.vk_oauth.delivery.http.dto.UserResponseDTO;
import com.matreshla.vk_oauth.internal.components.IdGenerator;
import com.matreshla.vk_oauth.internal.components.JWTBuilder;
import com.matreshla.vk_oauth.internal.configs.ApplicationVkPropeties;
import com.matreshla.vk_oauth.internal.infrastructure.mapper.IUserMapper;
import com.matreshla.vk_oauth.internal.infrastructure.model.UserModel;
import com.matreshla.vk_oauth.internal.infrastructure.persistence.UserEntity;
import com.matreshla.vk_oauth.internal.repo.IUserRepo;
import com.matreshla.vk_oauth.internal.repo.port.ITokenCacheRepo;
import com.vk.api.sdk.client.VkApiClient;
import com.vk.api.sdk.client.actors.UserActor;
import com.vk.api.sdk.httpclient.HttpTransportClient;
import com.vk.api.sdk.objects.UserAuthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService implements IOAuthService {

    private final IUserRepo userRepo;
    private final ApplicationVkPropeties applicationProperties;
    private final IUserMapper userMapper;
    private final VkApiClient vk = new VkApiClient(new HttpTransportClient());
    private final IdGenerator idGenerator;
    private final JWTBuilder jwtBuilder;
    private final ITokenCacheRepo tokenCacheRepo;

    @Override
    public String formUrl() {
        return "https://oauth.vk.com/authorize?client_id=" + applicationProperties.getClientId()
                + "&display=page"
                + "&redirect_uri=" + applicationProperties.getRedirectUri()
                + "&scope=email"
                + "&response_type=code"
                + "&v=5.199";
    }

    @Override
    public CombinedUserResponseDTO authanticate(String code) {
        try {

            int clientId = Integer.parseInt(applicationProperties.getClientId());

            UserAuthResponse authResponse = vk.oAuth()
                    .userAuthorizationCodeFlow(clientId, applicationProperties.getClientSecret(), applicationProperties.getRedirectUri(), code).execute();

            UserActor userActor = new UserActor(authResponse.getUserId().longValue(), authResponse.getAccessToken());
            var userProfiles = vk.users().get(userActor).userIds(String.valueOf(authResponse.getUserId())).execute();
            var vkProfile = userProfiles.getFirst();

            return userRepo.findByEmail(vkProfile.getEmail())
                    .map(existingUser -> {
                        log.info("User found: {}", existingUser.getEmail());
                        Map<String, String> tokens = jwtBuilder.generateTokens(existingUser.getId());
                        tokenCacheRepo.saveToken(existingUser.getId(), tokens.get("accessToken"));

                        return new CombinedUserResponseDTO(
                                new UserResponseDTO(tokens.get("accessToken"), existingUser.getEmail(), existingUser.getFirstName(), existingUser.getPhone()),
                                null
                        );
                    })
                    .orElseGet(() -> {
                        log.info("Creating new user: {}", vkProfile.getEmail());
                        String userId = idGenerator.generateId();
                        UserModel userModel = new UserModel(userId, vkProfile.getFirstName(), vkProfile.getEmail(), vkProfile.getMobilePhone());

                        UserEntity userEntity = userMapper.toEntity(userModel);
                        UserEntity savedUser = userRepo.save(userEntity);

                        Map<String, String> tokens = jwtBuilder.generateTokens(savedUser.getId());
                        tokenCacheRepo.saveToken(savedUser.getId(), tokens.get("accessToken"));

                        UserRegisteredEvent event = userMapper.toEvent(userModel);
                        UserResponseDTO dto = new UserResponseDTO(tokens.get("accessToken"), savedUser.getEmail(), savedUser.getFirstName(), savedUser.getPhone());

                        return new CombinedUserResponseDTO(dto, event);
                    });

        } catch (Exception e) {
            log.error("Auth error", e);
            throw new RuntimeException("Ошибка аутентификации через VK", e);
        }
    }
}
