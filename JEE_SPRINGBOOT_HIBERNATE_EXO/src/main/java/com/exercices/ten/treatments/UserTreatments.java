/* ************************************************************************** */
/* ************************************************************************** */
/* *************************** UserTreatments.java *************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : UserTreatments.java                                             */
/* ************************************************************************** */
/*  Creation Date : Mar 24, 2024, 6:28:50 PM                                  */
/* ************************************************************************** */
/*  Last modified : Mar 24, 2024, 6:28:50 PM                                  */
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

package com.exercices.ten.treatments;

import com.exercices.ten.JwtTokenUtil;
import com.exercices.ten.entity.RoleUser;
import com.exercices.ten.entity.UserBook;
import com.exercices.ten.otherclass.LoginDTO;
import com.exercices.ten.otherclass.SignUpDTO;
import com.exercices.ten.otherclass.UserFormRequest;
import com.exercices.ten.otherclass.UserFormResponse;
import com.exercices.ten.service.RoleUserService;
import com.exercices.ten.service.UserBookService;
import com.exercices.ten.service.UserRoleDetails;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserTreatments implements Treatment {
    private static final String BOOK_API_BASE_PATH = "/api/";
    private final UserBookService ubs;
    private final UserRoleDetails uds;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager am;
    private final PasswordEncoder passwordEncoder;
    private final RoleUserService rus;
    
    @Override
    public Object loginTreatment(LoginDTO login) {
        //throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        UserFormResponse userResponse = new UserFormResponse();
        ResponseEntity ret;
        try{
            Authentication authentication = am.authenticate(new UsernamePasswordAuthenticationToken(login.getUsernameOrEmail(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) uds.loadUserByUsername(login.getUsernameOrEmail());
            UserBook ub = ubs.login(login.getUsernameOrEmail(), login.getUsernameOrEmail(), login.getPassword());
            String tok = jwtTokenUtil.generateToken(user);
            userResponse.setUser(ub);
            userResponse.setMessage("Login success !");
            userResponse.setCode(0);
            userResponse.setToken(tok);
            HttpHeaders heads = new HttpHeaders();
            heads.add("Authorization", tok);
            ret = ResponseEntity.created(new URI(BOOK_API_BASE_PATH))
            .headers(heads)
            .body(userResponse);
        }
        catch(BadCredentialsException ex){
            userResponse.setUser(null);
            userResponse.setMessage("Error while Login - Bad credentials !");
            userResponse.setCode(1);
            userResponse.setToken(null);
            ret = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userResponse);
        } catch (URISyntaxException ex) {
            userResponse.setUser(null);
            userResponse.setMessage("Error while Login - Malformed URI in response entity !");
            userResponse.setCode(1);
            userResponse.setToken(null);
            ret = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userResponse);
            //Logger.getLogger(UserTreatments.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ret;
    }

    @Override
    public Object signUpTtreatment(SignUpDTO signUp) {
        //throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        UserFormResponse ret = new UserFormResponse();
        if (!ubs.exists(signUp.getUsername(), signUp.getEmail())){
                // Creating UserBook Object
                UserBook b = new UserBook();
                b.setName(signUp.getName());
                b.setUsername(signUp.getUsername());
                b.setEmail(signUp.getEmail());
                b.setPassword(passwordEncoder.encode(signUp.getPassword()));
                Set<RoleUser> roles = formatRoles(signUp.getRoles());
                b.setRoles(roles);
                ret.setUser(ubs.newUserBook(b));
                ret.setMessage("User added successfully !");
                ret.setCode(0);
        } else {
            ret.setMessage("Error while adding new user email/username already exists !");
            ret.setCode(1);
        }
        return ret;
    }

    @Override
    public Object updateUserTreatment(Long id, UserFormRequest userForm) {
        //throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        UserFormResponse ret = new UserFormResponse();
        if (ubs.findUser(id) != null){
            UserBook user = ubs.getByUsernameOrEmail(userForm.getUsername(), userForm.getEmail());
//            System.out.println("Users");
//            System.out.println(users);
            if (user == null || user.getId().equals(id)){
                UserBook usr = new UserBook(); 
                usr.setId(userForm.getId());
                usr.setEmail(userForm.getEmail());
                usr.setName(userForm.getName());
                usr.setPassword(passwordEncoder.encode(userForm.getPassword()));
                usr.setUsername(userForm.getUsername());
                usr.setRoles(formatRoles(userForm.getRoles()));
                ubs.updateUser(id, usr);
                ret.setCode(0);
                ret.setMessage("User profile successfully updated !");
                ret.setUser(usr);
            } else {
                ret.setMessage("Error while updating user, username/email already exists !");
                ret.setCode(1);
            }
        } else {
            ret.setMessage("Error while updating user, user doesn't exist !");
            ret.setCode(1);
        }
        return ret;
   }

    @Override
    public Object updateUserRolesTreatment(Long id, Set roles) {
        //throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        UserFormResponse ret = new UserFormResponse();
        UserBook u = ubs.findUser(id);
        if (u != null){
            u.setRoles(formatRoles(roles));
            ubs.updateUser(id, u);
            ret.setCode(0);
            ret.setMessage("User successfully updated !");
            ret.setUser(u);
        } else {
            ret.setMessage("Error while updating user, user doesn't exist !");
            ret.setCode(1);
        }
        return ret;
    }
    
    private Set<RoleUser> formatRoles(Set<String> roles){
        Set<RoleUser> ret = new HashSet<>();
        for(String role:roles){
            RoleUser r = rus.getRole(Long.valueOf(role));
            ret.add(r);
        }
        return ret;
    }

}

/* ************************************************************************** */
/* *************************** USERTREAMENTS.JAVA *************************** */
/* ************************************************************************** */
