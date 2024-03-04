/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ Exo12Configuration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo12Configuration.java                                        */
/* ************************************************************************** */
/*  Creation Date : Jan 31, 2024, 4:27:47 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 31, 2024, 4:27:47 PM                                  */
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

package com.exercices.twelve;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Exo12Configuration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((security) -> security.ignoringRequestMatchers("/api/**"))
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers(HttpMethod.GET, "/api/cars*").hasAnyRole("ADMIN", "CARS")
                .requestMatchers(HttpMethod.POST, "/api/cars*").authenticated()
                .requestMatchers("/api/users/**").hasAnyAuthority("ROLE_USER_ADMIN")
                .anyRequest().permitAll())
                .formLogin((form) -> form.permitAll())
                .httpBasic(Customizer.withDefaults())
                .headers(headers -> headers.frameOptions(option -> option.disable()))
                .logout((logout) -> logout.permitAll());
        return http.build();
    }
    
    @Bean
    public UserDetailsService userDetailsService(){
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        UserDetails admin = 
                User.withUsername("admin")
                    .password(encoder.encode("Secret_123"))
                    .roles("ADMIN", "CARS")
                    .build();
        UserDetails admin2 = 
                User.withUsername("admin2")
                    .password(encoder.encode("Secret_123"))
                    .authorities("ROLE_USER_ADMIN")
                    .build();
        UserDetails admin3 = 
                User.withUsername("admin3")
                    .password(encoder.encode("Secret_123"))
                    .roles("CARS")
                    .build();
        InMemoryUserDetailsManager ret = new InMemoryUserDetailsManager(admin, admin2, admin3);
        return ret;
    }
}

/* ************************************************************************** */
/* ************************ EXO12CONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
