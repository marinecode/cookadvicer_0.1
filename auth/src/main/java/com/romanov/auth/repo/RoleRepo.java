package com.romanov.auth.repo;

import com.romanov.auth.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {

    Role findByAuthority( String authority );
}
