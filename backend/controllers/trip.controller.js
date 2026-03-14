import { date, success } from "zod";
import prisma from "../config/prisma.js"
import { tr } from "zod/v4/locales";


export const getTrips = async(req , res , next) => {

    try{

        const {city,country, duree, minPrice, maxPrice} = req.body;

            const where = {};

    if (city && city !== "") {
      where.destination = { city };
    }

    if (country && country !== "") {
      where.destination = {
        ...where.destination,
        country
      };
    }

    if (duree && Number(duree) > 0) {
      where.duree = {
        gte: Number(duree)
      };
    }

    if (minPrice || maxPrice) {
      where.prix = {};
     if(Number(maxPrice) > Number(minPrice)){
              if (minPrice) {
        where.prix.gte = Number(minPrice);
      }

      if (maxPrice) {
        where.prix.lte = Number(maxPrice);
      }
    }
    }

        const trips = await prisma.trip.findMany({
            where,
            include : {
                destination : true,
                hotel : true
            }
        });

       


        return res.status(200).json({
            success : true,
            message : "Trips fetched successfully",
            data : trips
        });
    }catch(err){
        next(err);
    }
}



export const getTrip = async(req , res, next) => {

  try{

     const {id} = req.params;

     const trip = await prisma.trip.findUnique({
      where : {
        id : id
      },
      include  : {
        destination : true,
        hotel: true
      }
     });

     if(!trip){
      return res.status(404).json({
        success : false,
        message :"Error trip not found",
        date : trip
      });
     }

     return res.status(200).json({
      success : true,
      message : "trip found",
      data : trip
     });

  }catch(err){
    next(err);
  }

}

