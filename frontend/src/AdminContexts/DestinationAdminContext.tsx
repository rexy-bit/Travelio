import { createContext, useContext, useState } from "react";



interface DestinationAdminContextType{
    updateDestination : (id : string, form : FormData)=>Promise<void>
    loadingUpdateDestination: boolean;
    

}


const DestinationAdminContext = createContext<DestinationAdminContextType | null>(null);

export const DestinationAdminProvider = ({children} : {children : React.ReactNode}) =>  {

    const [loadingUpdateDestination, setLoadingUpdateDestination] = useState<boolean>(false);

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


    return <DestinationAdminContext.Provider value={{loadingUpdateDestination, updateDestination}}>
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

