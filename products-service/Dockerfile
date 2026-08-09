FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

RUN groupadd -g 1001 productsgroup && \
    useradd -u 1001 -g productsgroup -m -s /bin/false productsuser

COPY --chown=productsuser:productsgroup build/libs/*.jar app.jar

USER productsuser

ENTRYPOINT ["java", "-jar", "app.jar"]