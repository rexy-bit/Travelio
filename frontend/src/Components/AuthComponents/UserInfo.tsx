import { memo, useState } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";
import Icon from "../../Icons/Icon";
import { useUsersContext } from "../../Contexts/UsersContext";
import SignOutPop from "./SignOutPop";



const UserInfo = () => {

    const {user} = useAuthContext();

    const {modifyUserName, loadingModifyName} = useUsersContext();

    const [showPop, setShowPop] = useState<boolean>(false);
   

    const [modify, setModify] = useState<boolean>(false);
    const [nom, setNom] = useState<string>(user?.lastName || "");
    const [prenom, setPrenom] = useState<string>(user?.firstName || "");

     const sumbitModify = async() => {

        if(!prenom || prenom === "" || !nom || nom === ""){
            return;
        }

        await modifyUserName(prenom, nom);
        setModify(false);
        
    }
    return(
        <>
        <div className="flex flex-col bg-white items-center p-5 w-[320px] rounded-[10px] shadow-2xl">
            
            <div className="flex flex-col gap-2 justify-center items-center ">
                <Icon name="CircleUserRound" size={70}/>

                <p className="text-[1.3em] font-bold">{user?.firstName} {user?.lastName}</p>
            </div>

            <div className="mt-3 border-t border-t-gray-400 pt-4 flex flex-col gap-2 w-full">
                {modify ?
                 <div className="flex flex-col gap-5 p-3 border border-gray-300 rounded-[10px] mb-5">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-[15px]">Entrez votre nouveau Nom</p>
                    <input 
                    type="text" 
                    value={nom}
                    onChange={(e)=>setNom(e.target.value)}
                    className="border border-gray-300  w-full p-2 text-[15px] rounded-[5px] bg-gray-100"
                    name="" 
                    id="" />
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="font-medium text-[15px]">Entrez votre nouveau Prénom</p>
                    <input 
                    type="text" 
                    value={prenom}
                    onChange={(e)=>setPrenom(e.target.value)}
                    className="border border-gray-300 w-full p-2 text-[15px] rounded-[5px] bg-gray-100"
                    name="" 
                    id="" />
                  </div>
                  </div>
                  : 

                 <>
                  <p><span className="font-medium">Nom :</span> {user?.lastName}</p>
                   <p><span className="font-medium">Prénom :</span> {user?.firstName}</p>
                  </>
                  }
        <p><span className="font-medium">Email :</span> {user?.email}</p>
        <p><span className="font-medium">Membre depuis :</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-row mt-5 justify-center items-center gap-2">

               {
                modify ?
                 <>
                  <button 
                onClick={sumbitModify}
                className="bg-green-800/90 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold text-[14px] px-3 rounded-[10px] py-2">
                    {loadingModifyName ? <i className="fa-solid fa-arrow-rotate-right fa-spin"></i> : "Soumettre la modification"}
                </button>

                <button
                onClick={()=>setModify(false)}
                className="bg-red-800/80 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold text-[14px] px-3 rounded-[10px] py-2">
                    Annuler
                </button>
                 </>
                 : 
                 <>
                    <button 
                onClick={()=>setModify(true)}
                className="bg-gray-800/90 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold text-[14px] px-3 rounded-[10px] py-2">
                    Modifier le profile
                </button>

                <button
                onClick={()=>setShowPop(true)}
                className="bg-red-800/80 text-white cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-semibold text-[14px] px-3 rounded-[10px] py-2">
                    Déconnexion
                </button>
                 </>
               }
                
            </div>
        </div>

         {showPop && <SignOutPop setShowPop={setShowPop}/>}
        </>
    )
}

export default memo(UserInfo);

