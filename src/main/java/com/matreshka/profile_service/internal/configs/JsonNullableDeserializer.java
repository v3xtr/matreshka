package com.matreshka.profile_service.internal.configs;

import tools.jackson.core.JsonParser;
import tools.jackson.databind.DeserializationContext;
import tools.jackson.databind.ValueDeserializer;

public class JsonNullableDeserializer extends ValueDeserializer<JsonNullable<?>> {

    @Override
    public JsonNullable<?> deserialize(JsonParser p, DeserializationContext ctx) {
        return JsonNullable.of(p.getValueAsString());
    }

    @Override
    public JsonNullable<?> getNullValue(DeserializationContext ctx) {
        return null;
    }
}