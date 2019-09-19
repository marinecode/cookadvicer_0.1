package com.romanov.advisor;

import com.romanov.advisor.util.UserContextInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@SpringBootApplication
@EnableResourceServer
public class AdvisorApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdvisorApplication.class, args);

    }

    @Bean
    @Primary
    public RestTemplate getCustomRestTemplate(){
        RestTemplate rest = new RestTemplate();

        List<ClientHttpRequestInterceptor> interceptors = rest.getInterceptors();
        if( interceptors == null ){
            rest.setInterceptors( Collections.singletonList( new UserContextInterceptor() ));
        }else {
            interceptors.add( new UserContextInterceptor() );
            rest.setInterceptors( interceptors );
        }
        return rest;
    }

}
