package com.romanov.storage.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import recipes.Type;

import java.util.List;

public interface TypeRepo extends JpaRepository<Type, String> {

    List<Type> findAllByCreator(String creator );
}
