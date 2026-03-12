import { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";


const SignIn = ({setShowSignIn} : {setShowSignIn : (b : boolean)=>void}) => {

    const {signIn, errorMsg} = useAuthContext();

    

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) =>{


        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;


        if(!email || email === ""){
            return;
        }

        if(!password || password === ""){
            return;
        }

        await signIn(email, password);
    }

    return(
        <div className="flex flex-col p-5 bg-white rounded-[10px] shadow-2xl mt-10 w-[800px] max-[900px]:w-[500px] max-[550px]:w-[320px] mb-10">
            <h2 className="text-[17px] font-bold leading-5">
                Connectez-vous à votre compte pour gérer vos réservations
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-5">

                <div className="flex flex-col gap-1">
                    <p className="font-bold text-[15px]">Email</p>
                    <input 
                    type="email" 
                    name="email"
                    className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                    placeholder="Email"
                    required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="font-bold text-[15px]">Mot de Passe</p>
                    <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className="p-2 bg-gray-100 text-[15px] rounded-[5px]"
                    required
                    />
                </div>

                <div className="h-[20px] w-full flex justify-center items-center text-[15px]">
                    {errorMsg && <p className="text-[15px] text-red-600">{errorMsg}</p>}
                </div>

                <button 
                type="submit"
                className="bg-[#1B4332] text-white h-[40px] rounded-[5px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 ">
                    Connexion
                </button>
            </form>

            <div className="flex row items-center gap-3 mt-5 font-[500] max-[550px]:flex-col">
                Vous n'avez pas de compte ? <span className="underline text-gray-600 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60" onClick={()=>setShowSignIn(prev => !prev)}>Créez un compte</span>
            </div>
        </div>
    )
}


export default memo(SignIn);