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
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBookService {
    @Autowired
    private UserBookRepository br;
    
    @PersistenceContext
    private EntityManager em;
    
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
    
    public List<UserBook> findAllUsers(){
        return br.findAll();
    }
    
    public UserBook findUser(Long id){
        return br.getReferenceById(id);
    }
    
    public void updateUser(Long id, UserBook u){
        UserBook usr = br.getReferenceById(id);
        UserBook newUsr = usr;
        newUsr.setEmail(u.getEmail());
        newUsr.setName(u.getName());
        newUsr.setPassword(u.getPassword());
        newUsr.setUsername(u.getUsername());
        newUsr.setRoles(u.getRoles());
        br.save(newUsr);
    }
    
    public void deleteUser(Long id){
        UserBook toDelUsr = br.getReferenceById(id);
        br.delete(toDelUsr);
    }
    
    public UserBook getByUsernameOrEmail(String username, String email){
        return br.findByUsernameOrEmail(username, email);
    }
}

/* ************************************************************************** */
/* ************************** USERBOOKSERVICE.JAVA ************************** */
/* ************************************************************************** */
