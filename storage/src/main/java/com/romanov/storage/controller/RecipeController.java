package com.romanov.storage.controller;

import com.romanov.storage.repos.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.Recipe;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/recipe", produces="application/json")
@CrossOrigin(origins = "*")
public class RecipeController {
    @Autowired
    private RecipeRepo recipeRepo;

    @GetMapping(path = "/{name}")
    private ResponseEntity<Recipe> getRecipeByName(@PathVariable("name") String name ){
        Optional<Recipe> rec = recipeRepo.findRecipeByName( name );
        if( rec.isPresent() ){
            return new ResponseEntity<>(rec.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>( null, HttpStatus.NOT_FOUND);
    }

    @PostMapping( path = "/add", consumes = "application/json")
    private Recipe addRecipe( @RequestBody Recipe recipe ){
        return recipeRepo.save( recipe );
    }

    @GetMapping(path = "/validation/name/{name}")
    private Integer nameValidation(@PathVariable("name") String name ){
        return recipeRepo.nameExistence(name);
    }

    @GetMapping(path ="/names/bytype")
    private ResponseEntity<List<String>> getNamesByType( @RequestParam("type") String type ){
        Optional<List<String>> names = recipeRepo.namesByType( type );
        return optionalExecute( names, HttpStatus.OK, HttpStatus.NO_CONTENT);
    }

    @GetMapping( path = "/names/all")
    private ResponseEntity<List<String>> getAllRecipesNames(){
        Optional<List<String>> names = recipeRepo.allRecipesNames();
        return optionalExecute( names, HttpStatus.OK, HttpStatus.NO_CONTENT );
    }


    private < E > ResponseEntity< E > optionalExecute( Optional< E > optional,
                                                       HttpStatus succsesStatus,
                                                       HttpStatus failStatus ){
        if( optional.isPresent() ){
            return new ResponseEntity<>(optional.get(), succsesStatus);
        }else{
            return new ResponseEntity<>(null, failStatus);
        }
    }
}
