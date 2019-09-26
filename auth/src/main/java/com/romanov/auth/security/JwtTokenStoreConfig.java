package com.romanov.auth.security;

import com.romanov.auth.config.ServiceConfig;
import com.romanov.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.provider.token.*;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
public class JwtTokenStoreConfig {


    private ServiceConfig serviceConfig;

    @Autowired
    public JwtTokenStoreConfig(ServiceConfig serviceConfig, UserService userService) {
        this.serviceConfig = serviceConfig;
        this.userService = userService;
    }

    @Bean
    public TokenStore tokenStore(){
        return new JwtTokenStore( jwtAccessTokenConverter());
    }

    @Bean
    @Primary
    public DefaultTokenServices tokenServices(){
        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore( tokenStore() );
        defaultTokenServices.setSupportRefreshToken( true );
        return defaultTokenServices;
    }


    private UserService userService;

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();

        converter.setSigningKey(serviceConfig.getJwtSigningKey());

        return converter;
    }

}
