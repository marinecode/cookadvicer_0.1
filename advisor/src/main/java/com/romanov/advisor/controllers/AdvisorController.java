package com.romanov.advisor.controllers;

import com.romanov.advisor.services.ByIngsAdviseService;
import com.romanov.advisor.services.SimpleAdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/advisor", produces = "application/json")
public class AdvisorController {

   private SimpleAdviceService simpleAdviceService;
   private ByIngsAdviseService byIngsAdviseService;

   @Autowired
    public AdvisorController(SimpleAdviceService simpleAdviceService, ByIngsAdviseService byIngsAdviseService) {
        this.simpleAdviceService = simpleAdviceService;
        this.byIngsAdviseService = byIngsAdviseService;
    }

    @GetMapping("/simple")
    private List<String> getSimpleAdvice(@RequestParam("types") String[] types){
        return simpleAdviceService.getSimpleAdvise( types );
    }

    @GetMapping("/byings")
    private ResponseEntity<List<String>> getAdviseByIngs( @RequestParam("ings") String[] ings ){
        return byIngsAdviseService.getByIngsAdvice( ings );
    }

    private < E > ResponseEntity< E > optionalExecute( Optional< E > optional,
                                                       HttpStatus succsesStatus,
                                                       HttpStatus failStatus ){
        return optional.map(e -> new ResponseEntity<>(e, succsesStatus)).orElseGet(() -> new ResponseEntity<>(null, failStatus));
    }
}
