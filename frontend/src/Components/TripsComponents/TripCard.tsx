import { memo } from "react"
import { motion } from "framer-motion"
import type { Trip } from "../../Contexts/Types";
import StarsRating from "./StarsRating";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit:   { opacity: 0, scale: 0.85, transition: { duration: 0.2 } }
};

const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <motion.div
         variants={cardVariants}
      initial="hidden"    // ← ajouter explicitement
      animate="show"      // ← ajouter explicitement
      exit="exit"
      whileHover={{ y: -6, boxShadow: "0 25px 40px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.97 }}
      className="w-[300px] bg-white rounded-[10px] shadow-2xl cursor-pointer"
    >
      <img
        src={trip.destination.images[2]}
        className="w-full rounded-t-[10px] h-[250px] object-cover"
        alt=""
      />
      <div className="p-3 flex flex-col">
        <div className="flex flex-row items-center gap-3">
          <p className="text-[14px] text-gray-700">Hôtel</p>
          <StarsRating note={trip.hotel.etoiles} />
        </div>
        <div className="font-bold">
          {trip.title}
        </div>
        <div className="text-gray-700 text-[15px]">
          {trip.destination.city} - {trip.destination.country}
        </div>
        <div className="flex flex-row w-full items-center justify-between mt-2">
          <div></div>
          <div>
            <span className="text-gray-700 text-[15px]">À partir de</span>{" "}
            <span className="text-[19px] font-bold">{trip.prix}&euro;</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(TripCard);