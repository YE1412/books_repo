# books_repo
front_port: 3000
back_port: 8080

######URL_TEST##################
front_url: http://<FRONT_ADDR>(132.18.0.2):(3000-4200-5173)
back_url: http://<BACK_HOST>(172.18.0.4):8081/JEE_SPRINGBOOT_HIBERNATE_EXO

#########BDD####################
bdd:mysql
spring.datasource.url=jdbc:mysql://<BDD_HOST>:3306/jee_springboot_hibernate_exo?zeroDateTimeBehavior=CONVERT_TO_NULL
spring.datasource.username=kali
spring.datasource.password=kali

########TEST_FRONT:####################
Simple user - username: user / password: user
Admin user - username: admin / password: admin

#########CONFIG_SERVER###################
*Back Office - Serveur Apache Tomcat
Intall JDKv21
Install maven
Build Back Office (Generate WAR file) : mvn package

*Front Office - Serveur NodeJs (effectuer un npm i à la racine du projet)
Lancer le Front office -'npm run dev'

