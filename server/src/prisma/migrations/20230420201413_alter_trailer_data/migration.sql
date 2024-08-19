/*
  Warnings:

  - You are about to drop the column `date` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `medida` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `archived` on the `TrailerType` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `identityDocument` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `socialSecurityNumber` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the `Archive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inspection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Load` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Operator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrailerOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Truck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TruckOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TruckType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitorType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToIncident` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToOperator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToTrailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToTruck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToTruckType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToVehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToVisitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LoadToTrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OperatorToTrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TradeToTrailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TradeToTruck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TradeToVehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TradeToVisitor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrailerOptionToTrailerType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TruckOptionToTruckType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserArchive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VehicleModelHierarchy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vin]` on the table `Trailer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_userId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropForeignKey
ALTER TABLE "FileLink" DROP CONSTRAINT "FileLink_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "FileLink" DROP CONSTRAINT "FileLink_inspectionId_fkey";

-- DropForeignKey
ALTER TABLE "FileLink" DROP CONSTRAINT "FileLink_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "FileLink" DROP CONSTRAINT "FileLink_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "FileLink" DROP CONSTRAINT "FileLink_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_userId_fkey";

-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_trailerId_fkey";

-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_truckId_fkey";

-- DropForeignKey
ALTER TABLE "Operator" DROP CONSTRAINT "Operator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_issuedById_fkey";

-- DropForeignKey
ALTER TABLE "Trailer" DROP CONSTRAINT "Trailer_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Trailer" DROP CONSTRAINT "Trailer_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Trailer" DROP CONSTRAINT "Trailer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Truck" DROP CONSTRAINT "Truck_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Truck" DROP CONSTRAINT "Truck_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Truck" DROP CONSTRAINT "Truck_userId_fkey";

-- DropForeignKey
ALTER TABLE "TruckType" DROP CONSTRAINT "TruckType_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToCompany" DROP CONSTRAINT "_ArchiveToCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToCompany" DROP CONSTRAINT "_ArchiveToCompany_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToIncident" DROP CONSTRAINT "_ArchiveToIncident_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToIncident" DROP CONSTRAINT "_ArchiveToIncident_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToOperator" DROP CONSTRAINT "_ArchiveToOperator_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToOperator" DROP CONSTRAINT "_ArchiveToOperator_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTrailer" DROP CONSTRAINT "_ArchiveToTrailer_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTrailer" DROP CONSTRAINT "_ArchiveToTrailer_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTruck" DROP CONSTRAINT "_ArchiveToTruck_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTruck" DROP CONSTRAINT "_ArchiveToTruck_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTruckType" DROP CONSTRAINT "_ArchiveToTruckType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToTruckType" DROP CONSTRAINT "_ArchiveToTruckType_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToVehicle" DROP CONSTRAINT "_ArchiveToVehicle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToVehicle" DROP CONSTRAINT "_ArchiveToVehicle_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToVisitor" DROP CONSTRAINT "_ArchiveToVisitor_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToVisitor" DROP CONSTRAINT "_ArchiveToVisitor_B_fkey";

-- DropForeignKey
ALTER TABLE "_LoadToTrade" DROP CONSTRAINT "_LoadToTrade_A_fkey";

-- DropForeignKey
ALTER TABLE "_LoadToTrade" DROP CONSTRAINT "_LoadToTrade_B_fkey";

-- DropForeignKey
ALTER TABLE "_OperatorToTrade" DROP CONSTRAINT "_OperatorToTrade_A_fkey";

-- DropForeignKey
ALTER TABLE "_OperatorToTrade" DROP CONSTRAINT "_OperatorToTrade_B_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToTrailer" DROP CONSTRAINT "_TradeToTrailer_A_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToTrailer" DROP CONSTRAINT "_TradeToTrailer_B_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToTruck" DROP CONSTRAINT "_TradeToTruck_A_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToTruck" DROP CONSTRAINT "_TradeToTruck_B_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToVehicle" DROP CONSTRAINT "_TradeToVehicle_A_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToVehicle" DROP CONSTRAINT "_TradeToVehicle_B_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToVisitor" DROP CONSTRAINT "_TradeToVisitor_A_fkey";

-- DropForeignKey
ALTER TABLE "_TradeToVisitor" DROP CONSTRAINT "_TradeToVisitor_B_fkey";

-- DropForeignKey
ALTER TABLE "_TrailerOptionToTrailerType" DROP CONSTRAINT "_TrailerOptionToTrailerType_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrailerOptionToTrailerType" DROP CONSTRAINT "_TrailerOptionToTrailerType_B_fkey";

-- DropForeignKey
ALTER TABLE "_TruckOptionToTruckType" DROP CONSTRAINT "_TruckOptionToTruckType_A_fkey";

-- DropForeignKey
ALTER TABLE "_TruckOptionToTruckType" DROP CONSTRAINT "_TruckOptionToTruckType_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserArchive" DROP CONSTRAINT "_UserArchive_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserArchive" DROP CONSTRAINT "_UserArchive_B_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleModelHierarchy" DROP CONSTRAINT "_VehicleModelHierarchy_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleModelHierarchy" DROP CONSTRAINT "_VehicleModelHierarchy_B_fkey";

-- DropIndex
DROP INDEX "Visitor_identityDocument_key";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "date",
DROP COLUMN "note",
DROP COLUMN "userId",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "report" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trailer" DROP COLUMN "companyId",
DROP COLUMN "date",
DROP COLUMN "medida",
DROP COLUMN "typeId",
DROP COLUMN "userId",
ADD COLUMN     "trailerTypeId" TEXT;

-- AlterTable
ALTER TABLE "TrailerType" DROP COLUMN "archived";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "brand",
DROP COLUMN "color",
DROP COLUMN "date",
DROP COLUMN "model",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "company" TEXT,
ADD COLUMN     "unitNumber" TEXT,
ADD COLUMN     "vehicleTypeId" TEXT NOT NULL,
ADD COLUMN     "vin" TEXT;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "cardNumber",
DROP COLUMN "companyId",
DROP COLUMN "date",
DROP COLUMN "identityDocument",
DROP COLUMN "socialSecurityNumber",
DROP COLUMN "typeId",
DROP COLUMN "userId",
ADD COLUMN     "badge" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "curp" TEXT,
ADD COLUMN     "entranceId" TEXT,
ADD COLUMN     "identification_url" TEXT,
ADD COLUMN     "picture_url" TEXT,
ADD COLUMN     "security_social_number" TEXT;

-- DropTable
DROP TABLE "Archive";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "FileLink";

-- DropTable
DROP TABLE "Inspection";

-- DropTable
DROP TABLE "Load";

-- DropTable
DROP TABLE "Operator";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Trade";

-- DropTable
DROP TABLE "TrailerOption";

-- DropTable
DROP TABLE "Truck";

-- DropTable
DROP TABLE "TruckOption";

-- DropTable
DROP TABLE "TruckType";

-- DropTable
DROP TABLE "VehicleModel";

-- DropTable
DROP TABLE "VisitorType";

-- DropTable
DROP TABLE "_ArchiveToCompany";

-- DropTable
DROP TABLE "_ArchiveToIncident";

-- DropTable
DROP TABLE "_ArchiveToOperator";

-- DropTable
DROP TABLE "_ArchiveToTrailer";

-- DropTable
DROP TABLE "_ArchiveToTruck";

-- DropTable
DROP TABLE "_ArchiveToTruckType";

-- DropTable
DROP TABLE "_ArchiveToVehicle";

-- DropTable
DROP TABLE "_ArchiveToVisitor";

-- DropTable
DROP TABLE "_LoadToTrade";

-- DropTable
DROP TABLE "_OperatorToTrade";

-- DropTable
DROP TABLE "_TradeToTrailer";

-- DropTable
DROP TABLE "_TradeToTruck";

-- DropTable
DROP TABLE "_TradeToVehicle";

-- DropTable
DROP TABLE "_TradeToVisitor";

-- DropTable
DROP TABLE "_TrailerOptionToTrailerType";

-- DropTable
DROP TABLE "_TruckOptionToTruckType";

-- DropTable
DROP TABLE "_UserArchive";

-- DropTable
DROP TABLE "_VehicleModelHierarchy";

-- DropEnum
DROP TYPE "TradeType";

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "license" TEXT,
    "curp" TEXT,
    "company" TEXT,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntranceUnits" (
    "id" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "driverId" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "EntranceUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exit" (
    "id" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "driverId" TEXT,
    "vehicleId" TEXT,
    "entraceId" TEXT,

    CONSTRAINT "Exit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DriverToIncident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EntranceToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExitToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExitToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IncidentToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IncidentToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IncidentToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToTrailerType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToVehicleType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_license_key" ON "Driver"("license");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_curp_key" ON "Driver"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "_DriverToIncident_AB_unique" ON "_DriverToIncident"("A", "B");

-- CreateIndex
CREATE INDEX "_DriverToIncident_B_index" ON "_DriverToIncident"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EntranceToTrailer_AB_unique" ON "_EntranceToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_EntranceToTrailer_B_index" ON "_EntranceToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExitToTrailer_AB_unique" ON "_ExitToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_ExitToTrailer_B_index" ON "_ExitToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExitToVisitor_AB_unique" ON "_ExitToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_ExitToVisitor_B_index" ON "_ExitToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IncidentToTrailer_AB_unique" ON "_IncidentToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_IncidentToTrailer_B_index" ON "_IncidentToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IncidentToVehicle_AB_unique" ON "_IncidentToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_IncidentToVehicle_B_index" ON "_IncidentToVehicle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IncidentToVisitor_AB_unique" ON "_IncidentToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_IncidentToVisitor_B_index" ON "_IncidentToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTrailerType_AB_unique" ON "_QuestionToTrailerType"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTrailerType_B_index" ON "_QuestionToTrailerType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToVehicleType_AB_unique" ON "_QuestionToVehicleType"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToVehicleType_B_index" ON "_QuestionToVehicleType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Trailer_vin_key" ON "Trailer"("vin");

-- AddForeignKey
ALTER TABLE "EntranceUnits" ADD CONSTRAINT "EntranceUnits_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntranceUnits" ADD CONSTRAINT "EntranceUnits_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_entraceId_fkey" FOREIGN KEY ("entraceId") REFERENCES "EntranceUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exit" ADD CONSTRAINT "Exit_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_trailerTypeId_fkey" FOREIGN KEY ("trailerTypeId") REFERENCES "TrailerType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DriverToIncident" ADD CONSTRAINT "_DriverToIncident_A_fkey" FOREIGN KEY ("A") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DriverToIncident" ADD CONSTRAINT "_DriverToIncident_B_fkey" FOREIGN KEY ("B") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntranceToTrailer" ADD CONSTRAINT "_EntranceToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "EntranceUnits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntranceToTrailer" ADD CONSTRAINT "_EntranceToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitToTrailer" ADD CONSTRAINT "_ExitToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "Exit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitToTrailer" ADD CONSTRAINT "_ExitToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitToVisitor" ADD CONSTRAINT "_ExitToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Exit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitToVisitor" ADD CONSTRAINT "_ExitToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToTrailer" ADD CONSTRAINT "_IncidentToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToTrailer" ADD CONSTRAINT "_IncidentToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVehicle" ADD CONSTRAINT "_IncidentToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVehicle" ADD CONSTRAINT "_IncidentToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVisitor" ADD CONSTRAINT "_IncidentToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVisitor" ADD CONSTRAINT "_IncidentToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTrailerType" ADD CONSTRAINT "_QuestionToTrailerType_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTrailerType" ADD CONSTRAINT "_QuestionToTrailerType_B_fkey" FOREIGN KEY ("B") REFERENCES "TrailerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToVehicleType" ADD CONSTRAINT "_QuestionToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToVehicleType" ADD CONSTRAINT "_QuestionToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
