import { success } from "zod";
import prisma from "../config/prisma.js";
import { tr } from "zod/v4/locales";


export const addReservation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { tripId, passengers } = req.body;

    if (!passengers || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Passengers are required",
      });
    }

    // Transaction pour atomicité
    const reservation = await prisma.$transaction(async (tx) => {
      // 1️⃣ Vérifier l'utilisateur
      const user = await tx.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new Error("User not found");

      // 2️⃣ Vérifier le trip
      const trip = await tx.trip.findUnique({
        where: { id: tripId },
      });
      if (!trip) throw new Error("Trip not found");

      // 3️⃣ Vérifier la disponibilité
      if (trip.places < passengers.length) {
        throw new Error("Not enough seats available for this trip");
      }

      // 4️⃣ Vérifier que l'utilisateur n'a pas déjà réservé ce trip
      const existingReservation = await tx.reservation.findFirst({
        where: {
          tripId,
          userId,
          status : {
            not : "EN_ATTENTE"
          }
        }
      });
      if (existingReservation) {
        throw new Error("You already created this reservation");
      }

      // 5️⃣ Valider les passagers et calculer totalPrice pour chacun
      const passengersData = passengers.map((p) => {
        const { firstName, lastName, age, dateNaiss, passeportNum, genre, nationality } = p;

        if (!firstName || !lastName || !age || age <= 0) {
          throw new Error("Invalid passenger name or age");
        }
        if (!dateNaiss || new Date(dateNaiss) > new Date()) {
          throw new Error("Invalid date of birth for passenger");
        }
        if (!passeportNum) throw new Error("Passport number required");
        if (!genre) throw new Error("Gender required");
        if (!nationality) throw new Error("Nationality required");

        return {
          firstName,
          lastName,
          age,
          dateNaiss: new Date(dateNaiss),
          passeportNum,
          genre,
          nationality,
           
        };
      });

      const totalPrice = passengers.length*trip.prix;

      // 6️⃣ Créer la réservation
      const newReservation = await tx.reservation.create({
        data: {
          userId,
          tripId,
          passengers: {
            create: passengersData,
          },
          totalPrice
        },
        include: {
          passengers: true,
        },
      });

      await tx.trip.update({
        where : {id : tripId},
        data : {
          places : {
            decrement : passengers.length
          }
        }
      })

      return newReservation;
    });

    return res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error creating reservation",
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
                userId : userId,
                status: {
                  not : "ANNULEE"
                }
            },
            include : {
              trip : {
                include : {
                  destination : true
                }
              },
              user:  true,
              passengers : true
              
            }
        });
        

        return res.status(200).json({
            success : false,
            message : "User reservations got successfully",
            data : reservations
        });
    }catch(err){
        next(err);
    } 
    
}



export const userReservationsStats = async(req, res, next) => {

  try{

      const userId = req.params.id;

      const existingUser = await prisma.user.findUnique({
        where:  {
           id : userId
        }
      });

      if(!existingUser){
        return res.status(404).json({
          success : false,
          message : "Error user not found"
        });
      }

      const attenteReservations = await prisma.reservation.findMany({
        where : {
          userId,
          status : "EN_ATTENTE"
        }
      });

      const confirmedReservations = await prisma.reservation.findMany({
        where: {
          userId,
          status : "CONFIRMEE"
        }
      });


      return res.status(200).json({
        success : true,
        message : "user Stats got",
        data: {
          attenteReservations,
          confirmedReservations
        }
      });

    
  }catch(err){
    next(err);
  }
}



export const getReservationDetails = async(req, res, next) => {

  try{

      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where : {
          id : userId
        }
      });

      if(!user){
        return res.status(404).json({
          success : false,
          message : "Error user not found",

        });
      }

      const reservationId = req.params.id;

      const reservation = await prisma.reservation.findUnique({
        where : {
          userId,
          id : reservationId,

        },
        include: { 
          trip : {
            include : {
              destination : true,
              hotel : true
            }
          },
          user : true,
          passengers : true
        }
      });

      if(!reservation){
        return res.status(404).json({
          success: false,
          message : "Error reservation not found"
        })
      }

      return res.status(200).json({
        success: true,
        message: "Reservation got successfully",
        data : reservation
      });


  }catch(err){
    next(err);
  }
}



export const annulerReservation = async(req, res, next) => {

  try{

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id : userId
      }
    });

    if(!user){
      return res.status(404).json({
        success : false,
        message : "Error user not found"
      });
    }

    const id = req.params.id;

    const reservation = await prisma.reservation.findFirst({
      where : {
        id,
        userId,
      },
      include : {
        passengers: true
      }
    });

    if(!reservation){
      return res.status(404).json({
        success : false,
        message: "Error reservation not found"
      });
    }

    if(reservation.status === "ANNULEE"){
      return res.status(400).json({
        success : false,
        message : "Reservation already cancelled"
      });
    }

    await prisma.reservation.update({
      where: {
        id,
      },
      data : {
        status : "ANNULEE"
      }
    });

    await prisma.trip.update({
      where : {
        id : reservation.tripId
      },
      data: {
         places: {
          increment : reservation.passengers.length
         }
      }
    });

    return res.status(200).json({
      success : true,
      message : "Reservation a etait annule"
    });

  }catch(err){
    next(err);
  }
}