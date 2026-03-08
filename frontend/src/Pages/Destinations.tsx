import  { memo } from "react"
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import DestinationCard from "../Components/DestinationsComponents/DestinationCard";


const Destinations = () => {

    const {destinations} = useDestinationsContext();

    return(
        <section className="w-full flex flex-col min-h-screen items-center bg-gray-200">
             
             <h1 className="mt-10 text-[1.4em] font-bold underline">Découvrez nos destinations</h1>

          <div className="flex flex-col items-center justify-center w-[900px] max-[1000px]:w-[500px] max-[550px]:w-[300px] mt-10 gap-5">
             <div className="text-center text-[1.1em] ">
                Explorez des <strong>villes incroyables</strong> et des lieux fascinants à
        travers le monde. Que vous rêviez de <strong>plages paradisiaques</strong>,
        de <strong> capitales culturelles</strong> ou de
        <strong> paysages naturels spectaculaires </strong>,
        Travelio vous aide à trouver la
        <strong> destination parfaite </strong> pour votre prochain voyage.
             </div>

             <div className="text-center">
                  Chaque destination propose des <strong>expériences uniques </strong> :
        découvrir de nouvelles cultures, explorer des
        <strong>monuments historiques </strong>, goûter à des
        <strong> spécialités locales </strong> ou simplement profiter d’un
        <strong> moment de détente </strong> dans un cadre exceptionnel.
             </div>

             <div className="text-center">
                Parcourez nos destinations, laissez-vous inspirer et
        <strong> commencez à planifier votre prochaine aventure </strong>
        avec Travelio.
             </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-10 mt-15 mb-15">
                {destinations.map((d)=>{
                    return (
                        <DestinationCard 
                        destination={d}
                        key={d.id}
                        />
                    )
                })}
            </div>

        </section>
    )
}

export default memo(Destinations);