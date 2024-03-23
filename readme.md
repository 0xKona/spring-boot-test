
# Demo Task List App

A small task list app using a Vite + React TS frontend, Spring-Boot backend and a dockerised mysql database for the purposes of learning Spring-Boot and Java

## Requirements

    - NodeJS https://nodejs.org/en
    - Maven  https://maven.apache.org/
    - JDK 17 https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

## Installation

After cloning project make sure you have docker installed and run:

```
  docker compose up
```

Once the database is running start the spring-boot application by clicking the start button in some IDE's or by running:

```
  ./mvnw spring-boot:run
```

If all is well then it should start successfully and connect to the database, if you want to change the dockercompose ports/url etc. Make sure to update the application.properties located in:

```
  src/main/rescources
```

## Starting Up Frontend

Navigate to the frontend, install the dependecies and start the frontend app by running:

```
  cd frontend
  npm install
  npm run dev
```

    

    