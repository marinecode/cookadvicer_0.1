package com.romanov.advisor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {
    @Value("${signing.key}")
    private String jwtSignKey ="";

    public String getJwtSignKey() {
        return jwtSignKey;
    }
}
