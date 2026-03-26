import  { memo } from "react"
import Icon from "../Icons/Icon";
import { useNavigate } from "react-router-dom";


const HotelsAdmin = () => {

    const navigate = useNavigate();
    return(
        <>
             <header className="flex z-20 flex-row w-full h-[50px] justify-between px-5 items-center shadow-2xl bg-white fixed top-[60px]">
                <div className="flex flex-row items-center gap-2 font-bold text-[1.3em] text-[#1B4332]">
                    <Icon name="Hotel" size={27}/> 
                    <div className="">
                        Hotels
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <button 
                  
                    className="p-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60  bg-gray-200 rounded-full">
                        <Icon name="RefreshCcw" size={18} className="font-bold"/>
                    </button>

                    <button 
                    onClick={()=>navigate(`/admin/addDestination`)}
                    className="w-[140px] text-[14px] font-sans bg-yellow-600 text-white font-semibold py-1 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        + Add Hotel
                    </button>
                </div>
            </header>


            <section className="flex flex-col items-center bg-gray-200 min-h-screen">

            </section>
        </>
    )
}

export default memo(HotelsAdmin);