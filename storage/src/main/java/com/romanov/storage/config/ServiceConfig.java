package com.romanov.storage.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ServiceConfig {

    @Value( "${signing.key}")
    private String jwtSignKey="";

    public String getJwtSignKey() {
        return jwtSignKey;
    }
}
