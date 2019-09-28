package com.romanov.postman.controller;

import com.romanov.postman.exception.CronTriggerIsNull;
import com.romanov.postman.exception.SenderBusyException;
import com.romanov.postman.model.MailSettings;
import com.romanov.postman.model.State;
import com.romanov.postman.service.AuthService;
import com.romanov.postman.service.EmailService;
import com.romanov.postman.service.SchedulerService;
import com.romanov.postman.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/")
@CrossOrigin("*")

public class PostmanController {

    private SchedulerService schedulerService;
    private EmailService emailService;
    private StateService stateService;

    @Autowired
    public PostmanController(SchedulerService schedulerService, EmailService emailService, StateService stateService) {
        this.schedulerService = schedulerService;
        this.emailService = emailService;
        this.stateService = stateService;
    }


    @GetMapping("send")
    public ResponseEntity<State> sendEmailWithCurrentCron(@RequestBody MailSettings settings ){
        emailService.setMessageTemplate( settings );
        State state = stateService.getState();
        try{
            schedulerService.schedule( emailService.getSending() );
        }catch (CronTriggerIsNull e){

            state.setMessage("Не установлена периодичность.");
            return new ResponseEntity<State>( state, HttpStatus.CONFLICT);
        }catch (SenderBusyException e){

            state.setMessage("Рассылка активна. Хотите изменить расписание или сообщение, остановите текущую рассылку.");
            return new ResponseEntity<State>( state, HttpStatus.OK);
        }
        state.setMessage("Рассылка активна");
        return new ResponseEntity<State>( stateService.getState(), HttpStatus.OK);
    }

    @GetMapping("sendnow")
    private ResponseEntity<State> sendRightNow( @RequestBody MailSettings settings ){
        emailService.sendMessageRightNow( settings );
        return new ResponseEntity<State>( stateService.getState(), HttpStatus.OK);
    }

    @GetMapping("stop")
    public ResponseEntity<State> stopSending(){
        schedulerService.shutdown();
        return new ResponseEntity<State>(stateService.getState(), HttpStatus.OK);
    }

    @GetMapping("cron")
    public ResponseEntity<State> startWithCron(@RequestParam("exp") String exp ){
        exp = exp.substring(1, exp.length() - 1);
        schedulerService.setCronTrigger( schedulerService.newCronTrigger( exp ) );
        return new ResponseEntity<State>(stateService.getState() , HttpStatus.OK);
    }

    @GetMapping(value = "state", produces = "application/json")
    public ResponseEntity<State> getCurrentState(){
        return new ResponseEntity<State>( stateService.getState(), HttpStatus.OK);
    }
}

