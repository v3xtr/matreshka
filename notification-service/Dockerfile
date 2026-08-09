FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -g 1001 notificationsgroup && \
    useradd -u 1001 -g notificationsgroup -m -s /bin/false notificationsuser

COPY --chown=notificationsuser:notificationsgroup build/libs/*.jar app.jar

USER notificationsuser

ENTRYPOINT ["java", "-jar", "app.jar"]