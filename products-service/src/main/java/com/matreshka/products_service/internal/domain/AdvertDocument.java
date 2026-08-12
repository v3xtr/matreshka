package com.matreshka.products_service.internal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.List;

@Document(indexName = "adverts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class AdvertDocument {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "russian")
    private String title;

    @Field(type = FieldType.Text, analyzer = "russian")
    private String description;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Keyword)
    private String subCategory;

    @Field(type = FieldType.Keyword)
    private String profession;

    @Field(type = FieldType.Keyword)
    private String sphere;

    @Field(type = FieldType.Keyword)
    private String price;

    @Field(type = FieldType.Keyword)
    private PriceFor priceFor;

    @Field(type = FieldType.Keyword)
    private String address;

    @Field(type = FieldType.Keyword)
    private String userId;

    @Field(type = FieldType.Keyword)
    private Employment employment;

    @Field(type = FieldType.Keyword)
    private WorkFormat workFormat;

    @Field(type = FieldType.Keyword)
    private PropertyType propertyType;

    @Field(type = FieldType.Keyword)
    private VehicleKpp vehicleKpp;

    @Field(type = FieldType.Keyword)
    private Drive drive;

    @Field(type = FieldType.Keyword)
    private VesselType vesselType;

    @Field(type = FieldType.Keyword)
    private PaymentType paymentType;

    @Field(type = FieldType.Keyword)
    private BusinessForm businessForm;

    @Field(type = FieldType.Keyword)
    private OfferType offerType;

    @Field(type = FieldType.Keyword)
    private TransactionScope transactionScope;

    @Field(type = FieldType.Integer)
    private Integer yearOfManufacture;

    @Field(type = FieldType.Integer)
    private Integer engineCapacity;

    @Field(type = FieldType.Integer)
    private Integer horsePower;

    @Field(type = FieldType.Double)
    private BigDecimal livingArea;

    @Field(type = FieldType.Double)
    private BigDecimal kitchenArea;

    @Field(type = FieldType.Integer)
    private Integer apartmentFloor;

    @Field(type = FieldType.Integer)
    private Integer floorsInHouse;

    @Field(type = FieldType.Boolean)
    private Boolean hasBalcony;

    @Field(type = FieldType.Boolean)
    private Boolean hasElevator;

    @Field(type = FieldType.Boolean)
    private Boolean hasParking;

    @Field(type = FieldType.Boolean)
    private Boolean hasDocuments;

    @Field(type = FieldType.Double)
    private BigDecimal totalArea;

    @Field(type = FieldType.Keyword)
    private List<String> pictureUrls;

    @Field(type = FieldType.Keyword)
    private String createdAt;
}