package com.romanov.postman;

import com.romanov.postman.model.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceImpl {

    @Autowired
    public JavaMailSender emailSender;

    public void sendSimpleMessage(UserDTO user, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo( user.getEmail() );
        message.setSubject(subject);
        message.setText("Hello, " + user.getUsername() + "! "+ '\n' + text);
        message.setFrom("artempomanov@gmail.com");
        emailSender.send(message);
    }

    public void sendEmailToConsole(UserDTO user, String subject, String text){
        System.out.println( "to " + user.getEmail() );
        System.out.println("subject: " + subject );
        System.out.println( "Hello, " + user.getUsername() );

    }
}