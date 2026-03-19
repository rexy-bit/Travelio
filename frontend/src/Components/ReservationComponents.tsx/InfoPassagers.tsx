import { memo, useEffect, useState } from "react"
import type { Passenger } from "../../Contexts/Types";
import { useReservationsContext } from "../../Contexts/ReservationsContext";




const InfosPassagers = () => {

     const {passagers, setPassagers} = useReservationsContext();

     const [newPassager, setNewPassager] = useState<Passenger>(()=>{

        const saved = localStorage.getItem('newPassager');

        return saved ? JSON.parse(saved) : 
         { firstName : "",
          lastName : "",
          age : 0,
          dateNaiss: "12/23/24",
          passeportNum : "011",
          genre: "Male",
          nationality : "Algerienne"}
     });

     useEffect(()=>{
        localStorage.setItem('newPassager', JSON.stringify(newPassager));
     }, [newPassager]);

     const [ajouter, setAjouter] = useState<boolean>(false);


     const resetNewPassager = ()=>{
setNewPassager({ firstName : "",
          lastName : "",
          age : 0,
          dateNaiss: "",
          passeportNum : "011",
          genre: "Male",
          nationality : "Algerienne"});
     }
     const addPassager = () => {

        if(!newPassager.firstName || newPassager.firstName === ""){
            return;
        }

        if(!newPassager.lastName || newPassager.lastName === "" || newPassager.age <= 0 || newPassager.nationality === "" || newPassager.genre === ""){
            return;
        }

        setPassagers([...passagers, newPassager]);
        resetNewPassager();
          setAjouter(false);

     }

     const updatePassenger = (index : number) => {

    

          if(!newPassager.firstName || newPassager.firstName === ""){
            return;
        }

        if(!newPassager.lastName || newPassager.lastName === "" || newPassager.age <= 0 || newPassager.nationality === "" || newPassager.genre === ""){
            return;
        }

        const updated = [...passagers];
        updated[index] = newPassager;
        setPassagers(updated);
        setModifier(false);
        resetNewPassager();
     }

     const [modifier, setModifier] = useState<boolean>(false);


     const deletePassager = (index : number) => {
        const newPassagers = passagers.filter((p,i)=>i !== index);
        setPassagers(newPassagers);
     }

    return(
        <div className="w-[400px] max-[450px]:w-[350px] flex flex-col p-5 bg-white border border-gray-300 rounded-[10px] shadow-2xl">
        
           <h1 className="font-bold text-[1.2em] underline">Infos passagers</h1>

              <p className="text-[15px] mt-5 text-gray-800 leading-5">
Remplissez les informations des passagers avec soin. 
Elles seront utilisées pour vos billets et documents officiels.
</p>
           <button
           className="bg-[#1B4332] text-white font-bold py-2 rounded-[10px] mt-7 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
           onClick={()=>setAjouter(true)}>
            + Ajouter un passager
           </button>

           {ajouter && 
           
            <div className="flex flex-col mt-7 p-5 border border-gray-300 rounded-[10px] gap-3">
                <label htmlFor=""
                className="flex flex-col gap-1"
                >
                    <p className="font-bold text-[16px]">Nom:</p>
                    <input 
                    type="text" 
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Nom"
                    value={newPassager.lastName}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        lastName: e.target.value
                    }))}
                    required
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Prénom:</p>
                    <input 
                    type="text" 
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Prénom"
                    value={newPassager.firstName}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        firstName: e.target.value
                    }))}
                    required
                    />
                </label>

                 <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Age:</p>
                    <input 
                    type="number"
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Age"
                    value={newPassager.age}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        age: Number(e.target.value)
                    }))}
                    required
                    />
                </label>

               

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Date de Naissance:</p>
                    <input 
                    type="date"
                    
                    value={newPassager.dateNaiss}
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        dateNaiss: e.target.value
                    }))}
                    required
                    />
                </label>


                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Numéro de passeport:</p>
                    <input 
                    type="text"
                    placeholder="Numéro de passeport"
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    value={newPassager.passeportNum}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        passeportNum: e.target.value
                    }))}
                    required
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Genre:</p>
                    <select name="" id=""
                    value={newPassager.genre}
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        genre : e.target.value
                    }))}
                    required
                    >
                        
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Nationalité:</p>
                    <input 
                    type="text"
                    className="w-full bg-gray-100 p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Nationalité"
                    value={newPassager.nationality}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        nationality: e.target.value
                    }))}
                    required
                    />
                </label>


                <div className="flex flex-row items-center gap-5 justify-center mt-2">

                    <button onClick={(addPassager)}
                    className="bg-green-800/80 w-[100px] text-white text-[15px] font-bold py-2 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" 
                    >
                        Ajouter
                    </button>

                    <button 
                    className="bg-red-800/80 w-[100px] text-white text-[15px] font-bold py-2 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" 
                    onClick={()=>{
                        resetNewPassager();
                        setAjouter(false);
                    }}>
                        Annuler
                    </button>
                </div>
            </div>
           }

            {passagers.length !== 0 &&
              <div className="flex flex-col gap-4 mt-10">
                {passagers.map((p, i)=>{
                    return(
                        <div key={i} className="flex text-white flex-col rounded-xl bg-green-800/80 p-3 gap-2">

                            {p.passeportNum !== newPassager.passeportNum ?
                            <>
                            <div className="flex flex-row items-center gap-1">
                              <label htmlFor="" className="font-bold text-[15px]">Prénom: </label>
                              <p>{p.firstName}</p>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Nom:</label>
                                <p>{p.lastName}</p>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Age:</label>
                                <p>{p.age}</p>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Date de naissance:</label>
                                <p>{p.dateNaiss}</p>
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Numéro de passeport:</label>
                                <p>{p.passeportNum}</p>
                            </div>
                             
                             <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Genre:</label>
                                <p>{p.genre}</p>
                             </div>

                             <div className="flex flex-row items-center gap-1">
                                <label htmlFor="" className="font-bold text-[15px]">Nationalité:</label>
                                <p>{p.nationality}</p>
                             </div>

                             <div className="flex flex-row justify-center items-center mt-5 gap-5">
                                <button
                                onClick={()=>{
                                    setModifier(true);
                                    setNewPassager(p);
                                }}
                                className="bg-white text-green-900 w-[100px] py-1 text-[15px] font-bold rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                                    Modifier
                                </button>
                                <button onClick={()=>deletePassager(i)}
                                    
                                    className="bg-red-800/80  text-white w-[100px] py-1 text-[15px] font-bold rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                    >Supprimer</button>
                             </div>
                             </>
                             : (p.passeportNum === newPassager.passeportNum && modifier) && <>
                                 <label htmlFor=""
                className="flex flex-col gap-1"
                >
                    <p className="font-bold text-[16px]">Nom:</p>
                    <input 
                    type="text" 
                    className="w-full bg-gray-100 p-2 rounded-[5px] text-black border border-gray-300 text-[15px]"
                    placeholder="Nom"
                    value={newPassager.lastName}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        lastName: e.target.value
                    }))}
                    required
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Prénom:</p>
                    <input 
                    type="text" 
                    className="w-full bg-gray-100 p-2 text-black rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Prénom"
                    value={newPassager.firstName}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        firstName: e.target.value
                    }))}
                    required
                    />
                </label>

                 <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Age:</p>
                    <input 
                    type="number"
                    className="w-full bg-gray-100 p-2 text-black rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Age"
                    value={newPassager.age}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        age: Number(e.target.value)
                    }))}
                    required
                    />
                </label>

               

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Date de Naissance:</p>
                    <input 
                    type="date"
                    
                    value={newPassager.dateNaiss}
                    className="w-full bg-gray-100 text-black p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        dateNaiss: e.target.value
                    }))}
                    required
                    />
                </label>


                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Numéro de passeport:</p>
                    <input 
                    type="text"
                    placeholder="Numéro de passeport"
                    className="w-full bg-gray-100 text-black p-2 rounded-[5px] border border-gray-300 text-[15px]"
                    value={newPassager.passeportNum}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        passeportNum: e.target.value
                    }))}
                    required
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Genre:</p>
                    <select name="" id=""
                    value={newPassager.genre}
                    className="w-full bg-gray-100 p-2 text-black rounded-[5px] border border-gray-300 text-[15px]"
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        genre : e.target.value
                    }))}
                    required
                    >
                        
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-1">
                    <p className="font-bold text-[16px]">Nationalité:</p>
                    <input 
                    type="text"
                    className="w-full bg-gray-100 p-2 text-black rounded-[5px] border border-gray-300 text-[15px]"
                    placeholder="Nationalité"
                    value={newPassager.nationality}
                    onChange={(e)=>setNewPassager(prev => ({
                        ...prev,
                        nationality: e.target.value
                    }))}
                    required
                    />
                </label>


                <div className="flex flex-row justify-center items-center mt-5 gap-5">
                                <button 
                           

                              
                                onClick={()=>updatePassenger(i)}
                                className="bg-white text-green-900 w-[100px] py-1 text-[15px] font-bold rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"> 
                                    Confirmer
                                </button>
                                <button onClick={()=>{
                                    setModifier(false);
                                    resetNewPassager();
                                }}
                                    
                                    className="bg-red-800/80  text-white w-[100px] py-1 text-[15px] font-bold rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                    >Annuler</button>
                             </div>
                             </> }
                        </div>
                    )
                })}
              </div>
            }
           
           

        </div>
    );
}


export default memo(InfosPassagers);