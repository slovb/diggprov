# assumption: the packaged frontend has been built and copied over to the backend
#  as building it via docker seemed slow and a little tedious to configure

# build the app
FROM maven:3.9.9-eclipse-temurin-17 AS maven
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package


# build the image
FROM registry.access.redhat.com/ubi8/openjdk-17:1.20 AS image
WORKDIR /app
ENV LANGUAGE='en_US:en'

COPY --from=maven --chown=185 /app/target/quarkus-app/lib/ /deployments/lib/
COPY --from=maven --chown=185 /app/target/quarkus-app/*.jar /deployments/
COPY --from=maven --chown=185 /app/target/quarkus-app/app/ /deployments/app/
COPY --from=maven --chown=185 /app/target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]
