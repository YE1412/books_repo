FROM jelastic/maven:3.9.5-openjdk-21 AS build
WORKDIR  /app/
COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/pom.xml ./
# RUN mvn -f ./pom.xml verify clean --fail-never

ARG BDD_PATH
ENV BDD_URL $BDD_PATH

COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/src/ ./src/
RUN mvn -f ./pom.xml package

FROM tomcat:latest
WORKDIR /web

COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/    /web/

RUN apt-get update && apt-get install -y openjdk-21-jdk maven
# COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war
# ARG BDD_PATH
ENV BDD_URL 'jdbc:mysql://mysql:3306/jee_springboot_hibernate_exo?zeroDateTimeBehavior=CONVERT_TO_NULL'
COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO.xml /usr/local/tomcat/conf/Catalina/localhost/
COPY --from=build /app/target/ ./target
COPY --from=build /app/target/JEE_SPRINGBOOT_HIBERNATE_EXO-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps

CMD ["catalina.sh", "run"]

EXPOSE 8080


