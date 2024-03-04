/* ************************************************************************** */
/* ************************************************************************** */
/* ************************** PersonListener.java *************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : PersonListener.java                                            */
/* ************************************************************************** */
/*  Creation Date : Feb 2, 2024, 11:07:46 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 2, 2024, 11:07:46 PM                                  */
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

package com.batch.exercices.one.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;


public class PersonListener implements JobExecutionListener {
    private static final Logger logger = LoggerFactory.getLogger(PersonListener.class);
    @Override
    public void afterJob(JobExecution jobExecution) {
//        JobExecutionListener.super.afterJob(jobExecution); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/OverriddenMethodBody
        logger.info("Job started at: "+jobExecution.getStartTime());
        logger.info("Status of the job: "+jobExecution.getStatus());
    }

    @Override
    public void beforeJob(JobExecution jobExecution) {
//        JobExecutionListener.super.beforeJob(jobExecution); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/OverriddenMethodBody
        logger.info("Job Ended at: "+jobExecution.getEndTime());
        logger.info("Status of the Job: "+jobExecution.getStatus());
    }
    
}

/* ************************************************************************** */
/* ************************** PERSONLISTENER.JAVA *************************** */
/* ************************************************************************** */
