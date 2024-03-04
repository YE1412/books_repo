# books_repo
front_port: 3000
back_port: 8080

######URL_TEST##################
front_url: http://localhost:3000
back_url: http://localhost:8080/JEE_SPRINGBOOT_HIBERNATE_EXO/

#########BDD####################
bdd:mysql
spring.datasource.url=jdbc:mysql://localhost:3306/jee_springboot_hibernate_exo?zeroDateTimeBehavior=CONVERT_TO_NULL
spring.datasource.username=kali
spring.datasource.password=kali

########TEST_FRONT:####################
Simple user - username: user / password: user
Admin user - username: admin / password: admin

#########CONFIG_SERVER###################
*Back Office - Serveur Apache Tomcat
Intall JDKv20
Install maven
Build Back Office: mvn

*Front Office - Serveur NodeJs (effectuer un npm i à la racine du projet)
Lancer le Front office -'npm run dev'

