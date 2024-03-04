/* ************************************************************************** */
/* ************************************************************************** */
/* *************** CommandLineRunnerWithSetterInjection.java **************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : CommandLineRunnerWithSetterInjection.java                      */
/* ************************************************************************** */
/*  Creation Date : Jan 26, 2024, 3:38:13 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 26, 2024, 3:38:13 PM                                  */
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
public class CommandLineRunnerWithSetterInjection implements CommandLineRunner {

    private DummyLogger dummyLogger;
    
    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        dummyLogger.sayHello();
    }
    
    @Autowired
    public void setDummyLogger(final DummyLogger dummy){
        this.dummyLogger = dummy;
    }

}

/* ************************************************************************** */
/* *************** COMMANDLINERUNNERWITHSETTERINJECTION.JAVA **************** */
/* ************************************************************************** */
