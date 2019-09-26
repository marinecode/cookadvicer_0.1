package com.romanov.storage.controller;

import com.romanov.storage.dto.TypeDto;
import com.romanov.storage.repos.TypeRepo;
import com.romanov.storage.services.TypeService;
import com.romanov.storage.util.UserContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.Type;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping(value = "type", produces = "application/json")
@CrossOrigin(origins = "*")
public class TypeController {

    private TypeRepo typeRepo;
    private TypeService typeService;

    @Autowired
    public TypeController(TypeRepo typeRepo, TypeService typeService) {
        this.typeRepo = typeRepo;
        this.typeService = typeService;
    }

    @GetMapping("/all")
    private List<Type> getAllTypes(){
        List<Type> result = new ArrayList<Type>(typeRepo.findAllByCreator("Admin"));
        result.addAll(typeRepo.findAllByCreator(UserContextHolder.getContext().getUserName()));
        return result;
    }

    @PostMapping(value = "/add", consumes = "application/json")
    private Type addNewType( @RequestBody Type type ){
        type.setCreator( UserContextHolder.getContext().getUserName() );
        typeRepo.save( type );
        return type;
    }

    @GetMapping("/used")
    private ResponseEntity<List<TypeDto>>getAllUsedTypes(){
        List<TypeDto> types = typeService.getAllUsedTypes( UserContextHolder.getContext().getUserName() );
        if( types == null ){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>( types, HttpStatus.OK );
        }
    }



}
