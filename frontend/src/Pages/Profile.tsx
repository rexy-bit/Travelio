import { memo,  useEffect, useState } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import SignIn from "../Components/AuthComponents/SignIn";
import SignUp from "../Components/AuthComponents/SignUp";
import UserInfo from "../Components/AuthComponents/UserInfo";
import ExploreComponents from "../Components/AuthComponents/ExploreComponents";
import UserStats from "../Components/AuthComponents/UserStats";

 import { motion } from "framer-motion";
import SuppComponent from "../Components/AuthComponents/SuppComponent";


const Profile = () => {


    const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 }
};

    const [showSignIn, setShowSignIn] = useState(()=>{
        const saved = localStorage.getItem("showSignIn");

        return saved ? JSON.parse(saved) : true;
    });

  

    useEffect(()=>{
        localStorage.setItem('showSignIn', JSON.stringify(showSignIn));
    }, [showSignIn]);

    const {user} = useAuthContext();
    console.log('Current User : ', user);
    
    useEffect(()=>{
        localStorage.setItem('showSignIn', JSON.stringify(showSignIn));
    }, [showSignIn]);

    return(
        <section className="flex flex-col min-h-screen items-center bg-gray-200">
             
             {user ? 
               <>
                 
                

<>
  <motion.section
    variants={container}
    initial="hidden"
    animate="show"
  >

   
    <motion.h1
      variants={item}
      className="text-[1.5em] px-5 text-center font-bold mt-15"
    >
      Bienvenue {user.firstName} {user.lastName} 👋
    </motion.h1>

  
  
    <motion.div
      variants={container}
      className="flex flex-row justify-center gap-10 items-start mt-10 max-[800px]:flex-col max-[800px]:items-center mb-15"
    >

      
      <motion.div variants={item} whileHover={{ scale: 1.02 }}>
        <UserInfo />
      </motion.div>

     
      <div className="flex flex-col gap-5">

        <motion.div variants={item} whileHover={{ scale: 1.02 }}>
          <ExploreComponents />
        </motion.div>

        <motion.div variants={item} whileHover={{ scale: 1.02 }}>
          <UserStats />
        </motion.div>

      </div>
      

    </motion.div>

     <SuppComponent/>

  </motion.section>
</>
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