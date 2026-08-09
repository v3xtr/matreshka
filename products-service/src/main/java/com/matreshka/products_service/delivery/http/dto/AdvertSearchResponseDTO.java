package com.matreshka.products_service.delivery.http.dto;

import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;

import java.math.BigDecimal;

public record AdvertSearchResponseDTO(
        String id,
        String title,
        String description,
        String category,
        String subCategory,
        String profession,
        String sphere,
        String price,
        PriceFor priceFor,
        String address,
        String userId,
        Employment employment,
        WorkFormat workFormat,
        PropertyType propertyType,
        VehicleKpp vehicleKpp,
        Drive drive,
        VesselType vesselType,
        PaymentType paymentType,
        BusinessForm businessForm,
        OfferType offerType,
        TransactionScope transactionScope,
        Integer yearOfManufacture,
        Integer engineCapacity,
        Integer horsePower,
        BigDecimal livingArea,
        BigDecimal kitchenArea,
        Integer apartmentFloor,
        Integer floorsInHouse,
        Boolean hasBalcony,
        Boolean hasElevator,
        Boolean hasParking,
        Boolean hasDocuments,
        BigDecimal totalArea,
        String pictureUrls,
        String createdAt
) {
}