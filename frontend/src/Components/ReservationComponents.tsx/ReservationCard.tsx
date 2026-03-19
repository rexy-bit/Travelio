
import  { memo } from "react"
import type { Reservation } from "../../Contexts/Types";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";


const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const ReservationCard = ({reservation} : {reservation :  Reservation}) => {

     function afficherDateFR(dateISO: Date): string {
  return new Date(dateISO).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

     const navigate = useNavigate();

    return(
        <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
      className="w-[340px] bg-white rounded-[10px] ">

            <img src={reservation.trip?.destination.images[0]} className="w-full h-[200px] object-cover rounded-t-[10px]" alt="" />
            <div className="flex flex-col gap-1  p-3 w-full">
                <div className="flex flex-row items-center gap-2">
                    <p className="font-bold text-[16px]">{reservation.trip?.title}</p>

                    <p className="font-[500]">{reservation.trip?.destination.city} - {reservation.trip?.destination.country}</p>
                </div>

                <div className="mt-2 flex flex-row justify-between">
                    <p className="text-[15px] font-bold">Date de reservation:</p>
                    <p className="font-[500]">{afficherDateFR(reservation.createdAt)}</p>

                    
                </div>

                <div className=" flex flex-row justify-between">
                    <p className="text-[15px] font-bold">Nombres de passagers:</p>
                    <p className="font-[500]">{reservation.passengers.length}</p>
                </div>

                <div className=" flex flex-row justify-between">
                    <p className="text-[15px] font-bold">Prix Total:</p>
                    <p className="font-[500]">{reservation.totalPrice} €</p>
                </div>

                <div className=" flex flex-row justify-between">
                    <p className="text-[15px] font-bold">Statut:</p>
                    <p className="font-[500]">{reservation.status}</p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center mt-2 gap-5 pb-5">
                <button
                onClick={()=>navigate(`/reservationDetails/${reservation.id}`)}
                className="bg-green-800/80 text-white w-[120px] rounded-[10px] font-[500] py-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-[15px]">
                    <i className="fa-solid fa-eye"></i> Voir détails
                </button>

                <button className="bg-red-800/80 text-white w-[120px] rounded-[10px] font-[500] py-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-[15px]">
                    <i className="fa-solid fa-ban"></i> Annuler
                </button>
            </div>
        </motion.div>
    )
}

export default memo(ReservationCard);