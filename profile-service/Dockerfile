FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -g 1002 profilegroup && \
    useradd -u 1002 -g profilegroup -m -s /bin/false profileuser

COPY --chown=profileuser:profilegroup build/libs/*.jar app.jar

USER profileuser

ENTRYPOINT ["java", "-jar", "app.jar"]