package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import recipes.Ingredient;


public interface IngRepo extends JpaRepository<Ingredient, Long> {
}
