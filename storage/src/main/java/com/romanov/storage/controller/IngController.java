package com.romanov.storage.controller;

import com.romanov.storage.repos.IngRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.Ingredient;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping( path = "/ingredient",  produces="application/json")
@CrossOrigin(origins="*")
public class IngController {

    @Autowired
    private IngRepo ingRepo;

    @PostMapping(value = "add", consumes = "application/json")
    private Ingredient addIng( @RequestBody Ingredient ing ){
        System.out.println( ing.getName() );
        ingRepo.save( ing );
        return ing;
    }

    @GetMapping("/{id}")
    private ResponseEntity<Ingredient> getIngById( @PathVariable("id") Long id ){
        Optional<Ingredient> ing = ingRepo.findById( id );
        if( ing.isPresent() ){
            return new ResponseEntity<>(ing.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>( null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    private List<Ingredient> getAllIngs(){
        List<Ingredient> ings = ingRepo.findAll();
        return ings;
    }
}

