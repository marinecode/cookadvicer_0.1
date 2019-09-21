package com.romanov.auth.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @JsonIgnore
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    @NotNull
    @JsonIgnore
    private String password;

    @NotBlank
    @JsonIgnore
    private String email;

    @ManyToOne
    @JoinColumn( name = "role_id" )
    @JsonIgnore
    private Role role;

}
