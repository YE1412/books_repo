/* ************************************************************************** */
/* ************************************************************************** */
/* **************** CommandLineRunnerWithFieldInjection.java **************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : CommandLineRunnerWithFieldInjection.java                       */
/* ************************************************************************** */
/*  Creation Date : Jan 26, 2024, 3:37:28 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 26, 2024, 3:37:28 PM                                  */
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerWithFieldInjection implements CommandLineRunner {
    
    @Autowired
    private DummyLogger dummyLogger;
    
    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        dummyLogger.sayHello();
    }
}

/* ************************************************************************** */
/* **************** COMMANDLINERUNNERWITHFIELDINJECTION.JAVA **************** */
/* ************************************************************************** */
