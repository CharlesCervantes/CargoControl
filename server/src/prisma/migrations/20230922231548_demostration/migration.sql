/*
  Warnings:

  - You are about to drop the column `company` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `curp` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `isInside` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `license` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Trailer` table. All the data in the column will be lost.
  - You are about to drop the column `isInside` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `curp` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `entranceId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `identification_url` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `isInside` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `picture_url` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `security_social_number` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `EntranceUnits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `EntranceUnits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `ExitUnits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `ExitUnits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime_update_at` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Trailer` table without a default value. This is not possible if the table is not empty.
  - Made the column `isInside` on table `Trailer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organizationId` to the `TrailerType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organizationId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `VehicleType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `VehicleVisitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Visitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `VisitorEntrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `VisitorEntrance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `VisitorExit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `VisitorExit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `VisitorType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Driver_curp_key";

-- DropIndex
DROP INDEX "Driver_license_key";

-- DropIndex
DROP INDEX "File_name_key";

-- DropIndex
DROP INDEX "Trailer_vin_key";

-- DropIndex
DROP INDEX "TrailerType_name_key";

-- DropIndex
DROP INDEX "Vehicle_plate_key";

-- DropIndex
DROP INDEX "Vehicle_vin_key";

-- DropIndex
DROP INDEX "VehicleType_name_key";

-- DropIndex
DROP INDEX "VehicleVisitor_plates_key";

-- DropIndex
DROP INDEX "Visitor_curp_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "company",
DROP COLUMN "curp",
DROP COLUMN "isInside",
DROP COLUMN "license",
DROP COLUMN "name",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "personId" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "EntranceUnits" ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExitUnits" ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "checklistId" TEXT,
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "incidentId" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "personId" TEXT,
ADD COLUMN     "responseId" TEXT;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "location",
ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "datetime_update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Trailer" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "isInside" SET NOT NULL;

-- AlterTable
ALTER TABLE "TrailerType" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isInside",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "status" BOOLEAN,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "seal" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VehicleType" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VehicleVisitor" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "company",
DROP COLUMN "curp",
DROP COLUMN "entranceId",
DROP COLUMN "identification_url",
DROP COLUMN "isInside",
DROP COLUMN "name",
DROP COLUMN "picture_url",
DROP COLUMN "security_social_number",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isExit" BOOLEAN DEFAULT false,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "personId" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VisitorEntrance" ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VisitorExit" ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VisitorType" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "address" TEXT,
    "numberphone" TEXT,
    "email" TEXT,
    "organizationId" TEXT NOT NULL,
    "license" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "lastname" TEXT,
    "curp" TEXT,
    "security_social_number" TEXT,
    "numberphone" TEXT,
    "email" TEXT,
    "identification_url" TEXT,
    "picture_url" TEXT,
    "isInside" BOOLEAN,
    "organizationId" TEXT NOT NULL,
    "license" TEXT,
    "identificationFiles" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrVisitor" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "numVisitors" INTEGER NOT NULL,
    "vehicleId" TEXT,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "badge" TEXT,
    "organizationId" TEXT NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "QrVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtetime_update_at" TIMESTAMP(3) NOT NULL,
    "entraceUnitId" TEXT,
    "exitUnitId" TEXT,
    "vehicleId" TEXT,
    "trailerId" TEXT,
    "isSign" BOOLEAN NOT NULL,
    "identification" TEXT,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtetime_update_at" TIMESTAMP(3) NOT NULL,
    "checklistId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailerLoad" (
    "id" TEXT NOT NULL,
    "trailerId" TEXT,
    "entranceId" TEXT,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "TrailerLoad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IncidentToVehicleVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QrVisitorToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_IncidentToVehicleVisitor_AB_unique" ON "_IncidentToVehicleVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_IncidentToVehicleVisitor_B_index" ON "_IncidentToVehicleVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QrVisitorToVisitor_AB_unique" ON "_QrVisitorToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_QrVisitorToVisitor_B_index" ON "_QrVisitorToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_personId_key" ON "Driver"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntranceUnits" ADD CONSTRAINT "EntranceUnits_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntranceUnits" ADD CONSTRAINT "EntranceUnits_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailerType" ADD CONSTRAINT "TrailerType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_picture_fkey" FOREIGN KEY ("picture") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleVisitor" ADD CONSTRAINT "VehicleVisitor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleType" ADD CONSTRAINT "VehicleType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorType" ADD CONSTRAINT "VisitorType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorEntrance" ADD CONSTRAINT "VisitorEntrance_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorEntrance" ADD CONSTRAINT "VisitorEntrance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorExit" ADD CONSTRAINT "VisitorExit_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorExit" ADD CONSTRAINT "VisitorExit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrVisitor" ADD CONSTRAINT "QrVisitor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrVisitor" ADD CONSTRAINT "QrVisitor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrVisitor" ADD CONSTRAINT "QrVisitor_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleVisitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_entraceUnitId_fkey" FOREIGN KEY ("entraceUnitId") REFERENCES "EntranceUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_exitUnitId_fkey" FOREIGN KEY ("exitUnitId") REFERENCES "ExitUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailerLoad" ADD CONSTRAINT "TrailerLoad_entranceId_fkey" FOREIGN KEY ("entranceId") REFERENCES "EntranceUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailerLoad" ADD CONSTRAINT "TrailerLoad_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVehicleVisitor" ADD CONSTRAINT "_IncidentToVehicleVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentToVehicleVisitor" ADD CONSTRAINT "_IncidentToVehicleVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleVisitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QrVisitorToVisitor" ADD CONSTRAINT "_QrVisitorToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "QrVisitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QrVisitorToVisitor" ADD CONSTRAINT "_QrVisitorToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
