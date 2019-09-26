package com.romanov.postman.model;

import lombok.Data;
import org.springframework.security.jwt.Jwt;

@Data
public class JWT {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private String expires_in;
    private String scope;
    private String jti;

}
