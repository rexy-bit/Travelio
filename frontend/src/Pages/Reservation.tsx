import  { memo, useEffect } from "react"
import { useTripsContext } from "../Contexts/TripsContext";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuthContext } from "../Contexts/AuthContext";
import InfosVoyage from "../Components/ReservationComponents.tsx/InfosVoyage";
import InfoPassagers from "../Components/ReservationComponents.tsx/InfoPassagers";
import Resume from "../Components/ReservationComponents.tsx/Resume";




const Reservation = () => {


    const {tripDetail, getTrip} = useTripsContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();


    const {id} = useParams();
     
    useEffect(()=>{
        getTrip(id);
    }, [id]);



    return(
         <section className="flex flex-col min-h-screen items-center w-full bg-gray-200">
           
             {!user ? 
                 
                 <>
                   <h1 className="font-bold mt-15 text-[1.4em] px-5 text-center">Réservez votre voyage en toute sérénité</h1>

                 
                  <p className="text-[17px] w-[600px] mt-5 text-center text-gray-800">
                    En créant votre compte, vous bénéficiez d’un accès instantané à toutes nos destinations et offres spéciales.  
                    Vous pourrez gérer vos réservations facilement, recevoir des recommandations personnalisées et profiter d’avantages réservés à nos membres.  
                    Ne laissez plus vos rêves de voyage attendre : inscrivez-vous maintenant et commencez votre aventure !
                    </p>
                    <button
                     onClick={()=>navigate("/profile")}
                    className="bg-green-800/90 px-5 py-2 text-[15px] text-white font-bold rounded-[5px] cursor-pointer mt-5 transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >S’inscrire gratuitement</button>
                 </>
                 : 
                  !tripDetail ?
                    <div className="font-bold text-[1.2em] mt-10 text-center">Erreure destination non trouvé</div>
                   : 
                   <>
                    <h1 className="text-[1.1em] font-bold text-[1.8em] mt-10 max-[450px]:mt-15">Reservation </h1>

                    <p className="text-center w-[400px] max-[450px]:w-[350px] mt-5 text-[17px]">
                        Vous êtes sur le point de réserver votre voyage. Vérifiez les détails de votre destination, sélectionnez le nombre de passagers et assurez-vous que tout est correct avant de confirmer. Nous vous accompagnons à chaque étape pour rendre votre réservation simple, rapide et sécurisée. Préparez-vous à vivre une expérience inoubliable !
                    </p>
                    <p className="text-gray-700 text-sm text-[15px] mt-6">
  Réservez en toute sérénité avec nos garanties.
</p>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm bg-white p-3 rounded-[10px]">
                        <div>🔐 Paiement sécurisé</div>
                        <div>📞 Support 7j/7</div>
                        <div>❌ Annulation gratuite</div>
                        <div>⚡ Réservation rapide</div>
                        </div>
                     <div className="w-full flex flex-row items-baseline gap-10 max-[800px]:gap-5 max-[760px]:flex-col max-[760px]:gap-15 max-[760px]:items-center justify-center mt-15 mb-10">
                        <div className="flex flex-col gap-5 border-r border-r-gray-400 pr-5 order-1 max-[760px]:border-none max-[760px]:pr-0 max-[760px]:order-2">
                           <InfosVoyage/>
                           <InfoPassagers/>
                        </div>
                        <div className="order-2 max-[760px]:order-1">
                            <Resume/>
                        </div>
                     </div>
                   </>
            }

              <button
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(-1)}
        className="absolute top-19 left-5 bg-[#1B4332] text-white w-[90px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 h-[35px] text-[15px] font-[600] rounded-full"
      >
        <i className="fa-solid fa-left-long"></i> Back
      </button>
         </section>
    );
}


export default memo(Reservation);