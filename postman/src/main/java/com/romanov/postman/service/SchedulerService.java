package com.romanov.postman.service;

import com.romanov.postman.exception.CronTriggerIsNull;
import com.romanov.postman.exception.SenderBusyException;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.util.TimeZone;


@Service
public class SchedulerService {

    private ThreadPoolTaskScheduler scheduler;
    private CronTrigger currentTrigger;


    public SchedulerService() {
        this.scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(1);

    }

    public void setCronTrigger( CronTrigger trigger ) {
        currentTrigger = trigger;
    }

    public CronTrigger newCronTrigger( String exp ){
        TimeZone tz = TimeZone.getTimeZone("Europe/Moscow");
        return new CronTrigger( exp , tz );
    }

    public  void schedule( Runnable task ) throws CronTriggerIsNull, SenderBusyException {
        if( isActive() ){
            throw new SenderBusyException();
        }
        scheduler.initialize();
        if( currentTrigger == null ){
            throw new CronTriggerIsNull();
        }
        scheduler.schedule( task, currentTrigger );

    }

    public void shutdown(){
        currentTrigger = null;
        scheduler.shutdown();

    }

    public CronTrigger getCronTrigger(){
        return currentTrigger;
    }

    public boolean isActive(){
        try {
            scheduler.getScheduledExecutor();
        }catch ( IllegalStateException e ){
            return false;
        }
        return !scheduler.getScheduledExecutor().isShutdown();
    }
}
