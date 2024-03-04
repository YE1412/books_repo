/* ************************************************************************** */
/* ************************************************************************** */
/* **************************** BookService.java **************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : BookService.java                                               */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 10:03:53 PM                                 */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 10:03:53 PM                                 */
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

import com.exercices.ten.entity.Book;
import com.exercices.ten.repository.BookRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository br;
    
    public List<Book> findAllBooks(){
        List<Book> ret = br.findAll();
        return ret;
    }
    
    public List<Book> findByTitle(String title){
        List<Book> ret = br.findByTitleIs(title);
        return ret;
    }
    
    public Book findByISBN(String ISBN){
        Book ret = br.findByIsbnIs(ISBN);
        return ret;
    }
    
    public String findAuthorStringByISBN(String ISBN){
        Book ret = br.findAuthorByIsbn(ISBN);
        return ret.getAuthor();
    }
    
    public List<Book> findThickestBooksByAuthor(String author){
        List<Book> ret = br.findByAuthorOrderByPagesNumDesc(author, Limit.of(3));
        return ret;
    }
    
    public List<Book> findByStartingName(String start){
        List<Book> ret = br.findByTitleStartsWith(start);
        return ret;
    }
    
    public List<Book> findByPagesNum(int min, int max){
        List<Book> ret = br.findByPagesNumBetween(min, max);
        return ret;
    }
    
    public List<Book> findWherePagesNumIsGreaterThanX(Integer x){
        List<Book> ret = br.findWherePagesNumIsGreaterThanX(x);
        return ret;
    }
    
    public Book findById(Long id){
        Book ret = br.findByIdIs(id);
        return ret;
    }
    
    public Book createBook(Book b){
        return br.save(b);
    }
    
    public void updateBook(Long id, Book b){
        Book ret = br.getReferenceById(id);
        Book newB = ret;
        newB.setTitle(b.getTitle());
        newB.setAuthor(b.getAuthor());
        newB.setIsbn(b.getIsbn());
        newB.setPagesNum(b.getPagesNum());
        br.save(newB);
    }
    
    public void deleteBook(Long id){
        Book toDelBook = br.getReferenceById(id);
        br.delete(toDelBook);
    }
}

/* ************************************************************************** */
/* **************************** BOOKSERVICE.JAVA **************************** */
/* ************************************************************************** */
