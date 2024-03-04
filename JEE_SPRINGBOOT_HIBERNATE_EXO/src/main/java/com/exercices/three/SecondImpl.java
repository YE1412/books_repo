/* ************************************************************************** */
/* ************************************************************************** */
/* **************************** SecondImpl.java ***************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : SecondImpl.java                                                */
/* ************************************************************************** */
/*  Creation Date : Jan 26, 2024, 4:29:25 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 26, 2024, 4:29:25 PM                                  */
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SecondImpl implements CommandLineRunner {
    
    private DummyLogger dummy;

    public SecondImpl(@Qualifier("secondImplementationOfDummyLogger") final DummyLogger dum) {
        this.dummy = dum;
    }
    
    @Override
    public void run(String... args) throws Exception {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        dummy.sayHello();
    }
}

/* ************************************************************************** */
/* **************************** SECONDIMPL.JAVA ***************************** */
/* ************************************************************************** */
