import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext"
import { memo } from "react";


const UserRoute = ({children} : {children : React.ReactNode}) => {

    const {user} = useAuthContext();

    if(user && user.role === "ADMIN"){
         
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>
}

export default memo(UserRoute);