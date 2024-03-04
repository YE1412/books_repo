/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** BookRepository.java *************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : BookRepository.java                                            */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 9:49:26 PM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 9:49:26 PM                                  */
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

import com.exercices.ten.entity.Book;
import java.util.List;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    public Book findByIdIs(Long id);
    public List<Book> findByTitleIs(String title);
    public Book findByIsbnIs(String ISBN);
    public Book findAuthorByIsbn(String ISBN);
    public List<Book> findByAuthorOrderByPagesNumDesc(String author, Limit limit);
    public List<Book> findByTitleStartsWith(String start);
    public List<Book> findByPagesNumBetween(Integer min, Integer max);
    @Query(value="SELECT b FROM Book b WHERE b.pagesNum > ?1")
    public List<Book> findWherePagesNumIsGreaterThanX(Integer x);
}

/* ************************************************************************** */
/* ************************** BOOKREPOSITORY.JAVA *************************** */
/* ************************************************************************** */
