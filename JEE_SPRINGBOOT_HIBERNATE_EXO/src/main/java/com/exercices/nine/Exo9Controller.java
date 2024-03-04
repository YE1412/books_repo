/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** Exo9Controller.java *************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : Exo9Controller.java                                            */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 9:35:07 AM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 9:35:07 AM                                  */
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

package com.exercices.nine;

import com.exercices.nine.entity.FileDataCollection;
import com.exercices.nine.entity.FileData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import com.exercices.nine.service.FileDataService;
import java.net.URI;
import java.net.URISyntaxException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequiredArgsConstructor
public class Exo9Controller {
    
    static final String FILE_DATA_API_BASE_PATH = "/api/files-data";
    
    private final FileDataService fds;
    
    @GetMapping(value=FILE_DATA_API_BASE_PATH)
    public FileDataCollection getAllFileData(){
        FileDataCollection fdc = new FileDataCollection(fds.findAllBy());
        return fdc;
    }
    
    @GetMapping(value=FILE_DATA_API_BASE_PATH + "/{id}")
    public FileData getFileData(@PathVariable Long id){
        FileData f = fds.findId(id);
        return f;
    }
    
    @PostMapping(value=FILE_DATA_API_BASE_PATH)
    public ResponseEntity<String> addFileData(@RequestBody final FileData fd) throws URISyntaxException{
        fds.addFileData(fd);
        HttpHeaders heads = new HttpHeaders();
        heads.add("Location", FILE_DATA_API_BASE_PATH + "/" + fd.getId());
        return ResponseEntity.created(new URI(FILE_DATA_API_BASE_PATH))
                .headers(heads)
                .build();
    }
    
    @PutMapping(value=FILE_DATA_API_BASE_PATH + "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateFileData(@PathVariable Long id, @RequestBody final FileData fd){
        fds.updateFileData(fd);
    }
    
    @DeleteMapping(value=FILE_DATA_API_BASE_PATH + "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFileData(@PathVariable Long id){
        fds.deleteFileData(id);
    }
}

/* ************************************************************************** */
/* ************************** EXO9CONTROLLER.JAVA *************************** */
/* ************************************************************************** */
