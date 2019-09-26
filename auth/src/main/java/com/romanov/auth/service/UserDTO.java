package com.romanov.auth.service;

import com.romanov.auth.model.User;
import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String email;

    public UserDTO( User user ){
        username = user.getUsername();
        email = user.getEmail();
    }
}
