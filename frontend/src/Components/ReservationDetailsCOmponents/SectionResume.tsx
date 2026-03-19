import  { memo, useState } from "react"
import type { Reservation } from "../../Contexts/Types";
import CancelPop from "./CancelPop";


const SectionResume = ({reservation} : {reservation : Reservation}) => {


    const [showPop, setShowPop] = useState<boolean>(false);

    return(
        <>
        <div className="bg-white p-3 rounded-[10px] w-[400px] max-[450px]:w-[320px]">

            <h1 className="text-[1.3em] font-bold ">Résumé</h1>

            <div className="flex flex-col w-full gap-2 mt-5">
                 <div className="flex flex-row justify-between items-center">
                    <p className="text-[15px] font-bold">Nombre de Passagers:</p>
                     <p className="text-[17px]">{reservation?.passengers.length}</p>
                </div>

                <div className="flex flex-row justify-between items-center border-t border-gray-300 pt-2">
                    <p className="text-[15px] font-bold">Prix par personne</p>
                    <p>{reservation.trip?.prix} €</p>
                </div>

                <div className="flex flex-row justify-between items-center border-t border-gray-300 pt-4">
                    <p className="text-[18px] font-bold">Total:</p>
                    <p className="text-[17px]">{reservation.totalPrice} €</p>
                </div>
 
                  <button onClick={()=>setShowPop(true)} className="w-full mt-4 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 bg-red-700/80 text-[15px] font-bold text-white py-2 rounded-lg mb-5 ">
                        Annuler la reservation
                    </button>
            </div>

              
        </div>
  
  {showPop && <CancelPop reservationId={reservation.id} setShowPop={setShowPop}/>}

        </>
    )
}

export default memo(SectionResume);