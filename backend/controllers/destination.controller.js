import { success } from "zod";
import prisma from "../config/prisma.js"


export const getDestinations = async(req , res , next) => {

    try{

       const destinations = await prisma.destination.findMany({
  select: {
    id: true,
    city: true,
    country: true,
    continent: true,
    latitude: true,
    longitude: true,
    description: true,
    bestSeason: true,
    currency: true,
    language: true,
    timeZone: true,
    rating: true,
    averageTemperature: true,
    attractions: true,
    activities: true,
    travelTips: true,
    images: true,
    createdAt: true,
    updatedAt: true
  }
});

        return res.status(200).json({
            success : true,
            message : "Destinations fetched successfully",
            data : destinations
        });

    }catch(err){
        next(err);
    }
}


export const getDestination = async(req , res, next) => {

    try{

        const {id} = req.params;

        const destination = await prisma.destination.findUnique({
            where : {
                id : id
            }
        });

        if(!destination){
            return res.status(400).json({
                success : false,
                message : "Error Destination not found"
            });
        }

        return res.status(200).json({
            success : true,
            message : "Destination got",
            data : destination
        });
    }catch(err){
        next(err);
    }
}


export const getUniqueCitiesAndCountries = async(req, res, next) => {

    try{

        const destinations = await prisma.destination.findMany({
            select : {
                city : true,
                country : true
            }
        });

        const cities = [...new Set(destinations.map(d => d.city))];
        const countries = [...new Set(destinations.map(d => d.country))];

        return res.status(200).json({
            success : true,
            data : {
                cities,
                countries
            }
        });
    }catch(err)
    {
           next(err);
    }
}