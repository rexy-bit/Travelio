/*
  Warnings:

  - Made the column `destinationId` on table `Hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Reservation_userId_tripId_key";

-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "destinationId" SET NOT NULL;
