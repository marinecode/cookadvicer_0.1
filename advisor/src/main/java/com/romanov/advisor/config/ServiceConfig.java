package com.romanov.advisor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {
    @Value("${signing.key}")
    private String jwtSignKey ="";
    @Value("${url.gateway}")
    private String gatewayUrl = "";
    @Value("${url.storage}")
    private String storageUrl = "";

    public String getStorageUrl() {
        return storageUrl;
    }

    public String getJwtSignKey() {
        return jwtSignKey;
    }

    public String getGatewayUrl() {
        return gatewayUrl;
    }
}

