import  { memo } from "react"
import type { Trip } from "../../Contexts/Types";
import StarsRating from "./StarsRating";


const TripCard = ({trip} : {trip : Trip}) => {


    return(
        <div className="w-[300px] bg-white rounded-[10px] shadow-2xl">
           <img src={trip.destination.images[2]} className="w-full rounded-t-[10px] h-[250px] object-cover" alt="" />
           <div className="p-3 flex flex-col">
           <div className="flex flex-row  items-center gap-3">
            <p className="text-[14px] text-gray-700">Hôtel</p>
            <StarsRating note={trip.hotel.etoiles}/>
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
              <span className="text-gray-700 text-[15px]">À partir de</span> <span className="text-[19px] font-bold">{trip.prix}&euro;</span>
           </div>
           </div>
           </div>
        </div>
    )

}


export default memo(TripCard);