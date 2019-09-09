package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import recipes.Type;

public interface TypeRepo extends JpaRepository<Type, String> {
}
