import { memo } from "react"
import type { Reservation } from "../../Contexts/Types";



const SectionHotel = ({reservation} : {reservation : Reservation}) => {

    return(

        <div className="bg-white p-4 rounded-[10px] shadow-2xl w-[400px] max-[450px]:w-[320px]">
            <h3 className="text-[1.2em] font-bold underline">Hôtel <i className="fa-solid fa-hotel ml-2"></i></h3>

  <p className="mt-2 text-[17px] font-[600]">{reservation.trip?.hotel.nom}</p>
  <p>⭐ {reservation.trip?.hotel.etoiles} étoiles</p>
          <div className="flex flex-col mt-3">
            <h1 className="text-[17px] font-[500]">Avantages:</h1>
             <div className="mt-1">
                {reservation.trip?.hotel.pointsPositifs.map((a)=>{
                    return(
                        <p className="text-[15px]" key={a}>- {a}</p>
                    )
                })}
             </div>
          </div>
        </div>
    )

}

export default memo(SectionHotel);