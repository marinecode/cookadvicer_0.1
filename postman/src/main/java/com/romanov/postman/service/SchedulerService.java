package com.romanov.postman.service;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;


@Service
public class SchedulerService {

    private ThreadPoolTaskScheduler scheduler;


    public SchedulerService() {
        this.scheduler = new ThreadPoolTaskScheduler();
        scheduler.initialize();
    }

    public CronTrigger cronTrigger( String exp ){
        return new CronTrigger( exp );
    }

    public CronTrigger every5seconds(){
        return new CronTrigger("0/5 * * * * *");
    }

    public void schedule(Runnable task, Trigger trigger ){
        scheduler.schedule( task, trigger );

    }

    public void shutdown(){
        scheduler.shutdown();
        scheduler.initialize();
    }
}
