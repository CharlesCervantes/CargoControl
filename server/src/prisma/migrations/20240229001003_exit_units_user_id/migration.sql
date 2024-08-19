-- AlterTable
ALTER TABLE "ExitUnits" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "ExitUnits" ADD CONSTRAINT "ExitUnits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
