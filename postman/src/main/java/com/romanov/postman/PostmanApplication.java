package com.romanov.postman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PostmanApplication {

    public static void main(String[] args) {
        SpringApplication.run(PostmanApplication.class, args);
    }

    @Autowired
    EmailServiceImpl emailService;

    @Bean
    CommandLineRunner runner(){
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                System.out.println("Сейчас пошлю письмо");
                emailService.sendSimpleMessage( "artem.romanov.nn@yandex.ru", "Привет из Java", "Весенний привет!");
                System.out.println("Послал, проверяй");
            }
        };
    }
}
