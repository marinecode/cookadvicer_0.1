package com.romanov.postman.service;

import com.romanov.postman.model.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;



@Service
public class StateService {

    private EmailService emailService;
    private SchedulerService schedulerService;

    @Autowired
    public StateService(EmailService emailService, SchedulerService schedulerService) {
        this.emailService = emailService;
        this.schedulerService = schedulerService;
    }

    public State getState(){
        State state = new State();
        state.setText( emailService.getMessageTemplate().getText() );
        state.setSubject( emailService.getMessageTemplate().getSubject() );
        CronTrigger trigger = schedulerService.getCronTrigger();
        if( trigger != null ){
            state.setCronExp( trigger.getExpression() );
            state.setNextSend( trigger.nextExecutionTime( emailService.getTriggerContext() ));
        }
        state.setActive( schedulerService.isActive() );
        return state;
    }
}
