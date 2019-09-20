package com.romanov.auth.exception;

import com.romanov.auth.model.User;

public class UserAlreadyExists extends Exception {

    public UserAlreadyExists(User user){
        super( user.toString() );
    }
}
