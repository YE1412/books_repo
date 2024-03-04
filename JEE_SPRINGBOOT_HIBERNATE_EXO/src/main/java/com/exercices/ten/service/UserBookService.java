/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** UserBookService.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UserBookService.java                                           */
/* ************************************************************************** */
/*  Creation Date : Feb 26, 2024, 5:02:14 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 26, 2024, 5:02:14 PM                                  */
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

package com.exercices.ten.service;

import com.exercices.ten.entity.UserBook;
import com.exercices.ten.repository.UserBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBookService {
    @Autowired
    private UserBookRepository br;
    
    public UserBook login(String username, String email, String password){
        UserBook ret = br.findByUsernameOrEmailAndPassword(username, email, password);
        return ret;
    }
    
    public boolean exists(String username, String mail){
        return br.existsByUsernameOrEmail(username, mail);
    }
    
    public UserBook newUserBook(UserBook u){  
        return br.save(u);
    }
}

/* ************************************************************************** */
/* ************************** USERBOOKSERVICE.JAVA ************************** */
/* ************************************************************************** */
