import { createContext,useState, useEffect, useContext } from 'react';
import type { User } from "./Types";


interface AuthContextType{
    user : User | null; 
    signIn : (email : string, password : string)=>Promise<void>
    signUp : (firstName : string, lastName : string, email : string, password1: string, password2 : string)=>Promise<void>
    signOut : ()=>Promise<void>
    loadingAuth : boolean;
    errorMsg : string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const [user, setUser] = useState(()=>{
        const saved = localStorage.getItem('user');

        return saved ? JSON.parse(saved) : null;
    });

    

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

    const signIn = async(email : string, password : string) => {

        setLoadingAuth(true);

        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email, password}),
                credentials: "include"
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in fetching user");
                throw new Error(data.error || data.message || "Error in fetching user");
            }

            setErrorMsg(null);

            setUser(data.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoadingAuth(false);
        }
    }


    const signUp = async(firstName : string, lastName : string, email : string, password1: string, password2 : string) => {

        setLoadingAuth(true);
        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-up", {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({firstName, lastName, email, password1, password2}),
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                 setErrorMsg(data.error || data.message || "Error in fetching user");
                throw new Error(data.error || data.message || "Error in signing up");
            }

            setErrorMsg(null);
            setUser(data.data);
        }catch(err){
            console.error(err);
        }finally{
             setLoadingAuth(false);
        }
    }


    const signOut = async() => {

        try{

            const res = await fetch("http://localhost:5000/api/v1/auth/sign-out", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                setErrorMsg(data.error || data.message || "Error in signing out");
                throw new Error(data.error || data.message || "Error in signing out");
            }

            setErrorMsg(null);

            localStorage.removeItem('user');
            setUser(null);


        }catch(err){
           console.error(err);
        }

    }


    return <AuthContext.Provider value={{signIn, signUp, signOut, user, loadingAuth, errorMsg}}>
        {children}
    </AuthContext.Provider>

}


export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Please use the useAuthContext inside the AuthProvider");
    }

    return context;
}