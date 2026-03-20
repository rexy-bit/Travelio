import { createContext, useContext } from "react"
import { useAuthContext } from "./AuthContext";



interface FavoritesContextType {

    toggleFavorite : (destinationId : string)=>Promise<void>

}


const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({children} : {children : React.ReactNode}) => {

    const {getCurrentUser} = useAuthContext();
    const toggleFavorite = async(destinationId : string) => {

        try{
        const res = await fetch(`http://localhost:5000/api/v1/favorites/toggle/${destinationId}`, {
            method : "POST",
            credentials : "include"
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.data || data.error || "Error in adding a favorite");
        }

        await getCurrentUser();
       }catch(err){
        console.error(err);
       }
    }

    return <FavoritesContext.Provider value={{toggleFavorite}}>
        {children}
    </FavoritesContext.Provider>
}


export const useFavoritesContext = () => {

    const context = useContext(FavoritesContext);

    if(!context){
        throw new Error("Please use the useFavoritesContext hook inside the FavoritesProvider");
    }

    return context;
}