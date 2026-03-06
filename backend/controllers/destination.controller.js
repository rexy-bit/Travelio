import prisma from "../config/prisma.js"


export const getDestinations = async(req , res , next) => {

    try{

        const destinations = await prisma.destination.findMany();

        return res.status(200).json({
            success : true,
            message : "Destination fetched successfully",
            data : destinations
        });

    }catch(err){
        next(err);
    }
}

