package com.matreshka.products_service.delivery.http.dto;

import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.util.List;

public record AdvertCreateRequestDTO(
        @NotBlank(message = "Категория обязательна")
        String category,

        @NotBlank(message = "Заголовок обязателен")
        @Size(min = 5, max = 200, message = "Заголовок 5-200 символов")
        String title,

        @NotBlank(message = "Укажите цену")
        @Pattern(regexp = "\\d+(\\.\\d{1,2})?", message = "Цена должна быть числом")
        String price,

        @NotBlank(message = "Описание обязательно")
        @Size(min = 10, max = 2000, message = "Описание 10-2000 символов")
        String description,

        @NotBlank(message = "Адрес обязателен")
        String address,

        @NotBlank(message = "Контакты обязательны")
        String contacts,

        @Valid
        @NotEmpty(message = "Нужно минимум 1 фото")
        @Size(max = 10, message = "Не более 10 фото")
        List<PictureDTO> pictures,

        @Valid
        List<ServiceDTO> services,

        @Valid
        List<WorkScheduleDTO> workSchedule,

        String videoId,

        String firstName,
        String lastName,
        String fathersName,
        String gender,
        String subCategory,
        String profession,
        String sphere,
        String brand,
        String model,
        Integer yearOfManufacture,
        String color,
        Boolean isOnTheGo,
        String vehicleBodyType,
        VehicleKpp vehicleKpp,
        Integer ownersPts,
        Long milage,
        Integer engineCapacity,
        Integer horsePower,
        Drive drive,
        SteeringWheel steeringWheel,
        PriceFor priceFor,
        VesselType vesselType,
        Integer vesselLength,
        Integer vesselWidth,
        Integer vesselDraft,
        Integer maxPassengers,
        String vesselBodyMaterial,
        String engineType,
        Cooling cooling,
        PropertyType propertyType,
        BigDecimal totalArea,
        BigDecimal livingArea,
        BigDecimal kitchenArea,
        Integer apartmentFloor,
        Integer floorsInHouse,
        HouseState houseState,
        Boolean hasBalcony,
        Integer balconyAmount,
        Boolean hasElevator,
        Boolean hasParking,
        Integer stationDistance,
        Boolean cityInfrastructure,
        Integer cityInfrastructureDistance,
        Boolean hasSecurity,
        Boolean hasVideoSecurity,
        Boolean hasChildrenPlayground,
        Boolean hasSportPlayground,
        PaymentType paymentType,
        Boolean hasDocuments,
        BigDecimal workExperience,
        String advantages,
        Employment employment,
        WorkFormat workFormat,
        String petBreed,
        String petName,
        String petColor,
        TransactionScope transactionScope,
        Boolean isProfitable,
        BusinessForm businessForm,
        OfferType offerType,
        String payBackPeriod,
        String condition
) {
    public record PictureDTO(
            @NotBlank(message = "URL фото не может быть пустым")
            String pictureUrl
    ) {}

    public record ServiceDTO(
            @NotBlank(message = "Текст услуги не может быть пустым")
            String text
    ) {}

    public record WorkScheduleDTO(
            @NotNull(message = "Укажите день начала")
            DayOfWeek fromDay,

            @NotNull(message = "Укажите день окончания")
            DayOfWeek toDay,

            @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Формат времени: ЧЧ:мм")
            String fromTime,

            @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Формат времени: ЧЧ:мм")
            String toTime,

            boolean is24h
    ) {}
}