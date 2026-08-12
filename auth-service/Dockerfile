FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -g 1001 authgroup && \
    useradd -u 1001 -g authgroup -m -s /bin/false authuser

COPY --chown=authuser:authgroup build/libs/*.jar app.jar

USER authuser

ENTRYPOINT ["java", "-jar", "app.jar"]