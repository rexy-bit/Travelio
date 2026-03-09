import { memo } from "react"
import { useAuthContext } from "../../Contexts/AuthContext";

const SignUp = () => {

    const {signUp} = useAuthContext();

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
        <div>
           <h1>Créez votre compte pour accéder à toutes vos fonctionnalités et gérer facilement vos réservations.</h1>

           <form onSubmit={handleSubmit}>

             <div>
                <p>Prenom</p>
                <input 
                type="text" 
                name="firstName"
                placeholder="Prenom"
                className=""
                required
                />
             </div>

             <div>
                <p>Nom</p>
                <input 
                type="text" 
                name="Nom"
                placeholder="Last Name"
                className=""
                required
                />
             </div>

             <div>
                <p>Email</p>
                <input 
                type="email" 
                name="email"
                placeholder="Email"
                className=""
                required
                />

             </div>

             <div>
                <p>Mot de passe</p>

                <input 
                type="password" 
                name="password1"
                className=""
                required
                />
             </div>

             <div>
                <p>Confirmation Mot de passe</p>

                <input 
                type="password" 
                name="password2"
                className=""
                required
                />
             </div>

             <button type="submit">
                Créer un compte
             </button>
           </form>
        </div>
    )
}


export default memo(SignUp);