import  { memo } from "react"
import Icon from "../../Icons/Icon";
import { useNavigate } from "react-router-dom";


const ExploreComponents = () => {

    const navigate = useNavigate();
    return(
        <div className="flex flex-col bg-white rounded-[10px] shadow-2xl w-[400px] max-[800px]:w-[320px]">
            <div className="p-4 ">
                <h1 className="text-[1.3em] font-bold">Explorer</h1>
            </div>

            <div>
                <div onClick={()=>navigate("/")} className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
                    <Icon name="House" size={24}/>
                    <p className="font-semibold">Accueil</p>
                </div>

                 <div onClick={()=>navigate("/destinations")} className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
                    <Icon name="MapPinHouse" size={24}/>
                    <p className="font-semibold">Destinations</p>
                </div>

                <div onClick={()=>navigate("/trips")} className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
                    <Icon name="TicketsPlane" size={24}/>
                    <p className="font-semibold">Voyages</p>
                </div>


                <div onClick={()=>navigate("/reservations")} className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
                    <Icon name="CalendarArrowUp" size={24}/>
                    <p className="font-semibold">Reservations</p>
                </div>


                 <div onClick={()=>navigate("/favoris")} className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
                    <Icon name="Star" size={24}/>
                    <p className="font-semibold">Favoris</p>
                </div>


              
            </div>
        </div>
    )
}


export default memo(ExploreComponents);