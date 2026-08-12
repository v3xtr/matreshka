package com.matreshka.products_service.delivery.http.dto;

import java.util.UUID;

public record WorkPeriodResponseDTO(
        UUID id,
        Integer fromDay,
        Integer toDay,
        String fromTime,
        String toTime,
        Boolean is24h
) {
}