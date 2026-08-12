package com.matreshka.products_service.delivery.http.dto;

import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;

import java.math.BigDecimal;

public record AdvertSearchRequestDTO(
        String query,
        String category,
        String subCategory,
        String profession,
        String sphere,
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
        String userId,
        Boolean hasParking,
        Boolean hasElevator,
        Boolean hasBalcony,
        Boolean hasDocuments,
        Integer yearOfManufactureFrom,
        Integer yearOfManufactureTo,
        Integer engineCapacityFrom,
        Integer engineCapacityTo,
        Integer horsePowerFrom,
        Integer horsePowerTo,
        BigDecimal totalAreaFrom,
        BigDecimal totalAreaTo,
        Integer take,
        String cursor,
        Integer page
) {}