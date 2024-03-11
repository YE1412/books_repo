/* ************************************************************************** */
/* ************************************************************************** */
/* *********************** WelcomeMessageLogger.java ************************ */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : WelcomeMessageLogger.java                                      */
/* ************************************************************************** */
/*  Creation Date : Jan 27, 2024, 3:10:08 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 27, 2024, 3:10:08 PM                                  */
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

package com.exercices.five;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WelcomeMessageLogger implements CommandLineRunner {
    private String text;
    private boolean shouldLog;
    
    
    public WelcomeMessageLogger(@Value("${pl.sdacademy.welcome.text.value:none}") final String txt,
        @Value("${pl.sdacademy.welcome.text.enable}") final boolean should) {
        this.text = txt;
        this.shouldLog = should;
    }

    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        if (shouldLog){
            log.info(text);
        }
    } 
}

/* ************************************************************************** */
/* *********************** WELCOMEMESSAGELOGGER.JAVA ************************ */
/* ************************************************************************** */
