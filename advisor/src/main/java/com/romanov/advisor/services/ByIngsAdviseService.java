package com.romanov.advisor.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ByIngsAdviseService {

  private StorageApiService storageApiService;

    @Autowired
    public ByIngsAdviseService(StorageApiService storageApiService) {
        this.storageApiService = storageApiService;
    }

    /**Возвращает список имен рецептов, которые можно приготовить из имеющихся у пользователя ингредиентов
     *Вся логика выбора рецептов реализована на стороне базы данных */
    public ResponseEntity<List<String>> getByIngsAdvice( String[] ings ){
        return storageApiService.getRecipeNamesByIngs( ings );
    }
}
