package com.romanov.auth.repo;

import com.romanov.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByUsername( String username );

    boolean existsByUsername( String username );
}
