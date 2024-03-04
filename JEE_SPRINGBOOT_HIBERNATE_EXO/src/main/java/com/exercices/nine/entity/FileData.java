/* ************************************************************************** */
/* ************************************************************************** */
/* ***************************** FileData.java ****************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : FileData.java                                                  */
/* ************************************************************************** */
/*  Creation Date : Jan 29, 2024, 8:12:46 AM                                  */
/* ************************************************************************** */
/*  Last modified : Jan 29, 2024, 8:12:46 AM                                  */
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

package com.exercices.nine.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="files_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileData implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="file_name")
    private String fileName;
    @Column(name="extension")
    private String extension;
    @Column(name="size_in_kb")
    private double sizeInKb;
    @Column(name="content")
    private String content;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public double getSizeInKb() {
        return sizeInKb;
    }

    public void setSizeInKb(double sizeInKb) {
        this.sizeInKb = sizeInKb;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof FileData)) {
            return false;
        }
        FileData other = (FileData) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exercices.nine.FileData[ id=" + id + ", "
            + "fileName=" + fileName + ", "
            + "extension=" + extension + ", "
            + "sizeInKb" + String.valueOf(sizeInKb) +", "
            + "content" + content + "]";
    }

}

/* ************************************************************************** */
/* ***************************** FILEDATA.JAVA ****************************** */
/* ************************************************************************** */
