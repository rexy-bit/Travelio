import { memo } from "react"
import { useDestinationsContext } from "../../Contexts/DestinationsContext";
import { useTripsContext } from "../../Contexts/TripsContext";





const FilterTripsComponent = () => {

    const {uniqueCities, uniqueCountries} = useDestinationsContext();
    const {setFilterTripsData, filterTripsData} = useTripsContext();
    
   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;

  setFilterTripsData((prev) => ({
    ...prev,
    [name]:
      name === "minPrice" || name === "maxPrice" || name === "duree"
        ? Number(value)
        : value
  }));
};
    
    return(
        <div className="flex flex-col gap-2 bg-white w-[700px] max-[800px]:w-[500px] max-[550px]:w-[300px] rounded-[20px] p-5 shadow-2xl mt-10">
            <div className="text-[#1B4332] flex flex-row  items-center gap-2 text-[1.4em] font-bold">
                <i className="fa-solid fa-filter text-[1.2em]"></i>
                <p>Filtrer les voyages</p>
            </div>
            <div className="flex flex-row max-[800px]:flex-col max-[800px]:gap-5 max-[800px]:w-full justify-between items-center mt-5 max-[800px]:items-baseline">
            <div className="flex flex-col gap-2 max-[800px]:w-full"> 
                <div className="flex flex-row items-center gap-2 text-[#1B4332] text-[17px] font-[600]"><p>Ville</p> <i className="fa-solid fa-city"></i> :</div>
           <select name="city" id=""
           value={filterTripsData.city}
           onChange={handleChange}
           className="bg-gray-100 p-2 w-[180px] rounded-[5px] cursor-pointer border border-gray-300 max-[800px]:w-full"
           >
            <option value="">All</option> 
            {uniqueCities.map((c)=>{
                return(
                    <option key={c} value={c}>{c}</option>
                )
            })}
             
           </select>
           </div>

           
           <div className="flex flex-col gap-2 max-[800px]:w-full">
                <div className="flex flex-row items-center gap-2 text-[#1B4332] text-[17px] font-[600]"><p>Pays</p> <i className="fa-solid fa-earth-europe"></i> :</div>
           <select name="country" id=""
           value={filterTripsData.country}
           onChange={handleChange}
           className="bg-gray-100 p-2 w-[150px] rounded-[5px] cursor-pointer border border-gray-300 max-[800px]:w-full"
           >
            <option value="">All</option>
            {uniqueCountries.map((c)=>{
                return(
                    <option key={c} value={c}>{c}</option>
                ) 
            })}
             
           </select>
           </div>

           <div className="flex flex-col gap-2 max-[800px]:w-full">
            <div className="flex flex-row items-center gap-2 text-[#1B4332] text-[17px] font-[600] max-[800px]:w-full"><p>Durée</p> <i className="fa-regular fa-hourglass"></i> :</div>
               <select name="duree"  id=""
               onChange={handleChange}
               value={filterTripsData.duree}
               className="bg-gray-100 p-2 w-[120px] rounded-[5px] cursor-pointer border max-[800px]:w-full border-gray-300"
               >
                <option value={0}>0</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                   <option value={10}>10+</option>
                   
               </select>
           </div>

           <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 text-[#1B4332] text-[17px] font-[600]"><p>Prix</p> <i className="fa-solid fa-hand-holding-dollar"></i> :</div>
            <div className="flex flex-row items-center gap-3">
            <select  name="minPrice" id=""
            value={filterTripsData.minPrice}
            onChange={handleChange}
             className="bg-gray-100 p-2 w-[70px] rounded-[5px] cursor-pointer border border-gray-300"
            >
                <option value={0}>0</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
            </select>

             <select  name="maxPrice" id=""
             value={filterTripsData.maxPrice}
             onChange={handleChange}
             className="bg-gray-100 p-2 w-[80px] rounded-[5px] cursor-pointer border border-gray-300"
            >
                <option value={0}>0</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={2000}>2000</option>
            </select>
            </div>
           </div>
           </div>
        </div>
    )
}

export default memo(FilterTripsComponent);