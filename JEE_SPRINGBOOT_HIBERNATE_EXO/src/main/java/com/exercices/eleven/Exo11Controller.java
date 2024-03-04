/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** Exo11Controller.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo11Controller.java                                           */
/* ************************************************************************** */
/*  Creation Date : Jan 30, 2024, 1:54:43 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 30, 2024, 1:54:43 PM                                  */
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

package com.exercices.eleven;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class Exo11Controller {
//    private PCGameForm pcgf;
    
    @GetMapping(value="/pc-games")
    public String showForm(Model m){
        PCGameForm pcgf = new PCGameForm();
        m.addAttribute("pcGameForm", pcgf);
        m.addAttribute("createMessage", "Create PC Game");
        return "pcgame";
    }
    
    @PostMapping(value="/pc-games")
    public String validForm(@ModelAttribute PCGameForm pcgame, Model m){
//        System.out.println("pcgame : "+pcgame);
        m.addAttribute("pcGame", pcgame);
        return "pcgame_info";
    }
}

/* ************************************************************************** */
/* ************************** EXO11CONTROLLER.JAVA ************************** */
/* ************************************************************************** */
