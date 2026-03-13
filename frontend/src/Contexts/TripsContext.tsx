import { createContext, useContext, useEffect, useState } from "react";
import type { FilterTripType, Trip } from "./Types";



interface TripsContextType{
    trips : Trip[];
    loadingTrips : boolean;
    getTrips: ()=>Promise<void>
    filterTripsData : FilterTripType;
    setFilterTripsData : (f : FilterTripType)=>void;
    resetFilterTrips : ()=>void;
}

const TripsContext = createContext<TripsContextType | null>(null);

export const TripsProvider = ({children} : {children : React.ReactNode}) => {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [loadingTrips, setLoadingTrips] = useState<boolean>(false);
    const [filterTripsData, setFilterTripsData] = useState(()=>{
        const saved = localStorage.getItem('filterTripsData');

        return saved ? JSON.parse(saved) : {city : "", country : "", duree : 0,
           minPrice : 0,
           maxPrice :0
        }
    });

   const  resetFilterTrips = () => {
        setFilterTripsData({city : "", country : "", duree : 0,
           minPrice : 0,
           maxPrice :0})
    }
    useEffect(()=>{
        localStorage.setItem('filterTripsData', JSON.stringify(filterTripsData));
    }, [filterTripsData]);

    const getTrips = async() => {

        setLoadingTrips(true);

        try{

            const res = await fetch("http://localhost:5000/api/v1/trips/", {
               method : "POST",
               headers : {
                "Content-Type" : "application/json"
               },
               body : JSON.stringify(filterTripsData)
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching trips");
            }

            setTrips(data.data);
            console.log('Trips : ', data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingTrips(false);
        }
    }

    


    useEffect(()=>{
         getTrips();
    }, [filterTripsData]);

    return <TripsContext.Provider value={{loadingTrips, trips, getTrips, filterTripsData, setFilterTripsData, resetFilterTrips}}>
        {children}
    </TripsContext.Provider>
}


export const useTripsContext = () => {

    const context = useContext(TripsContext);

    if(!context){
        throw new Error("Please use the useTripsContext inside the TripsProvider");
    }

    return context;
}

