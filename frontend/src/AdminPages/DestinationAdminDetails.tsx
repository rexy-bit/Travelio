import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import Icon from "../Icons/Icon";


const DestinationAdminDetails= () => {

     const {id} = useParams();

    const {getDestination, destinationDetail, loadingDestination, setDestinationDetail} = useDestinationsContext();

     useEffect(()=>{
          getDestination(id);
     }, []);

     const [newAttraction, setNewAttraction] = useState<string>("");

     const addAttraction = () => {
        if(!newAttraction || newAttraction === ""){
            return;
        }
        

        setDestinationDetail({
            ...destinationDetail,
            attractions : [...destinationDetail?.attractions, newAttraction]
        })

        
     }


     const removeAttraction = (index : number) => {

     }

     const handleChange = () =>{

     }

    return(
        <>
         <header className="flex flex-row w-full h-[50px] justify-between px-5 items-center shadow-2xl bg-white">
                <div className="flex flex-row items-center gap-2 font-bold text-[1.3em] text-[#1B4332]">
                    <Icon name="MapPin" size={27}/> 
                    <div className="">
                        {destinationDetail?.city} - {destinationDetail?.country}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <button className="p-2 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60  bg-gray-200 rounded-full">
                        <Icon name="RefreshCcw" size={18} className="font-bold"/>
                    </button>

                    <button className="w-[140px] text-[14px] font-sans bg-yellow-600 text-white font-semibold py-1 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                        + Add Destination
                    </button>
                </div>
            </header>


        <section className="flex flex-col items-center bg-gray-200 min-h-screen w-full">

             {loadingDestination 
               ? 
                 <p>Chargement de la destination...</p>
                 : 
                   !destinationDetail ?
                     <p>
                        Destination non trouvé
                     </p>
                     : 
                     <>
                      
                       <div className="text-[1.3em] font-[600] mt-15 flex flex-col justify-center items-center">
                        Details/Modification de la destination: <div>{destinationDetail.city} - {destinationDetail.country}</div>
                       </div>
  
                       <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl">
                        <h1 className="text-[1.3em] font-bold underline">Informations de base</h1>
                        <div className="mt-8 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Ville:</p>
                            <input 
                            type="text" 
                            placeholder="ville"
                            value={destinationDetail.city}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

                        <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Pays:</p>
                            <input 
                            type="text" 
                            value={destinationDetail.country}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

                        <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Continent:</p>
                        <select 
                        value={destinationDetail.continent}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                        >
                          <option value="Europe">Europe</option>
                          <option value="Asie">Asie</option>
                          <option value="Afrique">Afrique</option>
                          <option value="Amerique">Amerique</option>
                          <option value="Australie">Australie</option>
                        </select>
                        </div>

                        <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Description:</p>
                            <textarea
                           className="bg-gray-100 p-2 border border-gray-300 rounded-[5px] h-[200px]"
                            value={destinationDetail.description}
                            onChange={handleChange}
                            />
                        </div>
                        </div>

                        <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl">
                            <h1 className="text-[1.3em] font-bold underline">Informations Pratiques</h1>

                             <div className="mt-8 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Langue:</p>
                            <input 
                            type="text" 
                            placeholder="ville"
                            value={destinationDetail.language}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

                        <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Fuseau Horraire:</p>
                            <select 
                        value={destinationDetail.timeZone}
                        onChange={handleChange}
                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                        >
                         <option value="UTC">UTC (Temps universel)</option>

<option value="Europe/London">Londres (GMT+0)</option>
<option value="Europe/Paris">Paris (GMT+1)</option>
<option value="Europe/Berlin">Berlin (GMT+1)</option>
<option value="Europe/Madrid">Madrid (GMT+1)</option>
<option value="Europe/Rome">Rome (GMT+1)</option>
<option value="Europe/Amsterdam">Amsterdam (GMT+1)</option>
<option value="Europe/Athens">Athènes (GMT+2)</option>
<option value="Europe/Moscow">Moscou (GMT+3)</option>
<option value="Africa/Algiers">Alger (GMT+1)</option>
<option value="Africa/Cairo">Le Caire (GMT+2)</option>
<option value="Africa/Lagos">Lagos (GMT+1)</option>
<option value="Africa/Johannesburg">Johannesburg (GMT+2)</option>
<option value="Africa/Nairobi">Nairobi (GMT+3)</option>

<option value="America/New_York">New York (GMT-5)</option>
<option value="America/Chicago">Chicago (GMT-6)</option>
<option value="America/Denver">Denver (GMT-7)</option>
<option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
<option value="America/Toronto">Toronto (GMT-5)</option>
<option value="America/Mexico_City">Mexico (GMT-6)</option>
<option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
<option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>


<option value="Asia/Dubai">Dubai (GMT+4)</option>
<option value="Asia/Riyadh">Riyad (GMT+3)</option>
<option value="Asia/Tehran">Téhéran (GMT+3:30)</option>
<option value="Asia/Karachi">Karachi (GMT+5)</option>
<option value="Asia/Kolkata">New Delhi (GMT+5:30)</option>
<option value="Asia/Bangkok">Bangkok (GMT+7)</option>
<option value="Asia/Jakarta">Jakarta (GMT+7)</option>
<option value="Asia/Shanghai">Shanghai (GMT+8)</option>
<option value="Asia/Hong_Kong">Hong Kong (GMT+8)</option>
<option value="Asia/Singapore">Singapour (GMT+8)</option>
<option value="Asia/Seoul">Séoul (GMT+9)</option>
<option value="Asia/Tokyo">Tokyo (GMT+9)</option>


<option value="Australia/Perth">Perth (GMT+8)</option>
<option value="Australia/Adelaide">Adélaïde (GMT+9:30)</option>
<option value="Australia/Sydney">Sydney (GMT+10)</option>
<option value="Pacific/Auckland">Auckland (GMT+12)</option>
                        </select>
                        </div>

                            <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Meilleure saison:</p>
                            <input 
                            type="text" 
                            placeholder="ville"
                            value={destinationDetail.bestSeason}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

                           <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Temperature moyenne:</p>
                            <input 
                            type="number" 
                            placeholder="ville"
                            value={destinationDetail.averageTemperature}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>


                        <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Longtitude:</p>
                            <input 
                            type="number" 
                            placeholder="ville"
                            value={destinationDetail.longitude}
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

                          <div className="mt-5 flex flex-col gap-1 w-full">
                            <p className="font-semibold">Note moyenne:</p>
                            <input 
                            type="number" 
                            placeholder="Note moyenne"
                            value={destinationDetail.rating}
                            min={0}
                            max={5}
                            
                            onChange={handleChange}
                            className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                            />
                        </div>

</div>




                        <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl">
                            <h1 className="text-[1.3em] font-bold underline">Attractions:</h1>

                            <ul className="mt-5 flex flex-col gap-7">
                            {
                                destinationDetail.attractions.map((a)=>{
                                    return(
                                      <div className="flex flex-row justify-center items-center gap-10 ">
                                        <p className="w-[500px]">{a}</p>
                                        <button className="text-red-700 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                                            <Icon name="Delete" size={30}/>
                                        </button>
                                      </div>
                                    )
                                })
                            }
                            </ul>

                              <h2 className="mt-10 font-semibold text-[1.2em] ">Ajouter une attraction</h2>
                            <div className="flex flex-row justify-between items-center gap-5 mt-3">

                                <input 
                                type="text" 
                                value={newAttraction}
                                placeholder="Entrez votre attraction   "
                                onChange={(e)=>setNewAttraction(e.target.value)}
                                className="p-2 border border-gray-300 rounded-[5px] bg-gray-100 w-full"
                                />
                                <button 
                                onClick={addAttraction}
                                className="bg-gray-800 text-white font-semibold w-[90px] py-2 rounded-[5px] transition-opacity cursor-pointer duration-200 hover:opacity-80 active:opacity-60"
                                >Ajouter</button>
                            </div>

                        </div>



                        

                     </>
              }
        </section>
        </>
    );
}


export default memo(DestinationAdminDetails);

interface Pestination{

    id : string;
    city : string;
    country : string;
    continent : string;
    latitude : number;
    longitude : number;
    description : string;
    bestSeason : string;
    currency  :string;
    language : string;
    timeZone : string;
    attractions : string[];
    activities : string[];
    travelTips : string[];
    rating : number;
    averageTemperature : number;
    images : string[];
    createdAt : Date;
    updatedAt : Date;
    
}