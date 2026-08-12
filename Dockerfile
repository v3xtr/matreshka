FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -g 1002 mediagroup && \
    useradd -u 1002 -g mediagroup -m -s /bin/false mediauser

COPY --chown=mediauser:mediagroup build/libs/*.jar app.jar

USER mediauser

ENTRYPOINT ["java", "-jar", "app.jar"]