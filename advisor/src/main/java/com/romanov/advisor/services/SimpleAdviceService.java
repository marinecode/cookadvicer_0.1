package com.romanov.advisor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.Recipe;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SimpleAdviceService {

    @Autowired
   private StorageApiService storageApiService;

    /**Вернет список имен рецептов, указанных типов. Первыми в списке идут рецепты,
     * которые ниразу не готовили, отсортированные в порядке убывающего рейтинга.
     * Далее идут имена приготовленных ранее рецептов,
     * отсортированных в порядке давности (первые те, у кого самая ранняя дата последнего приготовления).
     */
    public List<String> getSimpleAdvise( String[] types ){
        List<Recipe> recipes = storageApiService.getRecipeByTypes( types ).getBody();
        LinkedList<Recipe> result = new LinkedList<>(notPrepRecipesOrderedByRating( recipes ));
        result.addAll( prepRecipesOrderedByLastPrepDate( recipes ));

        result.forEach( recipe -> System.out.println(recipe.getName() + " " +recipe.getRating() + " "
                + (recipe.getLastPrep()==null?"не готовилось":recipe.getLastPrep())));

        return result.stream().map(Recipe::getName).collect(Collectors.toList());
    }

    private List<Recipe> notPrepRecipesOrderedByRating( List<Recipe> recipes ){
       return recipes.stream()
                .filter( recipe -> recipe.getLastPrep() == null )
                .sorted( Comparator.comparing( Recipe::getRating ).reversed())
                .collect(Collectors.toList());
    }

    private List<Recipe> prepRecipesOrderedByLastPrepDate( List<Recipe> recipes ){
       return recipes.stream()
                .filter( recipe -> recipe.getLastPrep() != null )
                .sorted( Comparator.comparing(Recipe::getLastPrep).reversed() )
                .collect(Collectors.toList());
    }
}
