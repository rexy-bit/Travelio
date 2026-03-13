import prisma from "../config/prisma.js"


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

