package com.romanov.postman.model;

import lombok.Data;

import java.util.Date;

@Data
public class State {
    private Date nextSend = null;
    private String cronExp = "нет выражения";
    private String text = "нет текста";
    private String subject = "нет темы";
    private boolean isActive = false;
    private String message;
}
