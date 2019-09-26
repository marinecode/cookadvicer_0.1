package com.romanov.postman.service;

import com.romanov.postman.model.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private AddressesService addressesService;

    @Autowired
    public EmailService(AddressesService adresesService) {
        this.addressesService = adresesService;
    }


    private List<UserDTO> getEmails(){
        return addressesService.getEmailAddresses().getBody();
    }

    private void sendEmail( String to, String userName ){

        System.out.println("to " + to + " Hello, " + userName);
    }

    public Runnable getSanding(){
        return new Sanding();
    }

    class Sanding implements Runnable{

        @Override
        public void run() {
            List<UserDTO> users = getEmails();
            users.forEach(user -> sendEmail( user.getEmail(), user.getUsername()));
        }
    }
}
