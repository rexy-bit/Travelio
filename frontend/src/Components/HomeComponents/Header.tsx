import  { memo, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const Header = () => {

    const location = useLocation();

    const [showNav, setShowNav] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showNav');

        return saved ? JSON.parse(saved) : false
    });

    useEffect(()=>{
        localStorage.setItem('showNav', JSON.stringify(showNav));
    }, [showNav]);
    return(
        <>
        <header className="flex flex-row justify-between shadow-2xl h-[60px] px-5 z-50 items-center w-full bg-[#1B4332] text-white fixed top-0">
            <h1 className="font-[poppins] font-bold text-[1.5em]"><Link to="/">Travelio</Link></h1>

            <nav className="flex flex-row justify-center items-center gap-5 max-[600px]:hidden">
                <a href="/" style={{
                    fontSize : location.pathname === "/" ? "17px" : "15px",
                    fontWeight : location.pathname === "/" ? "bold" : "500"
                }}>Accueil</a>
                <a href="/destinations" style={{
                    fontSize : location.pathname === "/destinations" ? "17px" : "15px",
                    fontWeight : location.pathname === "/destinations" ? "bold" : "500"
                }}>Destinations</a>
                <a href="/trips" style={{
                    fontSize : location.pathname === "/trips" ? "17px" : "15px",
                    fontWeight : location.pathname === "/trips" ? "bold" : "500"
                }}>Trips</a>
                <a href="/profile" style={{
                    fontSize : location.pathname === "/profile" ? "20px" : "18px",
                    fontWeight : location.pathname === "/profile" ? "bold" : "500"
                }}><i className="fa-solid fa-user"></i></a>
                
            </nav>

            <div onClick={()=>setShowNav(prev => !prev)} className="hidden max-[600px]:block text-[1.7em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-70 active:">&#9776;</div>
                 
         </header>

         <AnimatePresence>
           {showNav &&
            <motion.nav
initial={{ x: 250, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: 250, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }} className="hidden max-[600px]:flex flex-col  h-[calc(100%-60px)] p-5 text-[#1B4332] bg-white mt-[60px] gap-3 shadow-2xl z-50 fixed right-0 w-[200px]">

                 <a href="/" style={{
                    fontSize : location.pathname === "/" ? "18px" : "16px",
                    
                    fontWeight : location.pathname === "/" ? "bold" : "500"
                }}>Accueil</a>
                <a href="/destinations" style={{
                    fontSize : location.pathname === "/destinations" ? "18px" : "16px",
                    fontWeight : location.pathname === "/destinations" ? "bold" : "500"
                }}>Destinations</a>
                <a href="/trips" style={{
                    fontSize : location.pathname === "/trips" ? "18px" : "16px",
                    fontWeight : location.pathname === "/trips" ? "bold" : "500"
                }}>Trips</a>
                <a href="/profile" style={{
                    fontSize : location.pathname === "/profile" ? "25px" : "22px",
                    fontWeight : location.pathname === "/profile" ? "bold" : "500"
                }}><i className="fa-solid fa-user"></i></a>
            </motion.nav>
 
            }
            </AnimatePresence>
    

       
        </>
    )
}


export default memo(Header);