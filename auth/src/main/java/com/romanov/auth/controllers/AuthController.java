package com.romanov.auth.controllers;

import com.romanov.auth.exception.UserAlreadyExists;
import com.romanov.auth.model.User;
import com.romanov.auth.service.UserDTO;
import com.romanov.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/users/register", consumes = "application/json")
    public ResponseEntity<User> register( @RequestBody User user ){
        User createdUser = null;
        try {
            createdUser = userService.register(user);

        }catch ( UserAlreadyExists e ){
            return new ResponseEntity<>( user, HttpStatus.CONFLICT );
        }
        return new ResponseEntity<>( createdUser, HttpStatus.CREATED );
    }

    @GetMapping("/users/emails")
    public ResponseEntity<List<UserDTO>> getAddress(){
        return new ResponseEntity<>(userService.getAddress(), HttpStatus.OK);
    }

}
