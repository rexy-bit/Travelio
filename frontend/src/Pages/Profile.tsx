import { memo, use, useEffect, useState } from "react"
import { useAuthContext } from "../Contexts/AuthContext";




const Profile = () => {


    const [showSignIn, setShowSignIn] = useState(()=>{
        const saved = localStorage.getItem("showSignIn");

        return saved ? JSON.parse(saved) : true;
    });

    const {user} = useAuthContext();
    
    useEffect(()=>{
        localStorage.setItem('showSignIn', JSON.stringify(showSignIn));
    }, [showSignIn]);

    return(
        <section className="flex flex-col min-h-screen items-center">
             
             {user ? 
               <>
                  <h1>Bienvenu {user.firstName} {user.lastName}</h1>

               </>
               : 
                   
            }
             
        </section>
    )
}


export default memo(Profile);