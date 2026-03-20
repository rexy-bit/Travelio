import { memo } from "react"
import { useNavigate } from "react-router-dom";
import Icon from "../../Icons/Icon";


const SuppComponent = () => {

    const navigate = useNavigate();
    return(

        <div className=" bg-white shadow-2xl flex flex-col w-[800px] rounded-[10px] mb-10 max-[850px]:w-[700px] max-[750px]:w-[320px]">

            <h1 className="text-[1.3em] font-bold p-5 border-b border-b-gray-300 ">Planifiez votre prochain voyage facilement </h1>

            <div className="flex flex-row justify-center items-center mt-10 gap-10 max-[750px]:flex-col" >
                <p className="text-gray-700 text-[16px] leading-relaxed w-[300px] max-[750px]:w-[290px] max-[750px]:text-center">
        Explorez des centaines de destinations, comparez les offres disponibles,
        ajoutez vos voyages en favoris et réservez en quelques clics.
        Tout est centralisé pour vous offrir une expérience fluide et rapide.
      </p>

         <img
         className="w-[300px] max-[750px]:w-[250px]"
         src="https://res.cloudinary.com/dub4fhabm/image/upload/v1774046404/70e3455f-5b8f-4bb6-ba71-e8c8698bb653.png" alt="" />

            </div>

            <div className="flex flex-row justify-center items-center pb-10 mt-10 gap-5 max-[750px]:flex-col">
                <button 
                onClick={()=>navigate("/destinations")}
                className="w-[250px] py-2 bg-gray-800/70 text-white font-semibold text-[15px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                    Parcourez nos destinations
                </button>

                <button
                onClick={()=>navigate("/trips")}
                className="w-[250px] py-2 bg-gray-800/70 text-white font-semibold text-[14px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                >
                   Découvrez nos voyages disponibles
                </button>
            </div>

        </div>
    )
}

export default memo(SuppComponent);