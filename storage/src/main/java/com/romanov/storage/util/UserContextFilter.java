package com.romanov.storage.util;


import com.romanov.storage.config.ServiceConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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
        String userName = getUserName( token );

        UserContextHolder.getContext().setAuthToken( token );
        UserContextHolder.getContext().setUserName( userName );

        filterChain.doFilter(httpServletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }

    private String getUserName(String authHeader) {
        String authToken = authHeader.replace("Bearer", "");
        String result = "";
        try {
            Claims claims = Jwts.parser().setSigningKey( serviceConfig.getJwtSignKey().getBytes("UTF-8"))
                    .parseClaimsJws( authToken )
                    .getBody();
            result =(String) claims.get("user_name");
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
