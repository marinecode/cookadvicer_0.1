package com.romanov.postman.util;

public class UserContext {

    private UserContext(){}

    private static UserContext context;

    private static String authToken = "";
    public static final String AUTH_TOKEN = "Authorization";

    public static synchronized String getAuthToken() {
        return authToken;
    }

    public static synchronized void setAuthToken( String token ) {
        authToken = (token);
    }

    public static UserContext getUserContext(){
        if( context == null ){
            context = new UserContext();
        }
        return context;
    }

}
