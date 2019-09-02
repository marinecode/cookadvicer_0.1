package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import recipes.Recipe;

import java.util.Optional;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    public Optional<Recipe> findRecipeByName( String name );
}
