/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ FrontConfiguration.java ************************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : FrontConfiguration.java                                        */
/* ************************************************************************** */
/*  Creation Date : Mar 17, 2024, 3:55:35 PM                                  */
/* ************************************************************************** */
/*  Last modified : Mar 17, 2024, 3:55:35 PM                                  */
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

package com.exercices.ten;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix="com.exercices.ten")
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
@Primary
public class FrontConfiguration {
    @NotNull
    private String frontWebappHost;
    @NotNull
    private String frontWebappPort1;
    @NotNull
    private String frontWebappPort2;
    @NotNull
    private String frontWebappPort3;
}

/* ************************************************************************** */
/* ************************ FRONTCONFIGURATION.JAVA ************************* */
/* ************************************************************************** */
