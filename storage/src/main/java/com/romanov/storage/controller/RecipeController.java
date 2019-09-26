package com.romanov.storage.controller;

import com.romanov.storage.repos.RecipeRepo;
import com.romanov.storage.util.UserContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
        return optionalExecute( rec, HttpStatus.OK, HttpStatus.NOT_FOUND);
    }

    @PostMapping( path = "/add", consumes = "application/json")
    private Recipe addRecipe( @RequestBody Recipe recipe ){
        recipe.setCreator( UserContextHolder.getContext().getUserName() );

        return recipeRepo.save( recipe );
    }

    @GetMapping( path = "/bytypes")
    private ResponseEntity<List<Recipe>> getRecipeByTypes( @RequestParam( "types") String[] types ){
        return optionalExecute( recipeRepo.findRecipeByTypeInAndCreator( types,  UserContextHolder.getContext().getUserName() ),
                            HttpStatus.OK, HttpStatus.NO_CONTENT );
    }

    @GetMapping(path = "/validation/name/{name}")
    private Boolean nameValidation(@PathVariable("name") String name ){
        return recipeRepo.existsByName(name);
    }


    @GetMapping(path ="/names/bytype")
    private ResponseEntity<List<String>> getNamesByType( @RequestParam("type") String type ){
        Optional<List<String>> names = recipeRepo.namesByTypeAndCreator( type , UserContextHolder.getContext().getUserName());
        return optionalExecute( names, HttpStatus.OK, HttpStatus.NO_CONTENT);
    }

    @GetMapping( path = "/names/all")
    private ResponseEntity<List<String>> getAllRecipesNames(){
        Optional<List<String>> names = recipeRepo.allRecipesNamesByCreator( UserContextHolder.getContext().getUserName() );
        return optionalExecute( names, HttpStatus.OK, HttpStatus.NO_CONTENT );
    }

    @GetMapping(path = "/names/byings")
    private ResponseEntity<List<String>> getNamesByIng ( @RequestParam("ings") String[] ings ){
        Optional<List<String>> names = recipeRepo.namesByIngsAndCreator( ings, UserContextHolder.getContext().getUserName() );
        return optionalExecute( names, HttpStatus.OK, HttpStatus.NO_CONTENT );
    }


    private < E > ResponseEntity< E > optionalExecute( Optional< E > optional,
                                                       HttpStatus succsesStatus,
                                                       HttpStatus failStatus){
        return optional.map(e -> new ResponseEntity<>(e, succsesStatus)).orElseGet(() -> new ResponseEntity<>( null ,failStatus));
    }
}
