package com.romanov.advisor.services;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import recipes.Recipe;

import java.util.List;

@Service
public class StorageApiService {

    private final String gateWayUrl = "";
    private final String storageUtl =  gateWayUrl + "http://localhost:10000";

    ResponseEntity<List<Recipe>> getRecipeByTypes(String[] types){
        RestTemplate rest = new RestTemplate();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl( storageUtl + "/recipe/bytypes")
                                                          .queryParam("types", (Object[]) types).build();

        return rest.exchange( uriComponents.toUriString(), HttpMethod.GET, HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<Recipe>>() {});
    }

    ResponseEntity<List<String>> getRecipeNamesByIngs( String[] ings ){
        RestTemplate rest = new RestTemplate();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl( storageUtl + "/recipe/names/byings")
                .queryParam("ings", (Object[]) ings).build();

        return rest.exchange( uriComponents.toUriString(), HttpMethod.GET, HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<String>>() {});
    }

}
