FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM eclipse-temurin:21-jdk-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY --from=build /app/target/code-runner-1.0.0.jar app.jar
RUN mkdir -p /app/music /app/data
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
