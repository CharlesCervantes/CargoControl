-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('enter', 'exit');

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileLink" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "mimetype" TEXT NOT NULL,
    "inspectionId" TEXT,
    "incidentId" TEXT,
    "operatorId" TEXT,
    "visitorId" TEXT,
    "vehicleId" TEXT,

    CONSTRAINT "FileLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "checklist" JSONB NOT NULL,
    "truckId" TEXT,
    "trailerId" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Load" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "economicNumber" TEXT,
    "containerNumber" TEXT,
    "type" TEXT,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "issuedById" TEXT NOT NULL,
    "type" "TradeType" NOT NULL,
    "note" TEXT,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "seal" TEXT,
    "plate" TEXT,
    "vin" TEXT,
    "medida" INTEGER,
    "typeId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Trailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailerOption" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrailerOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailerType" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrailerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vin" TEXT,
    "number" TEXT,
    "typeId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TruckOption" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TruckOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TruckType" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TruckType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "email" TEXT,
    "roleId" TEXT NOT NULL,
    "numberphone" VARCHAR,
    "lastname" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "type" TEXT,
    "model" TEXT,
    "brand" TEXT,
    "color" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "identityDocument" TEXT NOT NULL,
    "subject" TEXT,
    "cardNumber" TEXT,
    "socialSecurityNumber" TEXT,
    "companyId" TEXT,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VisitorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArchiveToCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToIncident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToOperator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToTruck" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToTruckType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchiveToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserArchive" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LoadToTrade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OperatorToTrade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeToTrailer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeToTruck" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TradeToVisitor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TrailerOptionToTrailerType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TruckOptionToTruckType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VehicleModelHierarchy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FileLink_name_key" ON "FileLink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_licenseNumber_key" ON "Operator"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrailerOption_name_key" ON "TrailerOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrailerType_name_key" ON "TrailerType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Truck_plate_key" ON "Truck"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Truck_vin_key" ON "Truck"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "TruckOption_name_key" ON "TruckOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TruckType_name_key" ON "TruckType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_name_key" ON "VehicleModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_identityDocument_key" ON "Visitor"("identityDocument");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorType_name_key" ON "VisitorType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToCompany_AB_unique" ON "_ArchiveToCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToCompany_B_index" ON "_ArchiveToCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToIncident_AB_unique" ON "_ArchiveToIncident"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToIncident_B_index" ON "_ArchiveToIncident"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToOperator_AB_unique" ON "_ArchiveToOperator"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToOperator_B_index" ON "_ArchiveToOperator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToTrailer_AB_unique" ON "_ArchiveToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToTrailer_B_index" ON "_ArchiveToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToTruck_AB_unique" ON "_ArchiveToTruck"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToTruck_B_index" ON "_ArchiveToTruck"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToTruckType_AB_unique" ON "_ArchiveToTruckType"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToTruckType_B_index" ON "_ArchiveToTruckType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToVehicle_AB_unique" ON "_ArchiveToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToVehicle_B_index" ON "_ArchiveToVehicle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchiveToVisitor_AB_unique" ON "_ArchiveToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchiveToVisitor_B_index" ON "_ArchiveToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserArchive_AB_unique" ON "_UserArchive"("A", "B");

-- CreateIndex
CREATE INDEX "_UserArchive_B_index" ON "_UserArchive"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoadToTrade_AB_unique" ON "_LoadToTrade"("A", "B");

-- CreateIndex
CREATE INDEX "_LoadToTrade_B_index" ON "_LoadToTrade"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OperatorToTrade_AB_unique" ON "_OperatorToTrade"("A", "B");

-- CreateIndex
CREATE INDEX "_OperatorToTrade_B_index" ON "_OperatorToTrade"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeToTrailer_AB_unique" ON "_TradeToTrailer"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeToTrailer_B_index" ON "_TradeToTrailer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeToTruck_AB_unique" ON "_TradeToTruck"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeToTruck_B_index" ON "_TradeToTruck"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeToVehicle_AB_unique" ON "_TradeToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeToVehicle_B_index" ON "_TradeToVehicle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TradeToVisitor_AB_unique" ON "_TradeToVisitor"("A", "B");

-- CreateIndex
CREATE INDEX "_TradeToVisitor_B_index" ON "_TradeToVisitor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TrailerOptionToTrailerType_AB_unique" ON "_TrailerOptionToTrailerType"("A", "B");

-- CreateIndex
CREATE INDEX "_TrailerOptionToTrailerType_B_index" ON "_TrailerOptionToTrailerType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TruckOptionToTruckType_AB_unique" ON "_TruckOptionToTruckType"("A", "B");

