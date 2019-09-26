package com.romanov.postman.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AdresesService {

    private RestTemplate rest;

    @Autowired
    public AdresesService(RestTemplate rest) {
        this.rest = rest;
    }

    String emailUrl = "http://localhost:8080/api/auth/users/emails";

    ResponseEntity<List<UserDTO>> getEmailAdreses(){
        return rest.exchange( emailUrl, HttpMethod.GET, HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<UserDTO>>() {});
    }
}
