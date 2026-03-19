import { memo } from "react"
import { useReservationsContext } from "../../Contexts/ReservationsContext";
import { useTripsContext } from "../../Contexts/TripsContext";
import { useAuthContext } from "../../Contexts/AuthContext";


const Resume = () => {


    const {passagers, addReservation, loadingAddReservation} = useReservationsContext();
    const {tripDetail} = useTripsContext();

    const {user} = useAuthContext();
    return(

        <div className="flex flex-col w-[300px] p-4 bg-white shadow-2xl rounded-[10px]"> 
            <h2 className="font-bold text-[1.3em] underline">Résumé</h2>

            <div className="flex flex-col w-full gap-2 mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[15px] font-bold">Nombre de Passagers:</p>
                     <p className="text-[17px]">{passagers.length}</p>
                </div>

                <div className="flex flex-row justify-between items-center border-t border-gray-300 pt-2">
                    <p className="text-[15px] font-bold">Prix par personne</p>
                    <p>{tripDetail?.prix} €</p>
                </div>

                <div className="flex flex-row justify-between items-center border-t border-gray-300 pt-4">
                    <p className="text-[18px] font-bold">Total:</p>
                    <p className="text-[17px]">{passagers.length*tripDetail!.prix} €</p>
                </div>

                <div className="flex justify-center text-center leading-5 items-center mt-2 text-[14px] text-gray-800">
                    Le règlement de votre réservation s’effectuera en personne au sein de notre agence, où notre équipe se fera un plaisir de vous accueillir et de finaliser votre paiement dans les meilleures conditions.
                </div>

                <button
                onClick={()=>addReservation(user!.id, tripDetail!.id, passagers)}
                className="bg-[#1B4332] text-white mt-4 rounded-[5px] py-2 font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                    {loadingAddReservation ? <i className="fa-solid fa-arrow-rotate-right fa-spin"></i> : "Confirmer la réservation"}
                </button>
            </div>
        </div>
    )
}


export default memo(Resume);