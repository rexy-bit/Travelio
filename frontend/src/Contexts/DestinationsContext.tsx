import { createContext, useContext, useEffect, useState } from "react";
import type { Destination } from "./Types";




interface DestinationsContextType{

    destinations : Destination[];
    loadingDestinations : boolean;
    getDestinations : ()=>Promise<void>
    getDestination : (id : string)=>Promise<void>
    loadingDestination : boolean;
    destinationDetail : Destination | null;
    uniqueCities : string[];
    uniqueCountries : string[];
    searchDestinationsResult : Destination[];
    loadingSearchDestinations : boolean;
    searchDestinationsInput : string;
    setSearchDestinationsInput : (s : string)=>void;
}

const DestinationsContext = createContext<DestinationsContextType | null>(null);


export const DestinationsProvider = ({children} : {children : React.ReactNode}) => {


    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [searchDestinationsResult, setSearchDestinationsResult] = useState<Destination[]>([]);
    const [loadingSearchDestinations, setLoadingSearchDestinations] = useState<boolean>(false);
    const [searchDestinationsInput, setSearchDestinationsInput ] = useState<string>(()=>{
        const saved = localStorage.getItem('searchDestinationsInput');
        
        return saved ? JSON.parse(saved) : "";
    });

    
    useEffect(()=>{
        localStorage.setItem('searchDestinationsInput', JSON.stringify(searchDestinationsInput));
    }, [searchDestinationsInput]);


    const [loadingDestinations, setLoadingDestinations] = useState<boolean>(false);
    const [loadingDestination, setLoadingDestination] = useState<boolean>(false);
    const [uniqueCities, setUniqueCities] = useState<string[]>([]);
    const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);

   const [destinationDetail, setDestinationDetail] = useState<Destination | null>(null)

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

    const getDestination = async(id : string) => {

        setLoadingDestination(true);
        try{

          const res = await fetch(`http://localhost:5000/api/v1/destination/${id}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
          });

           const data = await res.json();

           if(!res.ok){
              throw new Error(data.error || data.message || "Error in fetching destinationDetail");
           }

           setDestinationDetail(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDestination(false);
        }
    }

    const getUnique = async() => {

        try{

            const res = await fetch("http://localhost:5000/api/v1/destination/unique", {
                method : "GET"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error("Error in fetchong unique coties and countries");
            }

            setUniqueCities(data.data.cities);
            setUniqueCountries(data.data.countries);
            console.log('Cities : ', data.data.cities);
            console.log('Countries : ', data.data.countries);
            
        }catch(err){
            console.error(err);
        }
    }


    const getSearchResult = async() => {
        setLoadingSearchDestinations(true);
        try{

            const res = await fetch("http://localhost:5000/api/v1/destination/search", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({search : searchDestinationsInput})
            });

            const data = await res.json();

            if(!res.ok){
               throw new Error(data.error || data.message || "Error in getting search result");
            }

            setSearchDestinationsResult(data.data);
            console.log("search result : ", data.data);

        }catch(err){
            console.error(err);
        }finally{
            setLoadingSearchDestinations(false);
        }
    }

    useEffect(()=>{
        if(searchDestinationsInput && searchDestinationsInput !== ""){
            getSearchResult();
        }
    }, [searchDestinationsInput]);
    useEffect(()=>{
       getDestinations();
    }, []);

    useEffect(()=>{
        getUnique();
    }, []);

    return(
        <DestinationsContext.Provider value={{destinations, loadingDestinations, getDestinations, 
        getDestination, destinationDetail, loadingDestination, uniqueCities, uniqueCountries
        ,searchDestinationsResult, loadingSearchDestinations,searchDestinationsInput,setSearchDestinationsInput
        }}>
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