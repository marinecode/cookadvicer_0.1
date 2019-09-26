package com.romanov.postman.util;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class UserContextFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String authHeader = req.getHeader(UserContext.AUTH_TOKEN);
        UserContextHolder.getContext().setAuthToken( authHeader );
        System.out.println( UserContextHolder.getContext().getAuthToken() );
        filterChain.doFilter( req, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
