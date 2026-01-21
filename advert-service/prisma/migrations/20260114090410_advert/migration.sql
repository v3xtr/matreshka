/*
  Warnings:

  - You are about to drop the column `salaryEnd` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `salaryStart` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `Advert` table. All the data in the column will be lost.
  - The `employment` column on the `Advert` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `contacts` to the `Advert` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Advert` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "VehicleKpp" AS ENUM ('Variable', 'Automatic', 'Manual', 'Robot');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('Full', 'Trade', 'Mortgage', 'InstallmentPlan');

-- CreateEnum
CREATE TYPE "HouseState" AS ENUM ('CosmeticRepairs', 'EuroRepairs', 'RoughFinish', 'NeedRepairs');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Panel', 'Brick', 'Monolith');

-- CreateEnum
CREATE TYPE "Cooling" AS ENUM ('Air', 'Liquid');

-- CreateEnum
CREATE TYPE "Employment" AS ENUM ('FullTime', 'PartTime', 'Temporary', 'Internship');

-- CreateEnum
CREATE TYPE "WorkFormat" AS ENUM ('Outsource', 'Office', 'Hybride');

-- CreateEnum
CREATE TYPE "PriceFor" AS ENUM ('Service', 'Hour', 'Day', 'Week', 'Month');

-- CreateEnum
CREATE TYPE "Drive" AS ENUM ('Full', 'Rear', 'Front');

-- CreateEnum
CREATE TYPE "SteeringWheel" AS ENUM ('DoesntMatter', 'Left', 'Right');

-- CreateEnum
CREATE TYPE "VesselType" AS ENUM ('Boat', 'MotorYacht', 'SailingYacht', 'Vessels');

-- CreateEnum
CREATE TYPE "TransactionScope" AS ENUM ('Meet', 'Sell', 'FindPartner');

-- CreateEnum
CREATE TYPE "BusinessForm" AS ENUM ('IE', 'LLC', 'JSC', 'Other');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('Tour', 'Excursion', 'WeekendTour', 'SignatureTour', 'Transfer', 'HousingRental', 'Travel');

-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "salaryEnd",
DROP COLUMN "salaryStart",
DROP COLUMN "subcategory",
ADD COLUMN     "advanteges" TEXT,
ADD COLUMN     "apartmentFloor" INTEGER,
ADD COLUMN     "balconyAmount" INTEGER DEFAULT 0,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "businessForm" "BusinessForm",
ADD COLUMN     "cityInfrastructure" BOOLEAN,
ADD COLUMN     "cityInfrastructureDistance" INTEGER,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "contacts" TEXT NOT NULL,
ADD COLUMN     "cooling" "Cooling",
ADD COLUMN     "drive" "Drive",
ADD COLUMN     "engineCapacity" INTEGER,
ADD COLUMN     "engineType" TEXT,
ADD COLUMN     "fathersName" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "floorsInHouse" INTEGER,
ADD COLUMN     "fromHour" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hasBalcony" BOOLEAN,
ADD COLUMN     "hasChildrenPlayground" BOOLEAN,
ADD COLUMN     "hasDocuments" BOOLEAN,
ADD COLUMN     "hasElevator" BOOLEAN,
ADD COLUMN     "hasParking" BOOLEAN,
ADD COLUMN     "hasSecurity" BOOLEAN,
ADD COLUMN     "hasSportPlayground" BOOLEAN,
ADD COLUMN     "hasVideoSecurity" BOOLEAN,
ADD COLUMN     "horsePower" INTEGER,
ADD COLUMN     "houseState" "HouseState",
ADD COLUMN     "isOnTheGo" BOOLEAN,
ADD COLUMN     "isProfitable" BOOLEAN,
ADD COLUMN     "kitchenArea" DECIMAL(65,30),
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "livingArea" DECIMAL(65,30),
ADD COLUMN     "maxPassengers" INTEGER,
ADD COLUMN     "milage" BIGINT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "offerType" "OfferType",
ADD COLUMN     "ownersPts" INTEGER,
ADD COLUMN     "payBackPeriod" TEXT,
ADD COLUMN     "paymentType" "PaymentType",
ADD COLUMN     "petBreed" TEXT,
ADD COLUMN     "petColor" TEXT,
ADD COLUMN     "petName" TEXT,
ADD COLUMN     "priceFor" "PriceFor",
ADD COLUMN     "propertyType" "PropertyType",
ADD COLUMN     "stationDistance" INTEGER,
ADD COLUMN     "steerinWheel" "SteeringWheel",
ADD COLUMN     "subCategory" TEXT,
ADD COLUMN     "toHour" TEXT,
ADD COLUMN     "totalArea" DECIMAL(65,30),
ADD COLUMN     "transactionScope" "TransactionScope",
ADD COLUMN     "vehicleBodyType" TEXT,
ADD COLUMN     "vehicleKpp" "VehicleKpp",
ADD COLUMN     "vesselBodyMaterial" TEXT,
ADD COLUMN     "vesselDraft" INTEGER,
ADD COLUMN     "vesselLength" INTEGER,
ADD COLUMN     "vesselType" "VesselType",
ADD COLUMN     "vesselWidth" INTEGER,
ADD COLUMN     "workDays" TEXT,
ADD COLUMN     "workExperience" DECIMAL(65,30),
ADD COLUMN     "workFormat" "WorkFormat",
ADD COLUMN     "yearOfmanufacture" INTEGER,
DROP COLUMN "employment",
ADD COLUMN     "employment" "Employment",
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;
