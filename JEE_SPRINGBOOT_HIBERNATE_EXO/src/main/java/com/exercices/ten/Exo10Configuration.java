/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ Exo10Configuration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10Configuration.java                                        */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 10:10:33 PM                                 */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 10:10:33 PM                                 */
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

import static java.util.Locale.filter;
import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableJpaRepositories("com.exercices.ten.repository")
@EntityScan("com.exercices.ten.entity")
@EnableWebSecurity
@EnableMethodSecurity(
    securedEnabled = true,
    jsr250Enabled = true,
    prePostEnabled = true
)
@AllArgsConstructor
public class Exo10Configuration {
    private final JwtTokenFilter jwtTokenFilter;
    
    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
       http.csrf((security) -> security.disable())
        .authorizeHttpRequests((requests) -> requests
            .requestMatchers(HttpMethod.POST, "/api/books/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.POST, "/api/books/**").hasAuthority("ROLE_ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/books/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/books/**").hasAuthority("ROLE_ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasAuthority("ROLE_ADMIN")
//            .requestMatchers("/api/user/signup").hasAnyRole("ADMIN")
//            .requestMatchers("/api/user/signup").hasAuthority("ROLE_ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/books/**").authenticated()
            .anyRequest().permitAll()
        );
        http.headers(heads -> heads.frameOptions(opt -> opt.disable()));
        
        http.addFilterBefore(jwtTokenFilter,
            UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        src.registerCorsConfiguration("/**", config);
        return new CorsFilter(src);
    }
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring()
//            .requestMatchers("/**");
//    }
}

/* ************************************************************************** */
/* ************************ EXO10CONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
