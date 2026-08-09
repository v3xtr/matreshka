package com.matreshka.products_service.delivery.http.dto;

import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record AdvertGetAdvertResponseDTO(
        UUID id,

        String firstName,
        String lastName,
        String fathersName,
        String gender,

        String category,
        String subCategory,
        String title,
        String description,
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
        String condition,

        String price,
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

        String address,
        String contacts,
        String userId,

        List<String> pictureUrls,
        MediaResponseDTO video,
        List<ServiceResponseDTO> services,
        List<WorkPeriodResponseDTO> workSchedule,

        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}