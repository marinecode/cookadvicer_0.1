package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import recipes.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    public Optional<Recipe> findRecipeByName( String name );

    @Query(value = "SELECT COUNT( name ) FROM recipes WHERE name = :newname", nativeQuery = true)
    public Integer nameExistence(@Param("newname") String name );

    @Query(value = "SELECT name FROM recipes r WHERE r.type = :type ORDER BY rating DESC ", nativeQuery = true)
    public Optional<List<String>> namesByType(@Param("type") String type);

    @Query(value="SELECT name FROM recipes", nativeQuery = true )
    public Optional<List<String>> allRecipesNames();
}


