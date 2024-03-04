/* ************************************************************************** */
/* ************************************************************************** */
/* ********************** BatchExo1Configuration.java *********************** */
/* ************************************************************************** */
/* ************************************************************************** */
/*  Filename : BatchExo1Configuration.java                                    */
/* ************************************************************************** */
/*  Creation Date : Feb 2, 2024, 10:55:23 AM                                  */
/* ************************************************************************** */
/*  Last modified : Feb 2, 2024, 10:55:23 AM                                  */
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

import com.batch.exercices.one.entity.Person;
import com.batch.exercices.one.listener.PersonListener;
import com.batch.exercices.one.service.PersonDAOService;
import java.util.List;
import java.util.stream.Collectors;
import javax.sql.DataSource;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.launch.support.TaskExecutorJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.support.transaction.ResourcelessTransactionManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories("com.batch.exercices.one.repository")
@EntityScan("com.batch.exercices.one.entity")
@EnableBatchProcessing
public class BatchExo1Configuration {
    @Value("${spring.datasource.driver-class-name}")
    private String databaseDriver;
    @Value("${spring.datasource.url}")
    private String databaseUrl;
    @Value("${spring.datasource.username}")
    private String databaseUsername;
    @Value("${spring.datasource.password}")
    private String databasePassword;
    
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
            .requestMatchers("/**");
    }
    
    /** 
     * We define a bean that read each line of the input file. 
     * @return 
     */ 
    @Bean
    public ItemReader<Person> itemReader(){
        FlatFileItemReader reader = new FlatFileItemReader();
        DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
        String[] tokens = {"firstname", "lastname"};
        tokenizer.setNames(tokens);
        tokenizer.setDelimiter("|");
        reader.setResource(new ClassPathResource("batch/exo1/personData.txt"));
//        reader.setLineMapper(new CustomLineMapper<Person>());
        DefaultLineMapper<Person> lineMapper = new DefaultLineMapper<>();
        lineMapper.setLineTokenizer(tokenizer);
        BeanWrapperFieldSetMapper bwfsm = new BeanWrapperFieldSetMapper();
        bwfsm.setTargetType(Person.class);
        lineMapper.setFieldSetMapper(bwfsm);
//        lineMapper.setFieldSetMapper(new RecordFieldSetMapper());
        reader.setLineMapper(lineMapper);
        reader.setRecordSeparatorPolicy(new BlankLineRecordSeparatorPolicy());
        return reader;
    }
    
    /** 
     * The ItemProcessor is called after a new line is read and it allows the developer 
     * to transform the data read 
     * In our example it simply return the original object 
     * @return 
     */ 
    @Bean
    public ItemProcessor<Person, Person> itemProcessor(){
        return new CustomProcessor();
    }
    
    @Bean
    public PersonDAOService serv() {
        return new PersonDAOService();
    }
    
    /** 
     * Nothing special here a simple JpaItemWriter 
     * @return 
     */
    @Bean
    public ItemWriter<Person> itemWriter(){                     
        return persons -> {
            System.out.println("Saving Person Record: "+persons);
            List<Person> personList = persons.getItems().stream()
                .filter(person -> person.getId() == null)
                .collect(Collectors.toList());
            serv().saveAllPersons(personList);
        };
    }
    
//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(){
//        LocalContainerEntityManagerFactoryBean lef = new LocalContainerEntityManagerFactoryBean();
//        Properties jpaProperties = new Properties();
//        jpaProperties.put("hibernate.jdbc.batch_size", 5);
//        jpaProperties.put("hibernate.generate_statistics", false);
//        jpaProperties.put("hibernate.order_inserts", true);
//        jpaProperties.put("hibernate.order_updates", true);
////        jpaProperties.put("hibernate.hbm2ddl.import_files", "classpath:batch/exo1/import.sql");
//        jpaProperties.put("hibernate.hbm2ddl.auto", "create-drop");
//        
//        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
//        
//        lef.setDataSource(dataSource());
//        lef.setPackagesToScan("com.batch.exercices.one.entity");
//        lef.setJpaVendorAdapter(jpaVendorAdapter());
//        lef.setJpaProperties(jpaProperties);
//        lef.afterPropertiesSet();
//        return lef;
//    }
//    
//    @Bean 
//    public JpaVendorAdapter jpaVendorAdapter() { 
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setDatabase(Database.MYSQL);
//        
//        vendorAdapter.setGenerateDdl(true);
//        vendorAdapter.setShowSql(true);
//       return vendorAdapter; 
//    }
//    
//    /** 
//     * As data source we use an external database 
//     * 
//     * @return 
//     */ 
// 
    @Bean 
    public DataSource dataSource() { 
        DriverManagerDataSource dataSource = new DriverManagerDataSource(); 
        dataSource.setDriverClassName(databaseDriver); 
        dataSource.setUrl(databaseUrl); 
        dataSource.setUsername(databaseUsername); 
        dataSource.setPassword(databasePassword); 
        return dataSource; 
    }
    
    //Listener class Object
    @Bean
    public JobExecutionListener listener() {
       return new PersonListener();
    }
    
    /** 
     * This method declare the steps that the batch has to follow 
     * @param jobRepository
     * @param step1
     * @return 
     */ 
    @Bean(name = "firstBatchJob")
    public Job job(JobRepository jobRepository,
        @Qualifier("step1") Step step1) { 
        return new JobBuilder("firstBatchJob", jobRepository)
//            .preventRestart()
            .incrementer(new RunIdIncrementer())
            .listener(listener())
            .start(step1)
            .build(); 
    } 
 
    /** 
     * Step 
     * We declare that every 1000 lines processed the data has to be committed 
     * @param jobRepository
     * @param transactionManager
     * @param itemReader
     * @param itemProcessor
     * @param itemWriter
     * @return 
     */
 
    @Bean 
    protected Step step1(JobRepository jobRepository,
        PlatformTransactionManager transactionManager, ItemReader<Person> itemReader,
        ItemProcessor<Person, Person> itemProcessor, ItemWriter<Person> itemWriter) { 
        return new StepBuilder("step1", jobRepository)
//            .startLimit(5)
            .<Person, Person>chunk(10, transactionManager) 
            .reader(itemReader) 
            .processor(itemProcessor) 
            .writer(itemWriter) 
            .build(); 
    }
    
    @Bean(name="transactionManager")
    public PlatformTransactionManager getTransactionManager(){
        return new ResourcelessTransactionManager();
    }
    
    @Bean(name = "jobRepository")
    public JobRepository getJobRepository() throws Exception {
        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
        factory.setDataSource(dataSource());
        factory.setTransactionManager(getTransactionManager());
        factory.afterPropertiesSet();
        return factory.getObject();
    }
    
    @Bean(name = "jobLauncher")
    public JobLauncher getJobLauncher() throws Exception {
       TaskExecutorJobLauncher jobLauncher = new TaskExecutorJobLauncher();
       jobLauncher.setJobRepository(getJobRepository());
       jobLauncher.afterPropertiesSet();
       return jobLauncher;
    }
}

/* ************************************************************************** */
/* ********************** BATCHEXO1CONFIGURATION.JAVA *********************** */
/* ************************************************************************** */
