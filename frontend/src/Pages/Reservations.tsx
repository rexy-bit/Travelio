import { memo } from "react"
import { useReservationsContext } from "../Contexts/ReservationsContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ReservationCard from "../Components/ReservationComponents.tsx/ReservationCard";


const Reservations = () => {

    const {userReservations, attenteReservations, confirmedReservations} = useReservationsContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    return(
        <section className="flex flex-col min-h-screen items-center bg-gray-200">
            

              {
              !user ?
                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-10 font-bold text-2xl px-5 text-center">Accédez à vos réservations</h1>

                    <p className="w-[400px] max-[450px]:w-[320px] mt-5 text-gray-700 text-[17px] text-center">
                         Connectez-vous pour consulter, gérer et suivre vos réservations de voyages en toute simplicité.
      Vous pourrez également modifier vos informations, suivre vos passagers et accéder à votre historique complet.
                    </p>

                    <div className="bg-white p-4 shadow-2xl mt-5 rounded-xl flex flex-col gap-2 font-[500]">
                              <p>✅ Voir toutes vos réservations</p>
                                <p>✅ Gérer vos passagers</p>
                                <p>✅ Modifier ou annuler une réservation</p>
                                <p>✅ Accéder à votre historique de voyages</p>
                    </div>

                    <button
                    onClick={()=>navigate("/profile")}
                    className="bg-green-800/90 px-5 py-2 text-[15px] text-white font-bold rounded-[5px] cursor-pointer mt-5 transition-opacity duration-200 hover:opacity-80 active:opacity-60 ">
                        Se connecter
                    </button>

                    <p 
                    className="text-sm text-gray-800 text-center mt-4 underline cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                     onClick={()=>navigate("/profile")}>
      Vous n’avez pas de compte ? Inscrivez-vous en quelques secondes.
    </p>

                </div>
                :
              userReservations.length === 0 ?
                 <div className="flex flex-col justify-center items-center">
                                          <h1 className="mt-10 font-bold text-2xl px-5 text-center">
                                            Aucune réservation pour le moment
                                          </h1>

                    <p className="w-[400px] max-[450px]:w-[320px] mt-5 text-gray-700 text-[17px] text-center">
                         Vous n’avez pas encore effectué de réservation. Découvrez nos voyages disponibles et commencez à planifier votre prochaine aventure dès maintenant.
                    </p>

                    <div className="bg-white p-4 shadow-2xl mt-5 rounded-xl flex flex-col gap-2 font-[500]">
                              <p>✈️ Découvrez des destinations variées</p>
      <p>💺 Réservez en quelques clics</p>
      <p>🔐 Paiement sécurisé</p>
      <p>❌ Annulation flexible selon les offres</p>
                    </div>

                    <button
                    onClick={()=>navigate("/trips")}
                    className="bg-green-800/90 px-5 py-2 text-[15px] text-white font-bold rounded-[5px] cursor-pointer mt-5 transition-opacity duration-200 hover:opacity-80 active:opacity-60 ">
                        Explorer les voyages
                    </button>

                    <p 
                    className="text-sm text-gray-800 text-center mt-4 underline cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                     onClick={()=>navigate("/trips")}>
      Commencez dès maintenant et trouvez le voyage qui vous correspond.
    </p>

                 </div>
                 : 
                 <div className="flex flex-col items-center mt-15">
                     <h1 className="text-[1.5em] font-bold">Mes reservations</h1>
                     <p className="text-[17px] mt-5 text-gray-800 text-center">
                        Consultez et gérez l’ensemble de vos réservations de voyages.
                     </p>

                     <div className="flex flex-col gap-4 mt-8">

                        <div className="flex flex-row items-center justify-between  w-[150px] bg-white p-3 rounded-lg font-bold">
                            <p className="text-[15px]">Total:</p>
                            <p>{userReservations.length}</p>
                        </div>

                        <div className="flex flex-row items-center justify-between  w-[150px] bg-white p-3 rounded-lg font-bold">
                            <p className="text-[15px]">En attente:</p>
                            <p>{attenteReservations.length}</p>
                        </div>

                        <div className="flex flex-row items-center justify-between  w-[150px] bg-white p-3 rounded-lg font-bold">
                            <p className="text-[15px]">Confirmées</p>
                            <p>{confirmedReservations.length}</p>
                        </div>
                     </div>

                     <div className="flex flex-row items-center gap-5 mt-10 mb-15">
                        {userReservations.map((r)=>{
                            return(
                                <ReservationCard
                                reservation={r}
                                key={r.id}
                                />
                            )
                        })}
                     </div>
                 </div>
              }
        </section>
    )
}

export default memo(Reservations);