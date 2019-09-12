package com.romanov.storage.controller;

import com.romanov.storage.repos.HistoryRepo;
import com.romanov.storage.repos.RecipeRepo;
import history.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recipes.Recipe;

import java.util.Date;

@RestController
@RequestMapping(value = "history", produces = "application/json")
@CrossOrigin("*")
public class HistoryController {

    @Autowired
    HistoryRepo historyRepo;
    @Autowired
    RecipeRepo recipeRepo;

    @PostMapping(path = "/add", consumes = "application/json")
    private Record addRecord( @RequestBody Record record ) {

        Record savedRecord = historyRepo.save( record );
        refreshRecipePrepDate( savedRecord );
        return savedRecord;

    }

    private void refreshRecipePrepDate( Record record ){
        String recipeName = record.getRecipeName();
        Date prepDate = record.getPrepDate();
        Recipe recipeFromDB = recipeRepo.findRecipeByName( recipeName ).get();
        recipeFromDB.setLastPrep( prepDate );
        recipeRepo.save( recipeFromDB );
    }
}
