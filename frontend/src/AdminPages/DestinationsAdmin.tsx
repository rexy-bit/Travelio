import { memo } from "react"
import Icon from "../Icons/Icon";
import SearchDestinationsComponent from "../AdminComponents/AdminDestinationsComponents/SearchDestinationsComponent";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import DestinationAdminComponent from "../AdminComponents/AdminDestinationsComponents/DestinationAdminComponent";
import { useNavigate } from "react-router-dom";




const DestinationsAdmin = () => {

    const {destinations, searchDestinationsResult, loadingSearchDestinations, searchDestinationsInput, setSearchDestinationsInput} = useDestinationsContext();
    const navigate = useNavigate();

    return(
        <>

        <header className="flex z-20 flex-row w-full h-[50px] justify-between px-5 items-center shadow-2xl bg-white fixed top-[60px]">
                <div className="flex flex-row items-center gap-2 font-bold text-[1.3em] text-[#1B4332]">
                    <Icon name="MapPin" size={27}/> 
                    <div className="">
                        Destinations
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <button 
                    onClick={()=>setSearchDestinationsInput("")}
                    className="p-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60  bg-gray-200 rounded-full">
                        <Icon name="RefreshCcw" size={18} className="font-bold"/>
                    </button>

                    <button 
                    onClick={()=>navigate(`/admin/addDestination`)}
                    className="w-[140px] text-[14px] font-sans bg-yellow-600 text-white font-semibold py-1 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        + Add Destination
                    </button>
                </div>
            </header>

        <section className="flex flex-col w-full min-h-screen items-center">
           <SearchDestinationsComponent/>


        {
  loadingSearchDestinations ? (
    <p>Chargement...</p>
  ) : searchDestinationsInput && searchDestinationsInput !== "" ? (
    
    searchDestinationsResult.length === 0 ? (
      <p>
        Pas de resultat pour : <strong>{searchDestinationsInput}</strong>
      </p>
    ) : (
      <div className="mt-10 mb-15 flex flex-wrap gap-5">
        {searchDestinationsResult.map((d) => (
          <DestinationAdminComponent destination={d} key={d.id} />
        ))}
      </div>
    )

  ) : (
    <div className="mt-10 mb-15 flex flex-wrap gap-5">
      {destinations.map((d) => (
        <DestinationAdminComponent destination={d} key={d.id} />
      ))}
    </div>
  )
}


        </section>
        </>
    )
}

export default memo(DestinationsAdmin);