/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** UserRoleDetails.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UserRoleDetails.java                                           */
/* ************************************************************************** */
/*  Creation Date : Feb 26, 2024, 8:37:11 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 26, 2024, 8:37:11 PM                                  */
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
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserRoleDetails implements UserDetailsService {
    
    @Autowired
    private UserBookRepository br;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBook ub = br.findByUsernameOrEmail(username, username);
        if (ub != null){
            Set<GrantedAuthority> authorities = ub.getRoles().stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
            return new User(username, ub.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException("User not exists by Username");
        }
    }

}

/* ************************************************************************** */
/* ************************** USERROLEDETAILS.JAVA ************************** */
/* ************************************************************************** */
