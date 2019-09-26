package com.romanov.postman.controller;

import com.romanov.postman.service.EmailService;
import com.romanov.postman.service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/")
public class PostmanController {

    SchedulerService schedulerService;
    EmailService emailService;

    @Autowired
  public PostmanController(SchedulerService schedulerService, EmailService emailService) {
        this.schedulerService = schedulerService;
        this.emailService = emailService;
    }

    @GetMapping("send")
    public ResponseEntity<String> sendEmailEveryFive(){
        schedulerService.schedule( emailService.getSanding(), schedulerService.every5seconds() );
        return new ResponseEntity<String>("отправляю письма каждые 5 секунд", HttpStatus.OK);
    }

    @GetMapping("stop")
    public ResponseEntity<String> stopSending(){
        schedulerService.shutdown();
        return new ResponseEntity<String>("остановил отправку", HttpStatus.OK);
    }

    @GetMapping("cron")
    public ResponseEntity<String> sartWithCron(@RequestParam("exp") String exp ){
        exp = exp.substring(1,exp.length());
        CronTrigger cron = schedulerService.cronTrigger( exp );
        schedulerService.schedule( emailService.getSanding(), cron );
        return new ResponseEntity<String>("начал отправку в соответствии с " + exp, HttpStatus.OK);
    }
}

