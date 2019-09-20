package com.romanov.auth.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    @NotNull
    private String password;

    @NotBlank
    private String email;

    @ManyToOne
    @JoinColumn( name = "role_id" )
    private Role role;

}
