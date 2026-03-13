import { memo } from "react"
import { useTripsContext } from "../Contexts/TripsContext";
import TripCard from "../Components/TripsComponents/TripCard";
import FilterTripsComponent from "../Components/TripsComponents/FilterTripsComponent";


const Trips = () => {

    const {trips, loadingTrips, filterTripsData, setFilterTripsData, resetFilterTrips} = useTripsContext();
    return(

        <section className="flex flex-col items-center min-h-screen bg-gray-200">
            <div className="bg-green-700/90 w-full flex flex-col justify-center items-center">


            <h1 className="mt-10 text-[2em] font-bold text-white text-center px-5">Explorez le monde avec Travelio</h1>

            <div className="flex flex-row justify-center items-center px-10 mt-15 mb-20 gap-20 max-[950px]:gap-10 max-[800px]:flex-col">
            <p className="w-[400px] text-white text-[1.1em] font-[600] max-[950px]:w-[300px] max-[800px]:text-center">Trouvez le voyage parfait parmi nos destinations et préparez-vous à vivre une expérience inoubliable.
Explorez des paysages à couper le souffle, découvrez des cultures authentiques et laissez-vous guider vers des aventures uniques qui resteront gravées dans votre mémoire.</p>
 
               <img src="https://res.cloudinary.com/dub4fhabm/image/upload/v1773414703/69f7138b-3a85-4696-b798-2bcd63c73806.png" 
               className="w-[400px] max-[500px]:w-[300pxs]"
               alt="" />
             </div>
        </div>

       <div className="flex flex-col min-h-screen w-full bg-[#F1E1C6] items-center">
        <FilterTripsComponent/>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            {filterTripsData.city !== "" &&  <div
            onClick={()=>setFilterTripsData({
                ...filterTripsData,
                city : ""
            }
            )}
            className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                <p>{filterTripsData.city}</p> <div>&times;</div></div>}

             {filterTripsData.country !== "" &&  <div
            onClick={()=>setFilterTripsData({
                ...filterTripsData,
                country : ""
            }
            )}
            className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                <p>{filterTripsData.country}</p> <div>&times;</div></div>}

             {filterTripsData.duree !== 0 &&  <div
            onClick={()=>setFilterTripsData({
                ...filterTripsData,
                duree : 0
            }
            )}
            className="flex flex-row items-center gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                <p>Duree {filterTripsData.duree} J</p> <div>&times;</div></div>}

                  {filterTripsData.maxPrice > filterTripsData.minPrice &&  <div
            onClick={()=>setFilterTripsData({
                ...filterTripsData,
                maxPrice : 0,
                minPrice : 0
            }
            )}
            className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                <p>Price: {filterTripsData.minPrice}-{filterTripsData.maxPrice}</p> <div>&times;</div></div>}

            {(filterTripsData.city !== "" || filterTripsData.country !== "" || filterTripsData.duree !== 0 || filterTripsData.minPrice !== 0 || filterTripsData.maxPrice !== 0) 
              &&
               <div
               onClick={resetFilterTrips}
               className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
               <i className="fa-solid fa-arrow-rotate-left"></i> Reset Filters
               </div>
            }
        </div>
        <div className="flex flex-wrap justify-center items-center mt-15 gap-10 mb-15">
            {loadingTrips ?
              <div className="flex flex-col justify-center items-center gap-2 ">
                <i className="fa-solid fa-plane fa-spin text-[1.3em]"></i>
                <p className="text-[16px] font-[500]">Chargement des Voyages</p>
              </div> :
              trips.length === 0
              ?
              <div className="text-[19px] font-[500]">Aucun voyage trouvé</div>
              :
            trips.map((t)=>{
                return(
                    <TripCard
                    key={t.id}
                    trip={t}
                    />
                )
            })}
        </div>
        </div>
        </section>
    );
}


export default memo(Trips);