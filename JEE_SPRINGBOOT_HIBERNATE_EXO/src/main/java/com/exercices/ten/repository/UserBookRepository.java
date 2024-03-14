/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ UserBookRepository.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UserBookRepository.java                                        */
/* ************************************************************************** */
/*  Creation Date : Feb 26, 2024, 4:45:17 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 26, 2024, 4:45:17 PM                                  */
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

package com.exercices.ten.repository;

import com.exercices.ten.entity.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    public UserBook findByEmailAndPassword(String email, String pass);
    public UserBook findByUsernameAndPassword(String username, String pass);
    public UserBook findByUsernameOrEmailAndPassword(String username, String email, String pass);    
    public boolean existsByUsernameOrEmail(String username, String email);
    public UserBook findByUsernameOrEmail(String username, String email);
    //public List<UserBook> findByRoles()
}

/* ************************************************************************** */
/* ************************ USERBOOKREPOSITORY.JAVA ************************* */
/* ************************************************************************** */
