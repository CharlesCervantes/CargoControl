/*
  Warnings:

  - The `dateTime` column on the `EntranceUnits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Exit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExitToTrailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExitToVisitor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vin]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime_updated_at` to the `EntranceUnits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exit" DROP CONSTRAINT "Exit_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Exit" DROP CONSTRAINT "Exit_entraceId_fkey";

-- DropForeignKey
ALTER TABLE "Exit" DROP CONSTRAINT "Exit_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "_ExitToTrailer" DROP CONSTRAINT "_ExitToTrailer_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExitToTrailer" DROP CONSTRAINT "_ExitToTrailer_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExitToVisitor" DROP CONSTRAINT "_ExitToVisitor_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExitToVisitor" DROP CONSTRAINT "_ExitToVisitor_B_fkey";

-- AlterTable
ALTER TABLE "EntranceUnits" ADD COLUMN     "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Exit";

-- DropTable
DROP TABLE "_ExitToTrailer";

-- DropTable
DROP TABLE "_ExitToVisitor";

-- CreateTable
CREATE TABLE "ExitUnits" (
    "id" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime_updated_at" TIMESTAMP(3) NOT NULL,
    "driverId" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "ExitUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExitUnitsToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExitUnitsToTrailer_AB_unique" ON "_ExitUnitsToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_ExitUnitsToTrailer_B_index" ON "_ExitUnitsToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitUnitsToTrailer" ADD CONSTRAINT "_ExitUnitsToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "ExitUnits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExitUnitsToTrailer" ADD CONSTRAINT "_ExitUnitsToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
