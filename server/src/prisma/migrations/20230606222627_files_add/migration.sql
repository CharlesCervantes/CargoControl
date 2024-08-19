/*
  Warnings:

  - You are about to drop the column `entraceUnitId` on the `ExitUnits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[curp]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExitUnits" DROP CONSTRAINT "ExitUnits_entraceUnitId_fkey";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "isInside" BOOLEAN;

-- AlterTable
ALTER TABLE "ExitUnits" DROP COLUMN "entraceUnitId",
ADD COLUMN     "entranceUnitId" TEXT;

-- AlterTable
ALTER TABLE "Trailer" ADD COLUMN     "company" TEXT,
ADD COLUMN     "isInside" BOOLEAN;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isInside" BOOLEAN;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "isInside" BOOLEAN;

-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "isInside" BOOLEAN,
ADD COLUMN     "visitorTypeId" TEXT;

-- CreateTable
CREATE TABLE "VehicleVisitor" (
    "id" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isInside" BOOLEAN,

    CONSTRAINT "VehicleVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "VisitorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorEntrance" (
    "id" TEXT NOT NULL,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleVisitorId" TEXT,

    CONSTRAINT "VisitorEntrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorExit" (
    "id" TEXT NOT NULL,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idEntrance" TEXT,
    "idVehicleVisitor" TEXT,

    CONSTRAINT "VisitorExit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VisitorToVisitorEntrance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VisitorToVisitorExit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FileToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleVisitor_plates_key" ON "VehicleVisitor"("plates");

-- CreateIndex
CREATE UNIQUE INDEX "File_name_key" ON "File"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_VisitorToVisitorEntrance_AB_unique" ON "_VisitorToVisitorEntrance"("A", "B");

-- CreateIndex
CREATE INDEX "_VisitorToVisitorEntrance_B_index" ON "_VisitorToVisitorEntrance"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VisitorToVisitorExit_AB_unique" ON "_VisitorToVisitorExit"("A", "B");

-- CreateIndex
CREATE INDEX "_VisitorToVisitorExit_B_index" ON "_VisitorToVisitorExit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToVisitor_AB_unique" ON "_FileToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToVisitor_B_index" ON "_FileToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_curp_key" ON "Visitor"("curp");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_visitorTypeId_fkey" FOREIGN KEY ("visitorTypeId") REFERENCES "VisitorType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_entranceUnitId_fkey" FOREIGN KEY ("entranceUnitId") REFERENCES "EntranceUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorEntrance" ADD CONSTRAINT "VisitorEntrance_vehicleVisitorId_fkey" FOREIGN KEY ("vehicleVisitorId") REFERENCES "VehicleVisitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorExit" ADD CONSTRAINT "VisitorExit_idEntrance_fkey" FOREIGN KEY ("idEntrance") REFERENCES "VisitorEntrance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorExit" ADD CONSTRAINT "VisitorExit_idVehicleVisitor_fkey" FOREIGN KEY ("idVehicleVisitor") REFERENCES "VehicleVisitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorToVisitorEntrance" ADD CONSTRAINT "_VisitorToVisitorEntrance_A_fkey" FOREIGN KEY ("A") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorToVisitorEntrance" ADD CONSTRAINT "_VisitorToVisitorEntrance_B_fkey" FOREIGN KEY ("B") REFERENCES "VisitorEntrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorToVisitorExit" ADD CONSTRAINT "_VisitorToVisitorExit_A_fkey" FOREIGN KEY ("A") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorToVisitorExit" ADD CONSTRAINT "_VisitorToVisitorExit_B_fkey" FOREIGN KEY ("B") REFERENCES "VisitorExit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToVisitor" ADD CONSTRAINT "_FileToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToVisitor" ADD CONSTRAINT "_FileToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
