FROM jelastic/maven:3.9.5-openjdk-21 AS build
WORKDIR  /app/
COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/pom.xml ./
# RUN mvn -f ./pom.xml verify clean --fail-never

ARG BDD_PATH
ARG FRONT_ADDR
ENV BDD_URL $BDD_PATH
ENV FRONT_HOST $FRONT_ADDR

COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/src/ ./src/
RUN mvn -f ./pom.xml package

FROM tomcat:latest
WORKDIR /web

COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO/    /web/

RUN apt-get update && apt-get install -y openjdk-21-jdk maven
# COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war
ARG BDD_PATH
ARG BACK_PORT
ARG FRONT_ADDR
ENV BDD_URL $BDD_PATH
ENV TOMCAT_PORT $BACK_PORT
ENV FRONT_HOST $FRONT_ADDR
# RUN echo $BDD_URL
RUN sed -i "s/port=\"8080\"/port=\"${TOMCAT_PORT}\"/g" ${CATALINA_HOME}/conf/server.xml
COPY ./JEE_SPRINGBOOT_HIBERNATE_EXO.xml /usr/local/tomcat/conf/Catalina/localhost/
COPY --from=build /app/target/ ./target
COPY --from=build /app/target/JEE_SPRINGBOOT_HIBERNATE_EXO-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps

CMD ["catalina.sh", "run"]

#EXPOSE 8081


