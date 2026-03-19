import  { memo } from "react"
import type { Reservation } from "../../Contexts/Types";



const SectionVoyage = ({reservation} : {reservation : Reservation | null}) => {


     function afficherDateFR(dateISO: Date): string  {
  return new Date(dateISO).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
    return(
        <div className="bg-white p-4 rounded-[10px] shadow-2xl w-[400px] max-[450px]:w-[320px]">
           <h1 className="text-[1.2em] font-bold underline">Infos Voyage <i className="fa-brands fa-readme ml-2 text-[1.2em]"></i>:</h1>
           <div className="flex flex-col mt-3">
            <div className="flex flex-col">
            <h2 className="text-[1.1em] font-[600]">{reservation?.trip?.title}</h2>
            <p className="text-[17px] font-[500]">
                {reservation?.trip?.destination.city} - {reservation?.trip?.destination.country}
            </p>
            </div>

            <div className="flex flex-row justify-between w-full items-center mt-4">
                <p className="font-[500] text-[15px]">Date de départ <i className="fa-solid fa-plane-departure ml-2"></i>:</p>
                <p>{afficherDateFR(reservation?.trip?.aller)}</p>

            </div>

            <div className="flex flex-row justify-between w-full items-center mt-2">
                <p className="font-[500] text-[15px]">Date de retour <i className="fa-solid fa-plane-arrival ml-2"></i>:</p>
                <p>{afficherDateFR(reservation?.trip?.retour)}</p>
                
            </div>

            <div className="flex flex-row justify-between items-center mt-5">
                <p className="text-[17px] font-[600]">Durée du voyage:</p>
                <p className="font-bold">{reservation?.trip?.duree} J</p>
            </div>
           </div>
        </div>
    )
}

export default memo(SectionVoyage);