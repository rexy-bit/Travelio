import prisma from "../config/prisma.js"
import { cloudinary } from "../config/env.js";

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


export const searchDestination = async(req, res, next) => {

    try{

        const {search} = req.body;

        if(!search || search.trim() === ""){
            const allDestinations = await prisma.destination.findMany({
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
                message : "Search Result",
                data: allDestinations
            });

        }

        const regex = new RegExp(search, "i");

       const destinations = await prisma.destination.findMany({

      where: {
        OR: [

          { city: { contains: search, mode: "insensitive" } },
          { country: { contains: search, mode: "insensitive" } },
          { continent: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { bestSeason: { contains: search, mode: "insensitive" } },
          { currency: { contains: search, mode: "insensitive" } },
          { language: { contains: search, mode: "insensitive" } },
          { timeZone: { contains: search, mode: "insensitive" } },
          { travelTips: { 
            has : search
          } },

          {
            attractions: {
              has: search
            }
          },

          {
            activities: {
              has: search
            }
          }

        ]
      }

    });

    return res.status(200).json({
        success : true,
        message : "Search result",
        data : destinations
    });
    }catch(err){
        next(err);
    }
}



export const updateDestination = async(req, res, next) =>  {

    try{

        const destinationId = req.params.id;

        const destination = await prisma.destination.findUnique({
            where : {
                id : destinationId
            }
        });

        if(!destination){
            return res.status(404).json({
                success : false,
                message : "Error destination not found"
            });
        }

        const {city,
country,
continent,
        description,
        language,
        timeZone,
        bestSeason,
       averageTemperature,
       longitude,
        rating,
        latitude,
        currency,
         attractions,
         activities,
         travelTips} = req.body;


    

    const updates = {};

    if(!city || !country || !continent || !description ||!language || city.trim() === '' || country.trim() === ""
     || continent.trim() === "" || description.trim() === "" || language.trim() === '' || !currency || currency.trim() === ""){
        return res.status(400).json({
            success : false,
            message : "Please enter valid city or country or continent or description or language"
        });
     }

     updates.city = city;
     updates.continent = continent;
     updates.country = country;
     updates.description = description;
     updates.language = language;
     updates.currency = currency;

        if(!bestSeason || bestSeason === ''){
           return res.status(400).json({
            success : false,
            message :"Please enter valid bestSeason data"
           });
        }

        updates.bestSeason = bestSeason;

        if (latitude === undefined || isNaN(Number(latitude))) {
    return res.status(400).json({
        success: false,
        message: "Error invalid latitude"
    });
}

updates.latitude = Number(latitude);

        if(!timeZone || timeZone === ""        ){
            return res.status(400).json({
                success : false,
                message : "Error Invalid timeZone"
            });
        }
        updates.timeZone = timeZone;

        if(averageTemperature === undefined){
            return res.status(400).json({
                success : false,
                message : "Error invalid averageTemperature"
            });
        }
        updates.averageTemperature = Number(averageTemperature);

        if(longitude === undefined || isNaN(Number(longitude))){
            return res.status(400).json({
                success : false,
                message : "Error invalid longtitude"
            });
        }
        updates.longitude = Number(longitude);

         if(rating === undefined || isNaN(Number(rating)) || Number(rating) < 0){
            return res.status(400).json({
                success : false,
                message : "Error invalid rating"
            });
        }
        updates.rating = Number(rating);

updates.attractions = Array.isArray(attractions)
  ? attractions
  : attractions
    ? JSON.parse(attractions)
    : [];

    updates.travelTips = Array.isArray(travelTips)
  ? travelTips
  : travelTips
    ? JSON.parse(travelTips)
    : [];
        
     updates.activities = Array.isArray(activities)
  ? activities
  : activities
    ? JSON.parse(activities)
    : [];
         let finalImages = [];
      
      // Anciennes images si envoyées depuis le front
      if (req.body.oldImages) {
        try {
          finalImages = JSON.parse(req.body.oldImages);
        } catch (e) {
          console.error("oldImages parsing error:", e);
        }
      }
      
                      // Nouvelles images uploadées
                      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                      const uploadPromises = req.files.map((file) => {
                          return new Promise((resolve, reject) => {
                          const stream = cloudinary.uploader.upload_stream(
                              { folder: "Travelio" },
                              (error, result) => {
                              if (error) reject(error);
                              else resolve(result.secure_url);
                              }
                          );
                          stream.end(file.buffer);
                          });
                      });
      
                      const results = await Promise.all(uploadPromises);
                      finalImages = [...finalImages, ...results]; // ✅ concat anciennes + nouvelles
                      }
      
                      if(finalImages.length > 0){
                          updates.images = finalImages;
      
                      }
        

            const updatedDestination = await prisma.destination.update({
                where: {
                    id : destinationId
                },
                data : updates
            });

            if(!updatedDestination){
                return res.status(404).json({
                    success: false,
                    message : "Error in updating the destination"
                });
            }

            return res.status(200).json({
                success: true,
                message : "destination updated successfully",
                data: updatedDestination
            });
        
        }catch(err){
            next(err);
        }

     

}


