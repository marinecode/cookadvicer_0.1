package com.romanov.storage.controller;

import com.romanov.storage.repos.HistoryRepo;
import history.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "history", produces = "application/json")
@CrossOrigin("*")
public class HistoryController {

    @Autowired
    HistoryRepo historyRepo;

    @PostMapping(path = "/add", consumes = "application/json")
    private Record addRecord( @RequestBody Record record ){
        return historyRepo.save( record );
    }

    
}
