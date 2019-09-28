package com.romanov.postman.service;

import com.romanov.postman.model.MailSettings;
import com.romanov.postman.model.UserDTO;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EmailService {

    private AddressesService addressesService;
    private JavaMailSender emailSender;
    private SimpleTriggerContext triggerContext;

    @Getter
    private SimpleMailMessage messageTemplate = new SimpleMailMessage();

    @Autowired
    public EmailService(AddressesService addressesService, JavaMailSender emailSender) {
        this.addressesService = addressesService;
        this.emailSender = emailSender;
        triggerContext = new SimpleTriggerContext();
        messageTemplate.setFrom("artempomanov@gmail.com");
    }


    private List<UserDTO> getAddresses(){
        return addressesService.getEmailAddresses().getBody();
    }

    public void setMessageTemplate( MailSettings settings ){
        messageTemplate.setText( settings.getText() );
        messageTemplate.setSubject( settings.getSubject() );
    }

    public void sendSimpleMessage( UserDTO user ) {
        messageTemplate.setTo( user.getEmail() );
        emailSender.send(messageTemplate);
    }

    public void sendEmailToConsole(UserDTO user){
        System.out.println( "to " + user.getEmail() );
        System.out.println("subject: " );
        System.out.println( "Hello, " + user.getUsername() );
        System.out.println( "text" );
    }

    public void sendEmailToConsole(UserDTO user, MailSettings settings ){
        System.out.println( "to " + user.getEmail() );
        System.out.println("subject: " + settings.getSubject() );
        System.out.println( "Hello, " + user.getUsername() );
        System.out.println( settings.getText() );
    }


    public void sendMessageRightNow( MailSettings settings ){
        List<UserDTO> users = getAddresses();
        users.forEach( user -> sendEmailToConsole(user, settings));
    }

    public Runnable getSending(){
        return new Sending();

    }

    class Sending implements Runnable{

        @Override
        public void run() {
            triggerContext.update(new Date(), new Date(), null);
            List<UserDTO> users = getAddresses();
            users.forEach(user -> sendEmailToConsole( user ));
            triggerContext.update(
                    triggerContext.lastScheduledExecutionTime(),
                    triggerContext.lastActualExecutionTime(),
                    new Date());
        }
    }

    public TriggerContext getTriggerContext(){
        return triggerContext;
    }
}
