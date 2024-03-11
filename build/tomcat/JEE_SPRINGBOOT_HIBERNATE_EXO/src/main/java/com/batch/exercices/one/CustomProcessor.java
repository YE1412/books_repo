/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** CustomProcessor.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : CustomProcessor.java                                           */
/* ************************************************************************** */
/*  Creation Date : Feb 2, 2024, 10:59:13 AM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 2, 2024, 10:59:13 AM                                  */
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

package com.batch.exercices.one;

import com.batch.exercices.one.entity.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

public class CustomProcessor implements ItemProcessor<Person, Person> {
    private static final Logger logger = LoggerFactory.getLogger(CustomProcessor.class);

    @Override
    public Person process(Person item) throws Exception {
        final String firstName = item.getFirstName().toUpperCase();
        final String lastName = item.getLastName().toUpperCase();
        final Person transformedPerson = new Person(item.getId(), firstName, lastName);
        logger.info("Converting (" + item + ") into (" + transformedPerson + ")");
        return transformedPerson;
    }
    
}

/* ************************************************************************** */
/* ************************** CUSTOMPROCESSOR.JAVA ************************** */
/* ************************************************************************** */
