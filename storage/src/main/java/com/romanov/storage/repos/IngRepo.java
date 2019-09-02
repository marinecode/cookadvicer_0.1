package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import recipes.Ingredient;

@CrossOrigin(origins="*")
public interface IngRepo extends JpaRepository<Ingredient, Long> {
}
