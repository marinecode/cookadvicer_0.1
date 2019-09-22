package com.romanov.auth.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String password;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
    @JsonIgnore
    public String getEmail() {
        return email;
    }
    @JsonProperty
    public void setEmail(String email) {
        this.email = email;
    }

    @NotBlank
    private String email;

    @ManyToOne
    @JoinColumn( name = "role_id" )
    @JsonIgnore
    private Role role;

}
