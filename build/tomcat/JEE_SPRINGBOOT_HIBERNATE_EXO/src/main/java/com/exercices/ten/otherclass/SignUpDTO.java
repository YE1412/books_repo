/* ************************************************************************** */
/* ************************************************************************** */
/* ***************************** SignUpDTO.java ***************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : SignUpDTO.java                                                 */
/* ************************************************************************** */
/*  Creation Date : Feb 26, 2024, 5:26:59 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 26, 2024, 5:26:59 PM                                  */
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

import com.exercices.ten.entity.RoleUser;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {
    private String name;
    private String username;
    private String email;
    private String password;
    private Set<String> roles;
}

/* ************************************************************************** */
/* ***************************** SIGNUPDTO.JAVA ***************************** */
/* ************************************************************************** */
