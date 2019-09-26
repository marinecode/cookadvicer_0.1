package com.romanov.postman.util;

public class UserContextHolder {

    private static final UserContext userContext = UserContext.getUserContext();

    public static UserContext getContext(){
        return userContext;
    }
}
