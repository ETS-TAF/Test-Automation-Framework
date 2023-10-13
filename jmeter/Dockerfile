FROM openjdk:17-jdk as builder

WORKDIR /code
COPY . .

RUN chmod 777 ./mvnw
RUN ./mvnw package -pl jmeter

FROM openjdk:17-jdk-alpine as runner

WORKDIR /code

ARG JAR_FILE=target/jmeter-1.0.0-SNAPSHOT.jar

COPY --from=builder /code/jmeter/${JAR_FILE} /code/app.jar

ENTRYPOINT ["java","-jar","/code/app.jar"]