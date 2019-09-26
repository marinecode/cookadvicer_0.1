package com.romanov.postman.service;

import com.romanov.postman.config.ServiceConfig;
import com.romanov.postman.model.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AddressesService {

    private RestTemplate rest;
    private AuthService authService;
    private ServiceConfig config;

    @Autowired
    public AddressesService(RestTemplate rest, AuthService authService, ServiceConfig config) {
        this.rest = rest;
        this.authService = authService;
        this.config = config;
    }


    ResponseEntity<List<UserDTO>> getEmailAddresses(){
        if (this.authService.login()){
            return rest.exchange( config.getEmailUrl() , HttpMethod.GET, HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<UserDTO>>() {});
        }else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
    }

