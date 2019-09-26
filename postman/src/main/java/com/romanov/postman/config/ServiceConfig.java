package com.romanov.postman.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class ServiceConfig {

    @Value("${signing.key}")
    private String signingKey="";

    @Value("${login.data.username}")
    private String username = "Artem";
    @Value("${login.data.password}")
    private String password = "123";
    @Value("${login.data.client}")
    private String client = "post";
    @Value("${login.data.secret}")
    private String secret = "post";

    @Value("${url.login}")
    private String loginUrl = "";
    @Value("${url.emails}")
    private String emailUrl = "";

}
