/* ************************************************************************** */
/* ************************************************************************** */
/* ************* CommandLineRunnerWithConstructorInjection.java ************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : CommandLineRunnerWithConstructorInjection.java                 */
/* ************************************************************************** */
/*  Creation Date : Jan 26, 2024, 3:36:41 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 26, 2024, 3:36:41 PM                                  */
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

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommandLineRunnerWithConstructorInjection implements CommandLineRunner {
    
    private final DummyLogger dummyLogger;
    
    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        dummyLogger.sayHello();
    }

}

/* ************************************************************************** */
/* ************* COMMANDLINERUNNERWITHCONSTRUCTORINJECTION.JAVA ************* */
/* ************************************************************************** */
