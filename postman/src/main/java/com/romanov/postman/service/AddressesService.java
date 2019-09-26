package com.romanov.postman.service;

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


    @Autowired
    public AddressesService(RestTemplate rest, AuthService authService) {
        this.rest = rest;
        this.authService = authService;
    }

    private String emailUrl = "http://localhost:8080/api/auth/users/emails";

    ResponseEntity<List<UserDTO>> getEmailAddresses(){
        if (this.authService.login()){
            System.out.println("Postman loggedIn");;
            return rest.exchange( emailUrl, HttpMethod.GET, HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<UserDTO>>() {});
        }else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
    }