export const addDestination = async(req, res, next) => {

    try{

      const {city,
country,
continent,
        description,
        language,
        timeZone,
        bestSeason,
       averageTemperature,
       longitude,
        rating,
        currency,
        latitude,
        activities,
         attractions,
         travelTips} = req.body;

         const addedDestination ={};


          if(!city || !country || !continent || !description ||!language || city.trim() === '' || country.trim() === ""
     || continent.trim() === "" || description.trim() === "" || language.trim() === '' || !currency || currency.trim() === ""){
        return res.status(400).json({
            success : false,
            message : "Please enter valid city or country or continent or description or language"
        });
     }

     addedDestination.city = city;
     addedDestination.continent = continent;
     addedDestination.country = country;
     addedDestination.description = description;
     addedDestination.language = language;
     addedDestination.currency = currency;

        if(!bestSeason || bestSeason === ''){
           return res.status(400).json({
            success : false,
            message :"Please enter valid bestSeason data"
           });
        }

        addedDestination.bestSeason = bestSeason;

        if(!timeZone || timeZone === ""        ){
            return res.status(400).json({
                success : false,
                message : "Error Invalid timeZone"
            });
        }
        addedDestination.timeZone = timeZone;

        if(averageTemperature === undefined){
            return res.status(400).json({
                success : false,
                message : "Error invalid averageTemperature"
            });
        }
        addedDestination.averageTemperature = Number(averageTemperature);

        if (latitude === undefined || isNaN(Number(latitude))) {
    return res.status(400).json({
        success: false,
        message: "Error invalid latitude"
    });
}

addedDestination.latitude = Number(latitude);

        if(longitude === undefined || isNaN(Number(longitude))){
            return res.status(400).json({
                success : false,
                message : "Error invalid longtitude"
            });
        }
        addedDestination.longitude = Number(longitude);

         if(rating === undefined || isNaN(Number(rating)) || Number(rating) < 0){
            return res.status(400).json({
                success : false,
                message : "Error invalid rating"
            });
        }
        addedDestination.rating = Number(rating);

addedDestination.attractions = Array.isArray(attractions)
  ? attractions
  : attractions
    ? JSON.parse(attractions)
    : [];

    addedDestination.travelTips = Array.isArray(travelTips)
  ? travelTips
  : travelTips
    ? JSON.parse(travelTips)
    : [];

    addedDestination.activities = Array.isArray(activities)
  ? activities
  : activities
    ? JSON.parse(activities)
    : [];

        
         let finalImages = [];
      
      // Anciennes images si envoyées depuis le front
      if (req.body.oldImages) {
        try {
          finalImages = JSON.parse(req.body.oldImages);
        } catch (e) {
          console.error("oldImages parsing error:", e);
        }
      }
      
                      // Nouvelles images uploadées
                      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                      const uploadPromises = req.files.map((file) => {
                          return new Promise((resolve, reject) => {
                          const stream = cloudinary.uploader.upload_stream(
                              { folder: "Travelio" },
                              (error, result) => {
                              if (error) reject(error);
                              else resolve(result.secure_url);
                              }
                          );
                          stream.end(file.buffer);
                          });
                      });
      
                      const results = await Promise.all(uploadPromises);
                      finalImages = [...finalImages, ...results]; // ✅ concat anciennes + nouvelles
                      }
      
                      if(finalImages.length > 0){
                          addedDestination.images = finalImages;
      
                      }

        const newDestination = await prisma.destination.create({
            data : addedDestination
        });

 

        return res.status(201).json({
            success : true,
            message : "Destination created successfully",
            data : newDestination
        });
    }catch(err){
        next(err);
    }
}