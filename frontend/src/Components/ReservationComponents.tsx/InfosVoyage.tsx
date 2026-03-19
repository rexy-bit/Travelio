import { memo } from "react"
import { useTripsContext } from "../../Contexts/TripsContext";



const InfosVoyages = () => {

    const {tripDetail} = useTripsContext();

        function afficherDateFR(dateISO: Date): string  {
  return new Date(dateISO).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
  return(
    <div className="w-[400px] max-[450px]:w-[350px] flex flex-col p-5 bg-white border border-gray-300 rounded-[10px] shadow-2xl">
         
        <h1 className="text-[20px] font-bold underline">Infos du voyage</h1>

        <div className="flex flex-col gap-5 mt-8">
            <div className="flex flex-col gap-2">
                <label className="flex flex-row items-center gap-2">
                    <p className="font-bold">Destination</p>
                    <i className="fa-solid fa-map-location-dot text-[1.1em]"></i>
                </label>

                <input type="text"
                className="w-full bg-gray-100 text-[15px] font-[500] p-2 rounded-[5px]" 
                value={`${tripDetail?.destination.city} - ${tripDetail?.destination.country}`}
                readOnly/>
            </div>

            <div className="flex flex-col gap-2">
                <label className="flex flex-row items-center gap-2">
                    <p className="font-bold">Date de départ</p>
                    <i className="fa-solid fa-plane-departure"></i>
                </label>
                 <input type="text" 
                 className="w-full bg-gray-100 text-[15px] font-[500] p-2 rounded-[5px]" 
                value={afficherDateFR(tripDetail?.aller)}
                readOnly/>
            </div>

            <div className="flex flex-col gap-2">
                <label className="flex flex-row items-center gap-2">

                    <p className="font-bold">Date de retour</p>
                    <i className="fa-solid fa-plane-arrival"></i>
                </label>
                 <input type="text" 
                 className="w-full bg-gray-100 text-[15px] font-[500] p-2 rounded-[5px]" 
                value={afficherDateFR(tripDetail?.retour)}
                readOnly/>
            </div>


            <div className="flex flex-col gap-2">
                <label className="flex flex-row items-center gap-2">
                    <p className="font-bold">Nom du voyage</p>

                </label>
                 <input type="text" 
                 className="w-full bg-gray-100 text-[15px] font-[500] p-2 rounded-[5px]" 
                value={tripDetail?.title}
                readOnly/>
            </div>

            <div className="flex flex-col gap-2">
                <label className="flex flex-row items-center gap-2" htmlFor="">
                    <p className="font-bold">Prix par personne</p>
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                </label>

                <input type="text"
                className="w-full bg-gray-100 text-[15px] font-[500] p-2 rounded-[5px]" 
                value={`${tripDetail?.prix} euros`}
                readOnly
                />
            </div>
        </div>
    </div>
  )
}


export default memo(InfosVoyages);

