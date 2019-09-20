package com.romanov.auth.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
public class ResourceServiceConfiguration extends ResourceServerConfigurerAdapter {


    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .authorizeRequests()
                .antMatchers("/users/register").permitAll()
                .antMatchers(HttpMethod.OPTIONS,"/oauth/token").permitAll();
    }
}
