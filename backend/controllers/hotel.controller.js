import prisma from "../config/prisma.js";


export const addHotel = async(req , res, next) =>  {

    try{

        const {nom, etoiles, pointsPositifs, destinationId} = req.body;

        const newHotel = {};

        if(!nom || nom.trim() === ""){
            return res.status(400).json({
              success : false,
              message : "Error please provide valid hotel nom"
            });
        }

        newHotel.nom = nom;

        if(isNaN(etoiles) || etoiles === undefined || Number(etoiles) < 1 || Number(etoiles) > 5){
            return res.status(400).json({
                success : false,
                message :"Veuiller entrez un nombre d'etoiles valide entre 1 et 5"
            })
        }
        newHotel.etoiles = Number(etoiles);

         newHotel.pointsPositifs = Array.isArray(pointsPositifs)
  ? pointsPositifs
  : pointsPositifs
    ? JSON.parse(pointsPositifs)
    : [];

    if(!destinationId){
        return res.status(400).json({
            success : false,
            message: "Provide a destination Id",

        });
    }
       const existingDestination = await prisma.destination.findUnique({
        where: {
            id : destinationId
        }
       });

       if(!existingDestination){
        return res.status(404).json({
            success : false,
            message: "Error destination id  not found",

        });
       }

       newHotel.destinationId = destinationId;

       const hotel = await prisma.hotel.create({
          data : newHotel
       });

       return res.status(201).json({
        success : true,
        message : "Hotel created successfully",
        data : hotel
       });

    }catch(err){
        next(err);
    }
}


export const getHotels = async (req, res, next) => {
  try {
    const { name, city } = req.body;

    const where = {};

    // Filtrer par nom de l'hôtel
    if (name && name.trim() !== "") {
      where.nom = { contains: name, mode: "insensitive" }; // recherche partielle, insensible à la casse
    }

    // Filtrer par ville de la destination
    if (city && city.trim() !== "") {
      where.destination = {
        is: { city: { contains: city, mode: "insensitive" } } // "is" pour les relations 1:1
      };
    }

    const hotels = await prisma.hotel.findMany({
      include: {
        destination: true, // pour récupérer les infos de la destination
      },
      where,
    });

    return res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
      data: hotels,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async(req , res, next) => {

    try{

        const hotelId = req.params.id;

        const hotel = await prisma.hotel.findUnique({
            where: {
                id : hotelId
            }
        });

        if(!hotel){
            return res.status(404).json({
                success: false,
                message : "Error hotel not found"
            });
        }

        await prisma.hotel.delete({
            where : {
                id : hotelId
            }
        });

        return res.status(200).json({
            success : true,
            message : "Hotel deleted successfully"
        });
    }catch(err){
        next(err);
    }
}


export const updateHotel = async(req, res, next ) => {

    try{

        const hotelId = req.params.id;

        const existingHotel = await prisma.hotel.findUnique({
            where: {
                id : hotelId
            }
        });

        if(!existingHotel){
            return res.status(404).json({
                success : false,
                message : "Error hotel not found"
            })
        }

        const {nom, etoiles, pointsPositifs, destinationId} = req.body;

        const updates = {};

        if(!nom || nom.trim() === ""){
            return res.status(400).json({
              success : false,
              message : "Error please provide valid hotel nom"
            });
        }

        updates.nom = nom;

        if(isNaN(etoiles) || etoiles === undefined || Number(etoiles) < 1 || Number(etoiles) > 5){
            return res.status(400).json({
                success : false,
                message :"Veuiller entrez un nombre d'etoiles valide entre 1 et 5"
            })
        }
        updates.etoiles = Number(etoiles);

         updates.pointsPositifs = Array.isArray(pointsPositifs)
  ? pointsPositifs
  : pointsPositifs
    ? JSON.parse(pointsPositifs)
    : [];

    if(!destinationId){
        return res.status(400).json({
            success : false,
            message: "Provide a destination Id",

        });
    }
       const existingDestination = await prisma.destination.findUnique({
        where: {
            id : destinationId
        }
       });

       if(!existingDestination){
        return res.status(404).json({
            success : false,
            message: "Error destination id  not found",
        });
       }

       updates.destinationId = destinationId;
         
       const updatedHotel = await prisma.hotel.update({
        where: {
            id : hotelId
        },
        data : updates
       });

       if(!updatedHotel){
        return res.status(404).json({
            success : false,
            message :"Error in updating hotel"
        });
       }

       return res.status(200).json({
        success : true,
        message : "Hotel updated successfully",
        data : updatedHotel
       });

    }catch(err){
        next(err);
    }
}