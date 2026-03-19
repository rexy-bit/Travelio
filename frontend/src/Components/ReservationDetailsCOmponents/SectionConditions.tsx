import  { memo } from "react"
import type { Reservation } from "../../Contexts/Types";


const SectionConditions = ({reservation} : {reservation: Reservation}) => {

    return(
        <div className="w-[400px] max-[450px]:w-[320px] p-3 flex flex-col bg-white shadow-2xl rounded-[10px]">
           <h3 className="text-[1.2em] font-bold underline">Conditions <i className="fa-solid fa-gavel"></i></h3>

  <div className="flex flex-col gap-1 mt-3 text-[15px]">
  {reservation.trip?.conditionsVoyage.map((c, i) => (
    <p key={i}>• {c}</p>
  ))}
  </div>
        </div>
    )
}


export default memo(SectionConditions);