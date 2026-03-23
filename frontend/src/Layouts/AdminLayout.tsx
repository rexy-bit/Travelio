import { memo } from "react";
import { Outlet } from "react-router-dom"
import AdminHeader from "../AdminComponents/BaseComponents/AdminHeader";


const AdminLayout = () => {

    return(
        <>
        <AdminHeader/>
        <main className="w-full">
            <Outlet/>
        </main>
        </>
    )
}

export default memo(AdminLayout);