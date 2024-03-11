/* ************************************************************************** */
/* ************************************************************************** */
/* ******************** Exo12ControllerSecurityTest.java ******************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo12ControllerSecurityTest.java                               */
/* ************************************************************************** */
/*  Creation Date : Feb 11, 2024, 12:02:59 AM                                 */
/* ************************************************************************** */
/*  Last modified : Feb 11, 2024, 12:02:59 AM                                 */
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

package com.tests.exo12;

import com.exercices.twelve.Exo12Configuration;
import com.exercices.twelve.Exo12Controller;
import com.main.tests.JeeSpringbootExo12Test;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assume.assumeThat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ContextConfiguration(classes = JeeSpringbootExo12Test.class)
@RunWith(SpringRunner.class)
@WebMvcTest(Exo12Controller.class)
@Import(Exo12Configuration.class)
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class Exo12ControllerSecurityTest {
    @Autowired
    private MockMvc mvc;
    
    @Value("${test.integration.exo12.enabled:true}")
    private Boolean testEnabled;
    
    @Test
    public void givenAuthGetRequestOnPrivateCarsPage_shouldSucceedWith401() throws Exception {
        System.out.println("testEnabled Security : "+testEnabled);
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.get("/api/cars").contentType(MediaType.TEXT_HTML))
          .andExpect(status().isUnauthorized());
    }
    
    @WithMockUser(username="admin",roles={"CARS","ADMIN"})
    @Test
    public void givenAuthGetRequestOnPrivateCarsPageFromAdmin_shouldSucceedWith200() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.get("/api/cars").contentType(MediaType.TEXT_HTML))
          .andExpect(status().isOk());
//        mvc.perform(logout());
    }
    
    @WithMockUser(username = "admin2", authorities = { "ROLE_USER_ADMIN" })
    @Test
    public void givenAuthGetRequestOnPrivateUsersPageFromAdmin2_shouldSucceedWith404() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.get("/api/users/").contentType(MediaType.TEXT_HTML))
          .andExpect(status().isNotFound());
//        mvc.perform(logout());
    }
    
    @WithMockUser(username = "admin2", authorities = { "ROLE_USER_ADMIN" })
    @Test
    public void givenAuthGetRequestOnPrivateCarsPageFromAdmin2_shouldSucceedWith403() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.get("/api/cars").contentType(MediaType.TEXT_HTML))
          .andExpect(status().isForbidden());
//        mvc.perform(logout());
    }
    
    @WithMockUser(username = "admin", roles={"CARS","ADMIN"})
    @Test
    public void givenAuthGetRequestOnPrivateUsersPageFromAdmin_shouldSucceedWith403() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.get("/api/users/").contentType(MediaType.TEXT_HTML))
          .andExpect(status().isForbidden());
//        mvc.perform(logout());
    }
    
    @Test
    public void givenAuthPostRequestOnPrivateCarsPage_shouldSucceedWith401() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.post("/api/cars").contentType(MediaType.APPLICATION_JSON))
          .andExpect(status().isUnauthorized());
//        mvc.perform(logout());
    }
    
    @WithMockUser(username = "admin3", roles={"CARS"})
    @Test
    public void givenAuthPostRequestOnPrivateCarsPageFromAdmin3_shouldSucceedWith405() throws Exception {
        assumeThat(testEnabled, is(true));
        mvc.perform(MockMvcRequestBuilders.post("/api/cars").contentType(MediaType.APPLICATION_JSON))
          .andExpect(status().isMethodNotAllowed());
//        mvc.perform(logout());
    }
}

/* ************************************************************************** */
/* ******************** EXO12CONTROLLERSECURITYTEST.JAVA ******************** */
/* ************************************************************************** */
