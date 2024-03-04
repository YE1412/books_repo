/* ************************************************************************** */
/* ************************************************************************** */
/* ************************* Exo10ServiceTest.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10ServiceTest.java                                          */
/* ************************************************************************** */
/*  Creation Date : Feb 10, 2024, 8:58:16 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 10, 2024, 8:58:16 PM                                  */
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

import com.exercices.ten.entity.Book;
import com.exercices.ten.repository.BookRepository;
import com.exercices.ten.service.BookService;
import com.main.tests.JeeSpringbootExo10Test;
import com.tests.exo10.config.Exo10ServiceIntegrationTestConfig;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assume.assumeTrue;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = JeeSpringbootExo10Test.class)
@Import(Exo10ServiceIntegrationTestConfig.class)
@RunWith(SpringRunner.class)
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class Exo10ServiceTest {
    @Autowired
    private BookService bs;
    
    @MockBean
    private BookRepository br;
    
    @Value("${test.integration.exo10.enabled:false}")
    private Boolean testEnabled;
    
    @Before
    public void setUp(){
//        System.out.println("testEnabled Service : "+testEnabled);
        assumeTrue(testEnabled);
        Book book = new Book();
        book.setTitle("TestTitle");
        book.setAuthor("TestAuthor");
        book.setIsbn("TestISBN");
        book.setPagesNum(0);
        List<Book> l = new ArrayList<>();
        l.add(book);
        
        Mockito.when(br.findByTitleIs(book.getTitle()))
                .thenReturn(l);
    }
    
    @Test
    public void whenValidTitle_thenServiceShouldReturnFoundedBook(){
        String title = "TestTitle";
        List<Book> found = bs.findByTitle(title);
        
        assertThat(found.get(0).getTitle()).isEqualTo("TestTitle");
        assertThat(found.get(0).getPagesNum()).isEqualTo(0);
    }
}

/* ************************************************************************** */
/* ************************* EXO10SERVICETEST.JAVA ************************** */
/* ************************************************************************** */
