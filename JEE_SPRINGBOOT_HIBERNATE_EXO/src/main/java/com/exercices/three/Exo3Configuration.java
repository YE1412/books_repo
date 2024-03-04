/* ************************************************************************** */
/* ************************************************************************** */
/* ************************* Exo3Configuration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo3Configuration.java                                         */
/* ************************************************************************** */
/*  Creation Date : Jan 28, 2024, 12:31:33 PM                                 */
/* ************************************************************************** */
/*  Last modified : Jan 28, 2024, 12:31:33 PM                                 */
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

package com.exercices.three;

import java.util.List;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class Exo3Configuration {
    @Bean(name="dummyFirstImpl")
    @Primary
    public static FirstImplementationOfDummyLogger firstImplOfDummyLogger(){
        return new FirstImplementationOfDummyLogger();
    }
    
    @Bean(name="dummySecondImpl")
    @Qualifier("secondImplementationOfDummyLogger")
    public static SecondImplementationOfDummyLogger secondImplOfDummyLogger(){
        return new SecondImplementationOfDummyLogger();
    }
    
    @Bean
    public MainImpl getMainImpl(DummyLogger dum){
        return new MainImpl(dum);
    }
    
    @Bean
    public SecondImpl getSecondImpl(@Qualifier("secondImplementationOfDummyLogger") DummyLogger dum){
        return new SecondImpl(dum);
    }
    
    @Bean
    public BothImpl getBothImpl(List<DummyLogger> dums){
        return new BothImpl(dums);
    }
}

/* ************************************************************************** */
/* ************************* EXO3CONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
