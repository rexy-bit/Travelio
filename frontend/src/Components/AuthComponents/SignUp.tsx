import { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";

const SignUp = ({setShowSignIn} : {setShowSignIn : (b : boolean)=>void}) => {

    const {signUp, errorMsg} = useAuthContext();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const email = formData.get("email") as string;

        if(!email || email === ""){
            return;
        }

        const firstName = formData.get("firstName") as string;

        if(!firstName || firstName === ""){
            return;
        }

        const lastName = formData.get("lastName") as string;

        if(!lastName || lastName === ""){
            return;
        }

        const password1 = formData.get("password1") as string;

        if(!password1 || password1 === ""){
            return;
        }

        const password2 = formData.get("password2") as string;

        if(!password2 || password2 === ""){
            return;
        }

        await signUp(firstName, lastName, email, password1, password2);
    }


    return(
        <div className="flex flex-col p-5 bg-white rounded-[10px] shadow-2xl mt-10 w-[800px] max-[900px]:w-[500px] max-[550px]:w-[320px] mb-10">
           <h1 className="text-[17px] font-bold leading-5">Créez votre compte pour accéder à toutes vos fonctionnalités et gérer facilement vos réservations.</h1>

           <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-5 w-full">

             <div className="flex flex-col gap-1">
                <p className="font-bold text-[15px]">Prenom</p>
                <input 
                type="text" 
                name="firstName"
                placeholder="Prenom"
                className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                required
                />
             </div>

             <div className="flex flex-col gap-1">
                <p className="font-bold text-[15px]">Nom</p>
                <input 
                type="text" 
                name="lastName"
                placeholder="Last Name"
                className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                required
                />
             </div>

             <div className="flex flex-col gap-1">
                <p className="font-bold text-[15px]">Email</p>
                <input 
                type="email" 
                name="email"
                placeholder="Email"
                className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                required
                />

             </div>

             <div className="flex flex-col gap-1">
                <p className="font-bold text-[15px]">Mot de passe</p>

                <input 
                type="password" 
                name="password1"
                placeholder="Mot de Passe"
                className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                required
                />
             </div>

             <div className="flex flex-col gap-1">
                <p className="font-bold text-[15px]">Confirmation Mot de passe</p>

                <input 
                type="password" 
                name="password2"
              
                className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                placeholder="Confirmation Mot de passe"
                required
                />
             </div>

                  <div className="h-[20px] w-full flex justify-center items-center text-[15px]">
                    {errorMsg && <p className="text-[15px] text-red-600">{errorMsg}</p>}
                </div>
             <button 
             type="submit"
                className="bg-[#1B4332] text-white h-[40px] rounded-[5px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 "
             >
                Créer un compte
             </button>
           </form>

                <div className="flex row items-center gap-3 mt-5 font-[500] max-[550px]:flex-col">
                Vous avez déja un compte ? <span className="underline text-gray-600 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowSignIn(prev => !prev)}>Connéctez vous</span>
            </div>
           
        </div>
    )
}


export default memo(SignUp);