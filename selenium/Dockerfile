FROM maven:3.8.6-eclipse-temurin-11 as builder
WORKDIR /
COPY pom.xml .
COPY selenium ./selenium
WORKDIR /selenium
RUN mvn clean install
EXPOSE 8090
ENTRYPOINT ["mvn", "spring-boot:run" ]
