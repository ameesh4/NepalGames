import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function UserMenu() {
    let navigate = useNavigate();

    const routeChange= (url: string) => {
        navigate(url);
    }

    const signout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                    <User className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>routeChange("/profile")}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>routeChange("/orders")} >Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>signout()}>Log Out</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}