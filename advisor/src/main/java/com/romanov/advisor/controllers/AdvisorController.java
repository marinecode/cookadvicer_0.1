package com.romanov.advisor.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/advisor", produces = "application/json")
public class AdvisorController {


    @GetMapping("/simple")
    private ResponseEntity<List<String>> getSimpleAdvice(
            @RequestParam(value = "interval", defaultValue = "7" ) Integer interval ){
        return null;
    }

}
