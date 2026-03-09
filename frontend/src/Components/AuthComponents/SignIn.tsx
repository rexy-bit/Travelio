import { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";


const SignIn = () => {

    const {signIn} = useAuthContext();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) =>{

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
        <div>
            <h2>
                Connectez-vous à votre compte pour gérer vos réservations
            </h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <p>Email</p>
                    <input 
                    type="email" 
                    name="email"
                    className=""
                    placeholder="Email"
                    required
                    />
                </div>


                <div>
                    <p>Mot de Passe</p>
                    <input 
                    type="password" 
                    placeholder="Password"
                    className=""
                    required
                    />
                </div>

                <button>
                    Connexion
                </button>
            </form>
        </div>
    )
}


export default memo(SignIn);