/* ************************************************************************** */
/* ************************************************************************** */
/* ****************** Exo10ControllerIntegrationTest.java ******************* */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10ControllerIntegrationTest.java                            */
/* ************************************************************************** */
/*  Creation Date : Feb 9, 2024, 5:29:24 PM                                   */
/* ************************************************************************** */
/*  Last modified : Feb 9, 2024, 5:29:24 PM                                   */
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

package com.tests.exo10;

import com.exercices.ten.service.BookService;
import com.main.tests.JeeSpringbootExo10Test;
import com.tests.exo10.config.Exo10ControllerIntegrationTestConfig;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assume.assumeTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = JeeSpringbootExo10Test.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Import(Exo10ControllerIntegrationTestConfig.class)
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class Exo10ControllerIntegrationTest {
    
    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private BookService bs;
    
    @Value("${test.integration.exo10.enabled:false}")
    private Boolean testEnabled;
    
    @Sql({"classpath:exo10/h2init.sql", "classpath:exo10/data.sql"})
    @Test
    public void givenBooks_whenGetBooksByTitle_thenStatus200() throws Exception{
        System.out.println("testEnabled Controller : "+testEnabled);
        assumeTrue(testEnabled);
        mvc.perform(MockMvcRequestBuilders.get("/api/books/title")
                .accept(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$[*].id").isNotEmpty())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNumber())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id", is(1)));
    }
}

/* ************************************************************************** */
/* ****************** EXO10CONTROLLERINTEGRATIONTEST.JAVA ******************* */
/* ************************************************************************** */
