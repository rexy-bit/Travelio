import { memo, useState } from "react"
import type { Reservation } from "../../Contexts/Types";
import { motion, AnimatePresence } from "framer-motion";

const SectionDestination = ({reservation} : {reservation : Reservation}) => {

    const [showDescription, setShowDescription] = useState<boolean>(false);
    return(
        <div className="w-[400px] max-[450px]:w-[320px] p-3 flex flex-col bg-white shadow-2xl rounded-[10px]">
             <h2 className="text-[1.2em] font-bold underline">Infos Destination <i className="fa-solid fa-map-location-dot ml-1"></i></h2>


              <div 
              onClick={()=>setShowDescription(prev => !prev)}
              className="flex flex-row cursor-pointer mt-4 items-center justify-between bg-gray-200  px-2 py-2 items-center">

                <p className="text-[16px] font-[500]">Description</p>
                   <motion.p
          animate={{ rotate: showDescription ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[1.3em] font-bold"
        >
          +
        </motion.p>

                
              </div>

              <AnimatePresence>
  {showDescription && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-200 p-3 text-[15px] overflow-hidden"
    >
      {reservation.trip?.destination.description}
    </motion.div>
  )}
</AnimatePresence>
               
               <div className="flex flex-col mt-5 gap-1">
                <p>🌍 Continent: {reservation?.trip?.destination.continent}</p>
                <p>⭐ Rating: {reservation?.trip?.destination.rating}</p>
                <p>🌡 Température moyenne: {reservation?.trip?.destination.averageTemperature}°C</p>
                </div>
        </div>
    )
}

export default memo(SectionDestination);