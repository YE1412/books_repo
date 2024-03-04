/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ Exo10RepositoryTest.java ************************ */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10RepositoryTest.java                                       */
/* ************************************************************************** */
/*  Creation Date : Feb 10, 2024, 11:32:29 PM                                 */
/* ************************************************************************** */
/*  Last modified : Feb 10, 2024, 11:32:29 PM                                 */
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
import com.main.tests.JeeSpringbootExo10Test;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assume.assumeTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@ContextConfiguration(classes = JeeSpringbootExo10Test.class)
//@SpringBootTest(classes = JeeSpringbootTest.class)
@RunWith(SpringRunner.class)
//@Import(Exo10RepositoryIntegrationTestConfig.class)
@DataJpaTest
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class Exo10RepositoryTest {
    @Autowired
    private TestEntityManager testEM;
    
    @Autowired
    private BookRepository br;
    
    @Value("${test.integration.exo10.enabled:false}")
    private Boolean testEnabled;
    
    @Test
    public void whenFindByTitle_thenReturnBook(){
        System.out.println("testEnabled Repository : "+testEnabled);
        assumeTrue(testEnabled);
        // given
        Book book = new Book();
        book.setAuthor("AuthorTest");
        book.setIsbn("IsbnTest");
        book.setPagesNum(5);
        book.setTitle("TitleTest");
        
        testEM.persist(book);
        
        // when
        List<Book> found = br.findByTitleIs(book.getTitle());
        
        // then
        assertThat(found.get(0).getTitle())
            .isEqualTo(book.getTitle());
    }
}

/* ************************************************************************** */
/* ************************ EXO10REPOSITORYTEST.JAVA ************************ */
/* ************************************************************************** */
