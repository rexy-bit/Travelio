/*
  Warnings:

  - Added the required column `dateNaiss` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passeportNum` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "dateNaiss" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "passeportNum" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
