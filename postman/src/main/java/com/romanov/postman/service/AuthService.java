package com.romanov.postman.service;


import com.romanov.postman.config.ServiceConfig;
import com.romanov.postman.model.JWT;
import com.romanov.postman.util.UserContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.*;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuthService {

    private ServiceConfig config;

    @Autowired
    public AuthService(ServiceConfig serviceConfig) {
        this.config = serviceConfig;
    }

    class CustomInterceptor implements ClientHttpRequestInterceptor{

        @Override
        public ClientHttpResponse intercept(HttpRequest httpRequest,
                                            byte[] bytes,
                                            ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {

            HttpHeaders headers = httpRequest.getHeaders();
            headers.add("Content-Type", "application/x-www-form-urlencoded");
            String body = "grant_type=password&scope=post&username="+config.getUsername()
                    +"&password="+config.getPassword();
            bytes = body.getBytes();
            headers.set("Content-Length","" + bytes.length );
            return clientHttpRequestExecution.execute( httpRequest, bytes );
        }
    }

    private RestTemplate restTemplate(){
        RestTemplate rest = new RestTemplate();
        BasicAuthenticationInterceptor authInterceptor =
                new BasicAuthenticationInterceptor( config.getClient() , config.getSecret() );
        List<ClientHttpRequestInterceptor> intersept = rest.getInterceptors();
        if(intersept == null){
            intersept = new ArrayList<ClientHttpRequestInterceptor>();
        }
        intersept.add(authInterceptor);
        intersept.add(new CustomInterceptor());
        rest.setInterceptors( intersept );

        return rest;
    }

    boolean login(){
       RestTemplate rest = restTemplate();
       ResponseEntity<JWT> token = rest.postForEntity( config.getLoginUrl(), null ,JWT.class);
        UserContextHolder.getContext().setAuthToken( "Bearer "+token.getBody().getAccess_token() );
        return !(token.getBody()==null);
    }


}
