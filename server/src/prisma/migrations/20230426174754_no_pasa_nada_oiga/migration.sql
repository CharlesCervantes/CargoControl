-- AlterTable
ALTER TABLE "ExitUnits" ADD COLUMN     "entraceUnitId" TEXT;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_entraceUnitId_fkey" FOREIGN KEY ("entraceUnitId") REFERENCES "EntranceUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
