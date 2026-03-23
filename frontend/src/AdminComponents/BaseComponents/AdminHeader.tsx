
import  { memo, useEffect, useState } from "react"
import Icon from "../../Icons/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const AdminHeader = () => {

    const [showSide, setShowSide] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showSide');

        return saved ? JSON.parse(saved) : false;
    });

    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem('showSide', JSON.stringify(showSide));
    }, [showSide]);

    const {signOut} = useAuthContext();


    return(
        <>
        <header className="w-full flex flex-row items-center px-5 h-[60px] w-full bg-[#1B4332] text-white">
            
            <div className="flex flex-row gap-7 items-center">
               <div 
               onClick={()=>setShowSide(prev => !prev)}
               className="text-[1.8em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                &#9776;</div>
               <div className="text-[1.5em] font-bold flex flex-row items-center gap-2">
                Admin Panel <Icon name="BrickWallShield" size={27}/>
                </div>
            </div>



        </header>

 
          <AnimatePresence>
          {showSide &&
           

           <motion.nav
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -250, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
           
           className="flex flex-col  h-[calc(100%-60px)]  bg-white shadow-2xl z-50 fixed left-0 w-[250px]">
 
              <div className="flex flex-col gap-2 p-3 border-b border-b-gray-300">
                
                <div className="flex flex-row gap-3 text-[1.5em] text-[#1B4332] items-center font-bold">Travelio <Icon name="Plane" size={27}/></div>

                <div className="text-[1.2em] flex flex-row items-center gap-2 text-gray-800 font-semibold">Admin Panel <Icon name="BrickWallShield" size={25}/></div>

                 <div className="text-[15px] font-sans text-gray-600 leading-5 p-2">
                Travelio est une application web intelligente qui aide les utilisateurs à explorer le monde, réserver des voyages et organiser leurs aventures en quelques clics.
              </div>
              </div>

              <nav className="overflow-y-auto space-y-1 h-[200px] border-b border-b-gray-300 ">
                <h3 className="text-[15px] text-gray-800 font-semibold p-2">MENU PRINCIPALE</h3>
                  <div className="flex flex-col gap-0">
                    <div
                    onClick={()=>navigate('/admin/dashboard')}
                    style={{backgroundColor : location.pathname === "/admin/dashboard" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/dashboard" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="ChartBarBig" size={25}/>
                        <p>Dashboard</p>
                    </div>

                     <div
                     onClick={()=>navigate('/admin/destinations')}
                    style={{backgroundColor : location.pathname === "/admin/destinations" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/destinations" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="MapPin" size={25}/>
                        <p>Destinations</p>
                    </div>

                    <div
                    onClick={()=>navigate('/admin/hotels')}
                    style={{backgroundColor : location.pathname === "/admin/hotels" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/hotels" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="Hotel" size={25}/>
                        <p>Hotels</p>
                    </div>


                     <div
                     onClick={()=>navigate('/admin/trips')}
                    style={{backgroundColor : location.pathname === "/admin/trips" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/trips" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="TicketsPlane" size={25}/>
                        <p>Trips</p>
                    </div>


                     <div
                     onClick={()=>navigate('/admin/reservations')}
                    style={{backgroundColor : location.pathname === "/admin/reservations" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/reservations" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="NotebookPen" size={25}/>
                        <p>Reservations</p>
                    </div>

                    <div
                    onClick={()=>navigate('/admin/users')}
                    style={{backgroundColor : location.pathname === "/admin/users" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/users" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="Users" size={25}/>
                        <p>Users</p>
                    </div>


                  </div>
              </nav>
 
               <div className="flex flex-col w-full">
                <h3 className="text-[15px] text-gray-800 font-semibold p-2">PARAMETRES</h3>
 
                  <div className="flex flex-col gap-0 mt-2">
                    <div
                    onClick={()=>navigate('/admin/profile')}
                    style={{backgroundColor : location.pathname === "/admin/users" ? "#f3f4f6" : "",
                           fontWeight : location.pathname === "/admin/users" ? "600" : "400"
                     }}
                    className="p-3 flex flex-row items-center gap-2 text-[17px] transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Icon name="User" size={25}/>
                        <p>Profile</p>
                    </div>

                    <div
                    onClick={signOut}
                    className="p-3 flex flex-row items-center gap-2 text-red-600 text-[17px] transition-all duration-200 hover:bg-red-400/20 cursor-pointer">
                        <Icon name="LogOut" size={25}/>
                        <p>Déconnexion</p>
                    </div>
                  </div>
               </div>
              


           </motion.nav>
          }

          </AnimatePresence>
        </>
    )
}

export default memo(AdminHeader);