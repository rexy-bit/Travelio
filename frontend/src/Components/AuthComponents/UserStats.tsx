import { memo } from "react";
import Icon from "../../Icons/Icon";
import { useReservationsContext } from "../../Contexts/ReservationsContext";
import { useAuthContext } from "../../Contexts/AuthContext";


const UserStats = () => {

    const {user} = useAuthContext();
    const {userReservations}= useReservationsContext();
    return(
        <div className="flex flex-col bg-white rounded-[10px] shadow-2xl w-[400px] max-[800px]:w-[320px]">
           
           <div className="p-4 text-[1.3em] font-bold">
             Vos statistiques
           </div>
           <div>
               <div className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 ">
                <Icon size={24} name="BriefcaseConveyorBelt"/>
                <p>{userReservations.length} Reservations</p>
               </div>

               <div className="border-t border-t-gray-300 p-3 flex flex-row items-center gap-3 ">
                <Icon size={24} name="Star"/>
                <p>{user?.favorites.length} Favoris</p>
               </div>
           </div>
        </div>
    );
}

export default memo(UserStats);