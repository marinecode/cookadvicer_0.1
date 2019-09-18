package com.romanov.advisor;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
public class AdvisorApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdvisorApplication.class, args);

    }

    @Bean
    OAuth2RestTemplate oAuth2RestTemplate(
            @Qualifier("oauth2ClientContext") OAuth2ClientContext oauth2ClientContext,
            OAuth2ProtectedResourceDetails details
    ){
        return new OAuth2RestTemplate(details, oauth2ClientContext);
    }

}
