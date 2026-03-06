/*
  Warnings:

  - You are about to drop the column `etoiles` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `nomHotel` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `pointsPositifs` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `hotelId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "etoiles",
DROP COLUMN "nomHotel",
DROP COLUMN "pointsPositifs",
ADD COLUMN     "hotelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "etoiles" INTEGER NOT NULL,
    "pointsPositifs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
