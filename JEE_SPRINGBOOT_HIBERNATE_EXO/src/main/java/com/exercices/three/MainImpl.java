/* ************************************************************************** */
/* ************************************************************************** */
/* ***************************** MainImpl.java ****************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : MainImpl.java                                                  */
/* ************************************************************************** */
/*  Creation Date : Jan 26, 2024, 4:17:21 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 26, 2024, 4:17:21 PM                                  */
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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MainImpl implements CommandLineRunner {
    
    private final DummyLogger dummy;

    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
//        dummy.sayHello("A String");
        dummy.sayHello();
    }

}

/* ************************************************************************** */
/* ***************************** MAINIMPL.JAVA ****************************** */
/* ************************************************************************** */
