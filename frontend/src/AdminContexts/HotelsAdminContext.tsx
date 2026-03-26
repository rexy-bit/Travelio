import { createContext, useContext, useEffect, useState } from "react";
import type { Hotel, HotelFilter } from "../Contexts/Types";



interface HotelsAdminContextType{

    hotels : Hotel[];
    loadingHotels : boolean;
    hotelFilter : HotelFilter;
    setHotelFilter : (h : HotelFilter)=>void;
    resetHotelFilter : ()=>void;
}


const HotelsAdminContext = createContext<HotelsAdminContextType | null>(null);

export const HotelsAdminProvider = ({children}: {children : React.ReactNode}) => {

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loadingHotels,setLoadingHotels] = useState<boolean>(false);
    const [hotelFilter, setHotelFilter] = useState<HotelFilter>(()=>{
        const saved = localStorage.getItem('hotelFilter');

        return saved ? JSON.parse(saved): {
            name :"",
            city : ""
        }
    });

    useEffect(()=>{
        localStorage.setItem('hotelFilter', JSON.stringify(hotelFilter));
    }, [hotelFilter]);

    const resetHotelFilter = () => {
        setHotelFilter({
            name : "",
            city :""
        });
    }

    const getHotels = async() => {

        setLoadingHotels(true);
        try{

            const res = await fetch("http://localhost:5000/api/v1/hotels/", {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting hotels");

            }

            setHotels(data.data);

            console.log("Hotels : ", data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingHotels(false);
        }
    }

    useEffect(()=>{
        getHotels();
    }, []);

    return <HotelsAdminContext.Provider value={{hotels, loadingHotels,
        hotelFilter, setHotelFilter,
        resetHotelFilter
    }}>
        {children}
    </HotelsAdminContext.Provider>
}


export const useHotelsAdminContext = () => {

    const context = useContext(HotelsAdminContext);

    if(!context){
        throw new Error("Please the useHotelsAdminContext Hook inside the HotelsAdminProvider");
    }

    return context;
}