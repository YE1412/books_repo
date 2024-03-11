/* ************************************************************************** */
/* ************************************************************************** */
/* ************************* Exo2Configuration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo2Configuration.java                                         */
/* ************************************************************************** */
/*  Creation Date : Jan 28, 2024, 12:36:59 PM                                 */
/* ************************************************************************** */
/*  Last modified : Jan 28, 2024, 12:36:59 PM                                 */
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

package com.exercices.two;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Exo2Configuration {
    @Bean(name="dummyLoggerExo2")
    public DummyLogger getDummyLogger(){
        return new com.exercices.two.DummyLogger();
    }
    
    @Bean
    public CommandLineRunnerWithSetterInjection getCommandLineRunnerWithSetterInjection(){
        return new CommandLineRunnerWithSetterInjection();
    }
    
    @Bean
    public CommandLineRunnerWithFieldInjection getCommandLineRunnerWithFieldInjection(){
        return new CommandLineRunnerWithFieldInjection();
    }
    
    @Bean
    public CommandLineRunnerWithConstructorInjection getCommandLineRunnerWithConstructorInjection(DummyLogger dum){
        return new CommandLineRunnerWithConstructorInjection(dum);
    }
}

/* ************************************************************************** */
/* ************************* EXO2CONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
