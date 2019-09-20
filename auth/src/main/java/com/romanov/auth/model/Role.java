package com.romanov.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
public class Role implements GrantedAuthority {

    @Id
    @NotNull
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private int id;

    @NotBlank
    @NotNull
    @Column(name ="role")
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<User> users;
}
