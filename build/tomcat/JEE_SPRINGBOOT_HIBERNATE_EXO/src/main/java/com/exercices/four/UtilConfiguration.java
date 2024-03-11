/* ************************************************************************** */
/* ************************************************************************** */
/* ************************* UtilConfiguration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UtilConfiguration.java                                         */
/* ************************************************************************** */
/*  Creation Date : Jan 27, 2024, 2:46:57 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 27, 2024, 2:46:57 PM                                  */
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

package com.exercices.four;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UtilConfiguration {
    @Bean(name="dummyLoggerExo4")
    public DummyLogger dummyLogger(){
        return new DummyLogger();
    }
    
    @Bean
    public ListUtil listUtility(){
        return new ListUtil();
    }
    
    @Bean(name="stringUtility")
    public StringUtil stringUtil(){
        return new StringUtil();
    }
}

/* ************************************************************************** */
/* ************************* UTILCONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
