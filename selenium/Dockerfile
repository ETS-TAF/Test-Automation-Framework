FROM maven:3.8.6-eclipse-temurin-11 as builder

RUN apt-get update
# RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_114.0.5735.198-1_amd64.deb
RUN apt-get install -y ./google-chrome-stable_114.0.5735.198-1_amd64.deb

WORKDIR /
COPY pom.xml .
COPY selenium ./selenium
WORKDIR /selenium
RUN mvn clean install
EXPOSE 8090
ENTRYPOINT ["mvn", "spring-boot:run" ]
