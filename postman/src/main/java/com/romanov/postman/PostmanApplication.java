package com.romanov.postman;

import com.romanov.postman.util.UserContextInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
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
public class PostmanApplication {

    public static void main(String[] args) {
        SpringApplication.run(PostmanApplication.class, args);
    }


        @Bean
        @Primary
        //добавляет заголовок с токеном полученным самим сервисом (не от юзера)
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
