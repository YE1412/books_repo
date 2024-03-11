/* ************************************************************************** */
/* ************************************************************************** */
/* ************************ BatchExo1Controller.java ************************ */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : BatchExo1Controller.java                                       */
/* ************************************************************************** */
/*  Creation Date : Feb 2, 2024, 10:13:51 PM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 2, 2024, 10:13:51 PM                                  */
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

package com.batch.exercices.one;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BatchExo1Controller {
    
    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job firstBatchJob;
    
    @GetMapping(value="/")
    public void batchProcessing(){
        System.out.println("Starting the batch job");
        try {
            JobParameters params = new JobParametersBuilder().addLong("time", System.currentTimeMillis())
                .toJobParameters();
            JobExecution execution = jobLauncher.run(firstBatchJob, params);
//            JobExecution execution = jobLauncher.run(firstBatchJob, new JobParameters());
            System.out.println("Job Status : " + execution.getStatus());
            System.out.println("Job completed");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Job failed");
        }
    }
}

/* ************************************************************************** */
/* ************************ BATCHEXO1CONTROLLER.JAVA ************************ */
/* ************************************************************************** */
