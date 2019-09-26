package com.romanov.advisor.util;

public class UserContext {

    public static final String AUTH_TOKEN = "Authorization";
    private static final ThreadLocal<String> userName = new ThreadLocal<String>();
    private static final ThreadLocal<String> authToken= new ThreadLocal<String>();

    public static String getAuthToken() { return authToken.get(); }
    public static void setAuthToken(String aToken) {authToken.set(aToken);}

    public static String getUserName() { return userName.get(); }
    public static void setUserName(String name) {userName.set(name);}
}
