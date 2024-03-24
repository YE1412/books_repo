/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** Exo10Controller.java ************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo10Controller.java                                           */
/* ************************************************************************** */
/*  Creation Date : Jan 30, 2024, 9:39:51 AM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 30, 2024, 9:39:51 AM                                  */
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

import com.exercices.ten.entity.Book;
import com.exercices.ten.entity.UserBook;
import com.exercices.ten.otherclass.LoginDTO;
import com.exercices.ten.otherclass.SignUpDTO;
import com.exercices.ten.otherclass.UserFormRequest;
import com.exercices.ten.otherclass.UserFormResponse;
import com.exercices.ten.service.BookService;
import com.exercices.ten.service.UserBookService;
import com.exercices.ten.treatments.UserTreatments;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class Exo10Controller {
    private static final String BOOK_API_BASE_PATH = "/api/";
    private final UserTreatments usrTreat;
    //private final AuthenticationManager am;
    private final BookService bs;
    private final UserBookService ubs;
    //private final PasswordEncoder passwordEncoder;
    //private final JwtTokenUtil jwtTokenUtil;
    //private final UserRoleDetails uds;
    //private final RoleUserService rus;
    
    @GetMapping(value="/")
    public String welcome(){
        return "Hello this page is OK !";
    }
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PostMapping(value=BOOK_API_BASE_PATH + "user/login")
    public ResponseEntity<UserFormResponse> getUser(@RequestBody final LoginDTO login){
        return (ResponseEntity<UserFormResponse>) usrTreat.loginTreatment(login);
    }

    @PostMapping(value=BOOK_API_BASE_PATH + "user/signup")
    public UserFormResponse newUser(@RequestBody final SignUpDTO signUp){
        return (UserFormResponse) usrTreat.signUpTtreatment(signUp);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value=BOOK_API_BASE_PATH + "user/all")
    public List<UserBook> getAllUsers(){
        return ubs.findAllUsers();
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_USER')")
    @GetMapping(value=BOOK_API_BASE_PATH + "user/{id}")
    public UserBook getUser(@PathVariable Long id){
        return ubs.findUser(id);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_USER')")
    @PutMapping(value=BOOK_API_BASE_PATH + "user/{id}")
    public UserFormResponse updateUser(@PathVariable Long id, @RequestBody final UserFormRequest u){
        return (UserFormResponse) usrTreat.updateUserTreatment(id, u);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping(value=BOOK_API_BASE_PATH + "user/roles/{id}")
    public UserFormResponse updateUserRoles(@PathVariable Long id, @RequestBody final Set<String> roles){
        return (UserFormResponse) usrTreat.updateUserRolesTreatment(id, roles);
    }
    
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_USER')")
    @DeleteMapping(value=BOOK_API_BASE_PATH + "user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id){
        //return ubs.findUser(id);
        ubs.deleteUser(id);
    }
    /** 
     * Cross Origin Requests For "http://localhost:4200" --> Angular App
     * Cross Origin Requests For "http://localhost:5173" --> Vue App
     * Cross Origin Requests For "http://localhost:3000" --> React NextJS App
     * @return List
     **/ 
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_USER')")
    @GetMapping(value=BOOK_API_BASE_PATH + "books/all")
    public List<Book> getAllBooks(){
        return bs.findAllBooks();
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value=BOOK_API_BASE_PATH + "books/{id}")
    public Book getBook(@PathVariable Long id){
        return bs.findById(id);
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH + "books/startingBy")
    public List<Book> getBooksStartingByTitle(){
        return bs.findByStartingName("ALittleTitle");
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH + "books/title")
    public List<Book> getBooksByTitle(){
        return bs.findByTitle("ALittleTitleForSpringBoot Book");
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value= BOOK_API_BASE_PATH + "books/isbn")
    public Book getBookByISBN(){
        return bs.findByISBN("7123095341987");
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH+"books/authorByISBN")
    public String getAuthorStringByISBN(){
        return bs.findAuthorStringByISBN("7123095341987");
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH+"books/thickest")
    public List<Book> getThickestBooksByAuthor(){
        return bs.findThickestBooksByAuthor("M. Chords");
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH+"books/pagesNum")
    public List<Book> getBookByPagesNum(){
        return bs.findByPagesNum(100, 300);
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @GetMapping(value=BOOK_API_BASE_PATH+"books/pagesNumGreather")
    public List<Book> getBookWherePagesNumGreatherThanX(){
        return bs.findWherePagesNumIsGreaterThanX(250);
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value=BOOK_API_BASE_PATH+"books")
    public Book createNewBook(@RequestBody final Book b){
        return bs.createBook(b);
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping(value=BOOK_API_BASE_PATH + "books/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateExistingBook(@PathVariable Long id, @RequestBody final Book b){
        bs.updateBook(id, b);
    }
    
//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173", "http://localhost:3000"})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping(value=BOOK_API_BASE_PATH + "books/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExistingBook(@PathVariable Long id){
        bs.deleteBook(id);
    }
}

/* ************************************************************************** */
/* ************************** EXO10CONTROLLER.JAVA ************************** */
/* ************************************************************************** */
