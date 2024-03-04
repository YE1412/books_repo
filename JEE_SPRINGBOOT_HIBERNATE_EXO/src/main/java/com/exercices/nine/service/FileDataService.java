/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ FileDataRepositoryImpl.java ************************ */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : FileDataRepositoryImpl.java                                       */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 9:37:02 AM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 9:37:02 AM                                  */
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

package com.exercices.nine.service;

import com.exercices.nine.entity.FileData;

import com.exercices.nine.exception.SdaException;
import com.exercices.nine.repository.FileDataRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
public class FileDataService{
    
    private static final Logger logger = LoggerFactory.getLogger(FileDataService.class);
    
    private final FileDataRepository fdr;
//    
    public List<FileData> findAllBy() {
        List<FileData> l = (List<FileData>)fdr.findAll();
        return l;
    }
//
    public FileData findId(Long id) throws SdaException {
        FileData ret = fdr.findById(id).orElseThrow(() -> new SdaException("Unable to fetch FileData with id::"+id));
        return ret;
    }

    public FileData addFileData(FileData f) {
        fdr.save(f);
        return f;
    }

    public void updateFileData(FileData f) throws SdaException{
        FileData ret = fdr.findById(f.getId()).orElseThrow(() -> new SdaException("Unable to fetch FileData with id::"+f.getId()));
        FileData newFd = ret;
        newFd.setFileName(f.getFileName());
        newFd.setExtension(f.getExtension());
        newFd.setSizeInKb(f.getSizeInKb());
        newFd.setContent(f.getContent());
        fdr.save(newFd);
    }

    public void deleteFileData(Long id) {
        fdr.findById(id).orElseThrow(() -> new SdaException("Unable to fetch FileData with id::"+id));
        fdr.deleteById(id);
    }
}

/* ************************************************************************** */
/* ************************ FILEDATASERVICEIMPL.JAVA ************************ */
/* ************************************************************************** */
