package com.romanov.advisor.util;

import com.romanov.advisor.config.ServiceConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.aspectj.lang.annotation.AdviceName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class UserContextFilter implements Filter {
    @Autowired
    private ServiceConfig serviceConfig;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String token = httpServletRequest.getHeader(UserContext.AUTH_TOKEN);
        UserContextHolder.getContext().setAuthToken( token );
        filterChain.doFilter(httpServletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }

}
