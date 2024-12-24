import { Outlet } from "react-router-dom";
import AppSidebar from "./components/appsidebar";
import { SidebarProvider } from "./components/ui/sidebar";



export default function Layout (){
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-screen h-screen">
                    <Outlet />
                </div>
            </SidebarProvider>
        </>
    )
} 