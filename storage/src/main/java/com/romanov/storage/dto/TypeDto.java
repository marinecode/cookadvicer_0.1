package com.romanov.storage.dto;

import lombok.Data;
import recipes.Type;

@Data
public class TypeDto {
    private String name;

    public TypeDto( Type type ){
        name = type.getName();
    }
    public TypeDto( String name ){ this.name = name; }
}
