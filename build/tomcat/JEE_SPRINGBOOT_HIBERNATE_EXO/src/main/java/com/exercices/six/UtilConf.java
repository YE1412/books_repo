/* ************************************************************************** */
/* ************************************************************************** */
/* ***************************** UtilConf.java ****************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UtilConf.java                                                  */
/* ************************************************************************** */
/*  Creation Date : Jan 27, 2024, 4:14:08 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 27, 2024, 4:14:08 PM                                  */
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

package com.exercices.six;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

//@PropertySource("classpath:application.properties")
@ConfigurationProperties(prefix="pl.sdacademy.zad6")
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class UtilConf {
   @NotNull
   @Email
   private String email;
   private String firstName;
   @NotNull
   @Length(min=3, max=20)
   private String lastName;
   private String address;
   @NotNull
   @Min(value = 18)
   private Integer age;
   @NotEmpty
   private List<String> values;
   @NotEmpty
   private Map<String, String> customAttributes;  

   @AssertTrue
   public boolean isAdressValid(){
       return address != null && address.split(" ").length == 2;
   }
}

/* ************************************************************************** */
/* ***************************** UTILCONF.JAVA ****************************** */
/* ************************************************************************** */
