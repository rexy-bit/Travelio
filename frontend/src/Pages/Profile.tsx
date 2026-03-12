import { memo,  useEffect, useState } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import SignIn from "../Components/AuthComponents/SignIn";
import SignUp from "../Components/AuthComponents/SignUp";




const Profile = () => {


    const [showSignIn, setShowSignIn] = useState(()=>{
        const saved = localStorage.getItem("showSignIn");

        return saved ? JSON.parse(saved) : true;
    });

  

    useEffect(()=>{
        localStorage.setItem('showSignIn', JSON.stringify(showSignIn));
    }, [showSignIn]);

    const {user, signOut} = useAuthContext();
    console.log('Current User : ', user);
    
    useEffect(()=>{
        localStorage.setItem('showSignIn', JSON.stringify(showSignIn));
    }, [showSignIn]);

    return(
        <section className="flex flex-col min-h-screen items-center bg-gray-200">
             
             {user ? 
               <>
                 
                  <h1 className="text-[1.3em] font-bold mt-5">Bienvenu {user.firstName} {user.lastName}</h1>

                    <button onClick={signOut}>Sign Out</button>
               </>
               : 
                <>
                <h1 className="mt-10 font-bold text-[1.5em] underline">Page de Connexion</h1>
                {
                 showSignIn ?
                   <SignIn setShowSignIn={setShowSignIn}/>
                   : 
                     <SignUp setShowSignIn={setShowSignIn}/>
                }
                     </>

                   
            }
             
        </section>
    )
}


export default memo(Profile);