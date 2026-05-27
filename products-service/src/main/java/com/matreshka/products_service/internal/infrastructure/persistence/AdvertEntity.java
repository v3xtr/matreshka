package com.matreshka.products_service.internal.infrastructure.persistence;

import com.matreshka.products_service.internal.infrastructure.persistence.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "adverts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AdvertEntity {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "advert_id")
    private String advertId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "fathers_name")
    private String fathersName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "sub_category")
    private String subCategory;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "profession")
    private String profession;

    @Column(name = "sphere")
    private String sphere;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "year_of_manufacture")
    private Integer yearOfManufacture;

    @Column(name = "color")
    private String color;

    @Column(name = "is_on_the_go")
    private Boolean isOnTheGo;

    @Column(name = "vehicle_body_type")
    private String vehicleBodyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_kpp")
    private VehicleKpp vehicleKpp;

    @Column(name = "owners_pts")
    private Integer ownersPts;

    @Column(name = "milage")
    private Long milage;

    @Column(name = "engine_capacity")
    private Integer engineCapacity;

    @Column(name = "horse_power")
    private Integer horsePower;

    @Enumerated(EnumType.STRING)
    @Column(name = "drive")
    private Drive drive;

    @Enumerated(EnumType.STRING)
    @Column(name = "steering_wheel")
    private SteeringWheel steeringWheel;

    @Column(name = "price", nullable = false)
    private String price;

    @Enumerated(EnumType.STRING)
    @Column(name = "price_for")
    private PriceFor priceFor;

    @Enumerated(EnumType.STRING)
    @Column(name = "vessel_type")
    private VesselType vesselType;

    @Column(name = "vessel_length")
    private Integer vesselLength;

    @Column(name = "vessel_width")
    private Integer vesselWidth;

    @Column(name = "vessel_draft")
    private Integer vesselDraft;

    @Column(name = "max_passengers")
    private Integer maxPassengers;

    @Column(name = "vessel_body_material")
    private String vesselBodyMaterial;

    @Column(name = "engine_type")
    private String engineType;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooling")
    private Cooling cooling;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type")
    private PropertyType propertyType;

    @Column(name = "total_area", precision = 10, scale = 2)
    private BigDecimal totalArea;

    @Column(name = "living_area", precision = 10, scale = 2)
    private BigDecimal livingArea;

    @Column(name = "kitchen_area", precision = 10, scale = 2)
    private BigDecimal kitchenArea;

    @Column(name = "apartment_floor")
    private Integer apartmentFloor;

    @Column(name = "floors_in_house")
    private Integer floorsInHouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "house_state")
    private HouseState houseState;

    @Column(name = "has_balcony")
    private Boolean hasBalcony;

    @Column(name = "balcony_amount")
    private Integer balconyAmount;

    @Column(name = "has_elevator")
    private Boolean hasElevator;

    @Column(name = "has_parking")
    private Boolean hasParking;

    @Column(name = "station_distance")
    private Integer stationDistance;

    @Column(name = "city_infrastructure")
    private Boolean cityInfrastructure;

    @Column(name = "city_infrastructure_distance")
    private Integer cityInfrastructureDistance;

    @Column(name = "has_security")
    private Boolean hasSecurity;

    @Column(name = "has_video_security")
    private Boolean hasVideoSecurity;

    @Column(name = "has_children_playground")
    private Boolean hasChildrenPlayground;

    @Column(name = "has_sport_playground")
    private Boolean hasSportPlayground;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Column(name = "has_documents")
    private Boolean hasDocuments;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "work_experience", precision = 10, scale = 2)
    private BigDecimal workExperience;

    @Column(name = "advantages")
    private String advantages;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment")
    private Employment employment;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_format")
    private WorkFormat workFormat;

    @Column(name = "pet_breed")
    private String petBreed;

    @Column(name = "pet_name")
    private String petName;

    @Column(name = "pet_color")
    private String petColor;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_scope")
    private TransactionScope transactionScope;

    @Column(name = "is_profitable")
    private Boolean isProfitable;

    @Enumerated(EnumType.STRING)
    @Column(name = "business_form")
    private BusinessForm businessForm;

    @Enumerated(EnumType.STRING)
    @Column(name = "offer_type")
    private OfferType offerType;

    @Column(name = "pay_back_period")
    private String payBackPeriod;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "contacts", nullable = false)
    private String contacts;

    @Column(name = "is_in_elastic", nullable = false)
    @Builder.Default
    private Boolean isInElastic = false;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @OneToMany(mappedBy = "advert", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceEntity> services;

    @OneToMany(mappedBy = "advert", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkPeriodEntity> workSchedule;

    @OneToMany(mappedBy = "advert", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PictureEntity> pictures;

    @OneToOne(mappedBy = "advert", cascade = CascadeType.ALL, orphanRemoval = true)
    private VideoEntity video;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}