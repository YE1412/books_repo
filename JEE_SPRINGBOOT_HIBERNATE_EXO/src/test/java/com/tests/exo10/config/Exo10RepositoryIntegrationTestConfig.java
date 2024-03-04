/* ************************************************************************** */
/* ************************************************************************** */
/* *************** Exo10RepositoryIntegrationTestConfig.java **************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10RepositoryIntegrationTestConfig.java                      */
/* ************************************************************************** */
/*  Creation Date : Feb 14, 2024, 11:13:29 AM                                 */
/* ************************************************************************** */
/*  Last modified : Feb 14, 2024, 11:13:29 AM                                 */
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

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@TestConfiguration
public class Exo10RepositoryIntegrationTestConfig {
    @Bean(name="webSecurityCustomizerConfig")
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            .requestMatchers("/**");
    }
}

/* ************************************************************************** */
/* *************** EXO10REPOSITORYINTEGRATIONTESTCONFIG.JAVA **************** */
/* ************************************************************************** */
