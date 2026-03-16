import { success } from "zod";
import prisma from "../config/prisma.js";


export const addReservation = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { tripId, passengers } = req.body;

        if (!passengers || passengers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Passengers are required"
            });
        }

        const reservation = await prisma.$transaction(async (tx) => {

            const user = await tx.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error("User not found");
            }

            const trip = await tx.trip.findUnique({
                where: { id: tripId }
            });

            if (!trip) {
                throw new Error("Trip not found");
            }

            if (trip.places < passengers.length) {
                throw new Error("Pas de places disponibles dans ce voyage");
            }

            const existingReservation = await tx.reservation.findFirst({
                where: { userId, tripId }
            });

            if (existingReservation) {
                throw new Error("You already created this reservation");
            }

            for (const p of passengers) {
                if (!p.firstName || !p.lastName || !p.age || Number(p.age) <= 0) {
                    throw new Error("Invalid passenger data");
                }
            }

            
            const newReservation = await tx.reservation.create({
                data: {
                    userId,
                    tripId,
                    passengers: {
                        create: passengers
                    }
                },
                include: {
                    passengers: true
                }
            });

            return newReservation;
        });

        return res.status(201).json({
            success: true,
            message: "Reservation created successfully",
            data: reservation
        });

    } catch (err) {
     
        return res.status(400).json({
            success: false,
            message: err.message || "Error creating reservation"
        });
    }
};




export const getUserReservations = async(req, res, next) => {


    try{

        const userId = req.params.id;

        const user = await prisma.user.findFirst({
            where : {
                id : userId
            }
        });

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error user not found"
            });

        }

        const reservations = await prisma.reservation.findMany({
            where : {
                userId : userId
            }
        });


        return res.status(200).json({
            success : false,
            message : "User reservations got successfully"
        });
    }catch(err){
        next(err);
    }
    
}