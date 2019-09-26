package com.romanov.auth.service;

import com.romanov.auth.exception.UserAlreadyExists;
import com.romanov.auth.model.User;
import com.romanov.auth.repo.RoleRepo;
import com.romanov.auth.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserService implements UserDetailsService {

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Transactional
    public User register( User newUser ) throws UserAlreadyExists {
        if( userRepo.existsByUsername(  newUser.getUsername() )){
            throw new UserAlreadyExists( newUser );
        }

        newUser.setPassword( passwordEncoder.encode( newUser.getPassword() ));
        newUser.setRole( roleRepo.findByAuthority("ROLE_USER"));

        return userRepo.save( newUser );
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepo.findByUsername( s );
        return new UserPrincipal( user );
    }

    public List<UserDTO> getAddress(){
        List<User> users = userRepo.findAll();
        return users.stream().map(UserDTO::new).collect(Collectors.toList());
    }
}
