import { createContext, useContext, useState } from "react";
import React from 'react';
import { useAuthContext } from "./AuthContext";




interface UsersContextType{
    modifyUserName : (firstName : string, lastName : string)=>Promise<void>
    loadingModifyName: boolean;
}


const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider = ({children} : {children: React.ReactNode}) => {

    const [loadingModifyName, setLoadingModifyName] = useState<boolean>(false);

    const {user, setUser}  = useAuthContext();

    const  modifyUserName = async(firstName : string, lastName : string) => {

        setLoadingModifyName(true);
        try{

            const res = await fetch(`http://localhost:5000/api/v1/users/modifyName/${user?.id}`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include",
                body : JSON.stringify({firstName , lastName})
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in modifying user name");
            }

            setUser(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingModifyName(false);
        }
    }




    return <UsersContext.Provider value={{modifyUserName, loadingModifyName}}>
        {children}
    </UsersContext.Provider>



}

export const useUsersContext = () => {

    const context = useContext(UsersContext);

    if(!context){
        throw new Error("Please use the useUsersContext inside the UsersProvider");
    }

    return context;
}

