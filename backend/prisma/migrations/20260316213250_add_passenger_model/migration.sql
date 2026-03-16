/*
  Warnings:

  - A unique constraint covering the columns `[userId,tripId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_tripId_key" ON "Reservation"("userId", "tripId");
