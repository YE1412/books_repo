/* ************************************************************************** */
/* ************************************************************************** */
/* *************** Exo10ControllerIntegrationTestConfig.java **************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10ControllerIntegrationTestConfig.java                      */
/* ************************************************************************** */
/*  Creation Date : Feb 9, 2024, 5:43:46 PM                                   */
/* ************************************************************************** */
/*  Last modified : Feb 9, 2024, 5:43:46 PM                                   */
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
public class Exo10ControllerIntegrationTestConfig {
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
/* *************** EXO10CONTROLLERINTEGRATIONTESTCONFIG.JAVA **************** */
/* ************************************************************************** */
