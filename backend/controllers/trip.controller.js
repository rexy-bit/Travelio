import prisma from "../config/prisma.js"



export const getTrips = async(req , res , next) => {

    try{

        const trips = await prisma.destination.findMany();

        return res.status(200).json({
            success : true,
            message : "Trips fetched successfully",
            data : trips
        });
    }catch(err){
        next(err);
    }
}