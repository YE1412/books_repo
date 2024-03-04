/* ************************************************************************** */
/* ************************************************************************** */
/* ***************** Exo10ServiceIntegrationTestConfig.java ***************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10ServiceIntegrationTestConfig.java                         */
/* ************************************************************************** */
/*  Creation Date : Feb 14, 2024, 11:14:46 AM                                 */
/* ************************************************************************** */
/*  Last modified : Feb 14, 2024, 11:14:46 AM                                 */
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

package com.tests.exo10.config;

import com.exercices.ten.service.BookService;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@TestConfiguration
public class Exo10ServiceIntegrationTestConfig {
    @Bean(name="webSecurityCustomizerConfig")
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            .requestMatchers("/**");
    }
    
    @Bean
    public BookService bookService(){
        return new BookService();
    } 
}

/* ************************************************************************** */
/* ***************** EXO10SERVICEINTEGRATIONTESTCONFIG.JAVA ***************** */
/* ************************************************************************** */
