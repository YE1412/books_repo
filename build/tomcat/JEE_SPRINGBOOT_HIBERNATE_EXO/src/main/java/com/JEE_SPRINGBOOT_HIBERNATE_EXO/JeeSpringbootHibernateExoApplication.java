package com.JEE_SPRINGBOOT_HIBERNATE_EXO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

//@EnableAutoConfiguration
//@Configuration
//@ServletComponentScan
@SpringBootApplication
@ComponentScan(basePackages = "com.exercices.ten")
public class JeeSpringbootHibernateExoApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(JeeSpringbootHibernateExoApplication.class, args);
//        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(JeeSpringbootHibernateExoApplication.class);
    }
        
}
