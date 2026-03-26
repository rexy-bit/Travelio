import { createContext, useContext, useState } from "react";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import { useNavigate } from "react-router-dom";



interface DestinationAdminContextType{
    updateDestination : (id : string, form : FormData)=>Promise<void>;
    loadingUpdateDestination: boolean;
    addDestination : (formData: FormData)=>Promise<void>;
    loadingAddDestination : boolean;
    deleteDestination : (id : string)=>void;
    loadingDeleteDestination : boolean;
}


const DestinationAdminContext = createContext<DestinationAdminContextType | null>(null);

export const DestinationAdminProvider = ({children} : {children : React.ReactNode}) =>  {

    const [loadingUpdateDestination, setLoadingUpdateDestination] = useState<boolean>(false);
    const [loadingAddDestination, setLoadingAddDestination] = useState<boolean>(false);
    const [loadingDeleteDestination, setLoadingDeleteDestination] = useState<boolean>(false);

    const navigate = useNavigate();

    const {getDestinations} = useDestinationsContext();
//http://localhost:5000/api/v1/destination/update
    const updateDestination = async(id : string, formData : FormData) => {

        setLoadingUpdateDestination(true);
        try{

            const res = await fetch(`http://localhost:5000/api/v1/destination/update/${id}`, {
                method : "PUT",
                
                credentials : "include",
                body : formData
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || data.error || "Error in updating destination");
            }


        }catch(err){
            console.error(err);
        }finally{
            setLoadingUpdateDestination(false);
        }
    }


    const addDestination = async(formData : FormData) => {

        setLoadingAddDestination(true);
        try{
 
            const res = await fetch("http://localhost:5000/api/v1/destination/add", {
                method : "POST",
                credentials : "include",
                body : formData
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in adding a destination");
            }

            await getDestinations();
            navigate("/admin/destinations");
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAddDestination(false);
        }
    }


    const deleteDestination = async(id : string) => {

        setLoadingDeleteDestination(true);
        try{

            const res = await fetch(`http://localhost:5000/api/v1/destination/delete/${id}`, {
                method : "DELETE",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in deleting destination");
            }

            await getDestinations();
        }catch(err){
            console.error(err);
        }finally{
            setLoadingDeleteDestination(false);
        }
    }


    return <DestinationAdminContext.Provider value={{loadingUpdateDestination, updateDestination,
        addDestination, loadingAddDestination,
        deleteDestination,
        loadingDeleteDestination
    }}>
        {children}
    </DestinationAdminContext.Provider>
}


 export const useDestinationAdminContext = () => {

    const context = useContext(DestinationAdminContext);

    if(!context){
        throw new Error("Please use the useDestinationAdminContext inside the DestinationAdminProvider");
    }

    return context;
}