-- CreateIndex
CREATE INDEX "_TruckOptionToTruckType_B_index" ON "_TruckOptionToTruckType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleModelHierarchy_AB_unique" ON "_VehicleModelHierarchy"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleModelHierarchy_B_index" ON "_VehicleModelHierarchy"("B");

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileLink" ADD CONSTRAINT "FileLink_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileLink" ADD CONSTRAINT "FileLink_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileLink" ADD CONSTRAINT "FileLink_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileLink" ADD CONSTRAINT "FileLink_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileLink" ADD CONSTRAINT "FileLink_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TrailerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TruckType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckType" ADD CONSTRAINT "TruckType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VisitorType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToCompany" ADD CONSTRAINT "_ArchiveToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToCompany" ADD CONSTRAINT "_ArchiveToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToIncident" ADD CONSTRAINT "_ArchiveToIncident_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToIncident" ADD CONSTRAINT "_ArchiveToIncident_B_fkey" FOREIGN KEY ("B") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToOperator" ADD CONSTRAINT "_ArchiveToOperator_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToOperator" ADD CONSTRAINT "_ArchiveToOperator_B_fkey" FOREIGN KEY ("B") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTrailer" ADD CONSTRAINT "_ArchiveToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTrailer" ADD CONSTRAINT "_ArchiveToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTruck" ADD CONSTRAINT "_ArchiveToTruck_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTruck" ADD CONSTRAINT "_ArchiveToTruck_B_fkey" FOREIGN KEY ("B") REFERENCES "Truck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTruckType" ADD CONSTRAINT "_ArchiveToTruckType_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToTruckType" ADD CONSTRAINT "_ArchiveToTruckType_B_fkey" FOREIGN KEY ("B") REFERENCES "TruckType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToVehicle" ADD CONSTRAINT "_ArchiveToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToVehicle" ADD CONSTRAINT "_ArchiveToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToVisitor" ADD CONSTRAINT "_ArchiveToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchiveToVisitor" ADD CONSTRAINT "_ArchiveToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserArchive" ADD CONSTRAINT "_UserArchive_A_fkey" FOREIGN KEY ("A") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserArchive" ADD CONSTRAINT "_UserArchive_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoadToTrade" ADD CONSTRAINT "_LoadToTrade_A_fkey" FOREIGN KEY ("A") REFERENCES "Load"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoadToTrade" ADD CONSTRAINT "_LoadToTrade_B_fkey" FOREIGN KEY ("B") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperatorToTrade" ADD CONSTRAINT "_OperatorToTrade_A_fkey" FOREIGN KEY ("A") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperatorToTrade" ADD CONSTRAINT "_OperatorToTrade_B_fkey" FOREIGN KEY ("B") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToTrailer" ADD CONSTRAINT "_TradeToTrailer_A_fkey" FOREIGN KEY ("A") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToTrailer" ADD CONSTRAINT "_TradeToTrailer_B_fkey" FOREIGN KEY ("B") REFERENCES "Trailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToTruck" ADD CONSTRAINT "_TradeToTruck_A_fkey" FOREIGN KEY ("A") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToTruck" ADD CONSTRAINT "_TradeToTruck_B_fkey" FOREIGN KEY ("B") REFERENCES "Truck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToVehicle" ADD CONSTRAINT "_TradeToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToVehicle" ADD CONSTRAINT "_TradeToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToVisitor" ADD CONSTRAINT "_TradeToVisitor_A_fkey" FOREIGN KEY ("A") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TradeToVisitor" ADD CONSTRAINT "_TradeToVisitor_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrailerOptionToTrailerType" ADD CONSTRAINT "_TrailerOptionToTrailerType_A_fkey" FOREIGN KEY ("A") REFERENCES "TrailerOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrailerOptionToTrailerType" ADD CONSTRAINT "_TrailerOptionToTrailerType_B_fkey" FOREIGN KEY ("B") REFERENCES "TrailerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TruckOptionToTruckType" ADD CONSTRAINT "_TruckOptionToTruckType_A_fkey" FOREIGN KEY ("A") REFERENCES "TruckOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TruckOptionToTruckType" ADD CONSTRAINT "_TruckOptionToTruckType_B_fkey" FOREIGN KEY ("B") REFERENCES "TruckType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleModelHierarchy" ADD CONSTRAINT "_VehicleModelHierarchy_A_fkey" FOREIGN KEY ("A") REFERENCES "VehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleModelHierarchy" ADD CONSTRAINT "_VehicleModelHierarchy_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
