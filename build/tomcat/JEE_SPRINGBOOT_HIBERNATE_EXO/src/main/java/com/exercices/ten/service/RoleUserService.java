/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** RoleUserService.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : RoleUserService.java                                           */
/* ************************************************************************** */
/*  Creation Date : Feb 26, 2024, 8:33:35 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 26, 2024, 8:33:35 PM                                  */
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

import com.exercices.ten.entity.RoleUser;
import com.exercices.ten.repository.RoleUserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleUserService {
    @Autowired
    private RoleUserRepository br;
    
    public List<RoleUser> getAllRoles(){
        return br.findAll();
    }
    
    public RoleUser getRole(Long id){
        return br.getReferenceById(id);
    }
}

/* ************************************************************************** */
/* ************************** ROLEUSERSERVICE.JAVA ************************** */
/* ************************************************************************** */