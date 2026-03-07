import { createContext, useContext, useEffect, useState } from "react";
import type { Destination } from "./Types";




interface DestinationsContextType{

    destinations : Destination[];
    loadingDestinations : boolean;
    getDestinations : ()=>Promise<void>

}


const DestinationsContext = createContext<DestinationsContextType | null>(null);


export const DestinationsProvider = ({children} : {children : React.ReactNode}) => {


    const [destinations, setDestinations] = useState<Destination[]>([]);

    const [loadingDestinations, setLoadingDestinations] = useState<boolean>(false);


    const getDestinations = async() => {

        setLoadingDestinations(true);

        try{

            const res = await fetch("http://localhost:5000/api/v1/destination/", {
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in fetching destinations");
            }

            setDestinations(data.data);
            console.log("Destinations : ", data.data);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingDestinations(false);
        }
    }

    useEffect(()=>{
       getDestinations();
    }, []);

    return(
        <DestinationsContext.Provider value={{destinations, loadingDestinations, getDestinations}}>
            {children}
        </DestinationsContext.Provider>
    )
}


export const useDestinationsContext = () => {

    const context = useContext(DestinationsContext);

    if(!context){
        throw new Error("Error please the use the useDestinationsContext inside the DestinationsProvider");
    }

    return context;
}