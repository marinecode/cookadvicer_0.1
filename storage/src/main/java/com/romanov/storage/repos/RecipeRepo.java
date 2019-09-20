package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import recipes.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {
    Optional<Recipe> findRecipeByName(String name);

    Optional<List<Recipe>> findRecipeByTypeIn(String[] typenames);

    Boolean existsByName( String name );

    @Query(value = "SELECT name FROM recipes r WHERE r.type = :type ORDER BY rating DESC ", nativeQuery = true)
    Optional<List<String>> namesByType(@Param("type") String type);

    @Query(value="SELECT name FROM recipes", nativeQuery = true )
    Optional<List<String>> allRecipesNames();

    @Query(value = "SELECT recipes.name FROM recipes WHERE NOT EXISTS " +
                        "(SELECT ing_name " +
                        "FROM all_recipes_with_ings "+
                        "WHERE recipe_name = recipes.name "+
                        "EXCEPT "+
                        "SELECT ing_name " +
                        "FROM all_recipes_with_ings "+
                        "WHERE ing_name IN :ings )", nativeQuery = true )
    Optional<List<String>> namesByIngs(@Param("ings") String[] ings);
}


