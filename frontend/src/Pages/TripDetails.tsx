import { memo, useEffect, useState } from "react"
import { useTripsContext } from "../Contexts/TripsContext";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import {motion} from "framer-motion"
import { tr } from "framer-motion/m";
import StarsRating from "../Components/TripsComponents/StarsRating";
import DestinationCard from "../Components/DestinationsComponents/DestinationCard";

const TripDetails = () => {

    const {loadingTripDetail, tripDetail, getTrip} = useTripsContext();

    const [openIndex, setOpenIndex] = useState<boolean>(false);

    const {id} = useParams();
    const navigate = useNavigate();

   function afficherDateFR(dateISO: Date): string {
  return new Date(dateISO).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

    useEffect(()=>{
        getTrip(id);
    }, [id]);

    return(
        <section className="min-h-screen flex flex-col items-center bg-gray-200">

            
              {
                loadingTripDetail ?
                  <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center gap-2 mt-15"
            >
              <i className="fa-solid fa-plane fa-spin text-[1.3em]"></i>
              <p className="text-[16px] font-[500]">Chargement des Voyages</p>
            </motion.div>
            : 
              !tripDetail 
                ?
                 <div className="font-bold text-[1.2em] mt-10 text-center">Erreure destination non trouvé</div>
                 : 
                  <>
                    <div className="bg-green-700/70 py-20 flex flex-row justify-between max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:gap-20 max-[1000px]:justify-center  px-20 max-[1200px]:px-10 items-center w-full">
                        <div className="flex flex-col gap-3 max-[1000px]:items-center">
                        <h1 className="text-white text-[2.7em] font-black max-[1100px]:text-[2.2em] max-[1000px]:text-center">{tripDetail.title}</h1>
                          <div className="flex flex-row  items-center gap-3 text-white text-[20px] font-[600] max-[600px]:text-[17px]">
                            <div>
                            {afficherDateFR(tripDetail.aller)} 
                            </div>
                            <div>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>

                            <div>
                                {afficherDateFR(tripDetail.retour)}
                            </div>
                          </div>

                          <div className="text-white text-[1.5em] font-black mt-5">À partir de {tripDetail.prix}&euro;</div>
                        </div>

                        <img src={tripDetail.destination.images[0]} className="w-[500px] max-[1200px]:w-[400px] max-[500px]:w-[300px]" alt="" />

                    </div>

                    <div className="flex flex-col justify-center items-center bg-gray-300 py-20 w-full">
                        <h1 className="text-[1.8em] font-bold ">À propos du Voyage</h1>

                        <div className="flex flex-row justify-center items-center gap-20 mt-10 max-[1200px]:gap-10 max-[900px]:flex-col">
                            <div className="w-[400px] text-[18px] leading-7 max-[900px]:text-center">
                                {tripDetail.description}
                            </div>
                            <img src={tripDetail.destination.images[1]} 
                            className="w-[400px] max-[450px]:w-[300px]"
                            alt="" />
                        </div>

                        <button
                        onClick={()=>navigate(`/destination/${tripDetail.destination.id}`)}
                        className="mt-10 bg-[#1B4332] text-white px-5 h-[40px] font-bold text-[15px] rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                            Plus de Details à propos de la destination
                        </button>

                        <div className="bg-white p-5 w-[500px] mt-15 rounded-[5px] shadow-2xl max-[600px]:w-[400px] max-[450px]:w-[300px]">
                            <h1 className="font-bold text-[1.4em] underline">Conditions de voyage</h1>

                            <ul className="mt-5 flex flex-col gap-2">
                                {tripDetail.conditionsVoyage.map((c, i)=>{
                                    return(
                                        <li key={i} className="text-[17px]">- {c}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="bg-white p-5 w-[500px] mt-15 rounded-[5px] shadow-2xl max-[600px]:w-[400px] max-[450px]:w-[300px]">
                            <h1 className="font-bold text-[1.6em] underline">Hotel</h1>

                            <div className="flex flex-row items-center gap-2 mt-5">
                                <h1 className="text-[20px] font-bold">{tripDetail.hotel.nom}</h1>
                                <StarsRating note={tripDetail.hotel.etoiles}/>
                            </div>

                              <h2 className="text-[18px] font-bold mt-5">Pourquoi cet Hotel ?</h2>
                             <ul className="mt-3 flex flex-col gap-2">
                                {tripDetail.hotel.pointsPositifs.map((c, i)=>{
                                    return(
                                        <li key={i} className="text-[17px]">- {c}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="bg-white p-5 w-[500px] mt-15 rounded-[5px] shadow-2xl max-[600px]:w-[400px] max-[450px]:w-[300px]">
                            <h2 className="font-bold text-[1.6em] underline">Résume</h2>

                            <div className="mt-5 flex flex-col gap-2">
                                <p className="text-[17px]">Prix : <strong>{tripDetail.prix} &euro;</strong>/personne</p>
                                <p className="text-[17px]">Duree : <strong>{tripDetail.duree}</strong> Jours</p>
                                <p className="text-[17px]">Places Restantes : <strong>{tripDetail.places}</strong></p>
                            </div>
                        </div>

                          <img src={tripDetail.destination.images[2]} className="w-[500px] mt-10 max-[550px]:w-[300px]" alt="" />
                         <div className=" bg-white w-[500px] rounded-[10px] shadow-2xl max-[550px]:w-[400px] max-[450px]:w-[300px] mt-10">
              <button
                className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                onClick={() => setOpenIndex(prev => !prev)}
              >
                Plus de Détails concernant la ville
                <span className="text-[2em] font-light cursor-pointer">{openIndex ? "−" : "+"}</span>
              </button>
               <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex ? "max-h-170 px-4 pb-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{tripDetail.destination.description}</p>
            </div>
            </div>
                    </div>
                  </>

              }
          
        </section>
    )
}


export default memo(TripDetails);