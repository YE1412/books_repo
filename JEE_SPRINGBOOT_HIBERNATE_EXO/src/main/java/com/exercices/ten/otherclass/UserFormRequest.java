/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** UserFormRequest.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UserFormRequest.java                                           */
/* ************************************************************************** */
/*  Creation Date : Mar 13, 2024, 8:44:02 AM                                  */
/* ************************************************************************** */
/*  Last modified : Mar 13, 2024, 8:44:02 AM                                  */
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

package com.exercices.ten.otherclass;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFormRequest {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private Set<String> roles;
}

/* ************************************************************************** */
/* ************************** USERFORMREQUEST.JAVA ************************** */
/* ************************************************************************** */
