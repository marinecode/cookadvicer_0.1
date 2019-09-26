package com.romanov.storage.repos;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import recipes.Type;

import java.util.List;
import java.util.Optional;

public interface TypeRepo extends JpaRepository<Type, String> {

    List<Type> findAllByCreator( String creator );

    @Query(value = "SELECT DISTINCT type from recipes where creator = :creator", nativeQuery = true )
    Optional<List<String>> findAllUsedTypes(@Param("creator") String creator );
}
