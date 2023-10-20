FROM maven:3.8.6-eclipse-temurin-11 as builder
WORKDIR /selenium
COPY pom.xml ./
COPY ./src ./src
RUN mvn clean install
EXPOSE 8083
ENTRYPOINT ["mvn", "exec:java", "-Dexec.mainClass='ca.etsmtl.Main'" ]