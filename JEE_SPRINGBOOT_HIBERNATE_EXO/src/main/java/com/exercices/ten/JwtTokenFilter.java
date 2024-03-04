/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** JwtTokenFilter.java *************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : JwtTokenFilter.java                                            */
/* ************************************************************************** */
/*  Creation Date : Feb 27, 2024, 12:56:46 PM                                 */
/* ************************************************************************** */
/*  Last modified : Feb 27, 2024, 12:56:46 PM                                 */
/* ************************************************************************** */
/*  Created by : Mad <coding>                                                 */
/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*                                                                            */
/*                    :::::   ::::::            ::::::::           :::::::    */
/*                  :+:   :+:+     +:+        :+:     :+:        :+:    :+:   */
/*                #:#     +:+     +:+       +:+      +:+       +:+       :+:  */
/*              +#+      #+#     +:+      +:+:+:+:+:+:+      +:+        :+:   */
/*            +#+       #:#     #+#     #+#        :+:     +:+         :+:    */
/*          +#+        #+#     #:#    +#+         #:#    #+#          :+:     */
/*        ###         ###     ###   ###          ###   #############.fr       */
/*                                                                            */
/* ************************************************************************** */

package com.exercices.ten;

import com.exercices.ten.entity.UserBook;
import com.exercices.ten.repository.UserBookRepository;
import com.exercices.ten.service.UserRoleDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.logging.Level;
import java.util.logging.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    
    private final JwtTokenUtil jwtTokenUtil;
//    private final UserBookRepository ubr;
    private final UserRoleDetails urd;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Get authorization header and validate
            final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (header == null || header.isEmpty() || !header.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }
            
            // Get jwt token and validate
            final String token = header.split(" ")[1].trim();
            String usernameOrEmail = jwtTokenUtil.getUsernameFromToken(token);
//            System.out.println(usernameOrEmail);
            UserDetails user = urd.loadUserByUsername(usernameOrEmail);
            if (!jwtTokenUtil.validateToken(token, user)) {
                filterChain.doFilter(request, response);
                return;
            }
            
//            System.out.println("Token validated !");
            // Get user identity and set it on the spring security context
            UsernamePasswordAuthenticationToken
                    authentication = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                    );
            
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            authentication.getAuthorities().stream()
//                .map((auth) -> {
//                    System.out.println(auth.getAuthority());
//                    return auth;
//                });
            filterChain.doFilter(request, response);
        } catch (NoSuchAlgorithmException | InvalidKeyException | InvalidKeySpecException ex) {
            Logger.getLogger(JwtTokenFilter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}

/* ************************************************************************** */
/* ************************** JWTTOKENFILTER.JAVA *************************** */
/* ************************************************************************** */
