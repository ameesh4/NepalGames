import { LogOut, Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarImage } from "./avatar";


export default function NavBar() {
    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    }

    return (
        <div className="flex w-full bg-zinc-800 h-28 justify-center items-center">
            <div className="flex w-3/5 space-x-4 justify-center">
                <div className="">
                    <h1 className="text-2xl text-white">Logo</h1>
                </div>
                <div className="flex w-3/5">
                    <Input placeholder="Search..." className="bg-white text-zinc-800 rounded-l-sm rounded-r-none h-10"></Input>
                    <Button className="bg-sky-800 hover:bg-sky-900 rounded-l-none rounded-r-sm h-10"><Search /></Button>
                </div>
                <div className="">
                    <Avatar className="bg-white p-2">
                        <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+" />
                    </Avatar>
                </div>
                <div>
                    <Avatar className="p-2 bg-white">
                        <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWNhcnQiPjxjaXJjbGUgY3g9IjgiIGN5PSIyMSIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMjEiIHI9IjEiLz48cGF0aCBkPSJNMi4wNSAyLjA1aDJsMi42NiAxMi40MmEyIDIgMCAwIDAgMiAxLjU4aDkuNzhhMiAyIDAgMCAwIDEuOTUtMS41N2wxLjY1LTcuNDNINS4xMiIvPjwvc3ZnPg=="/>
                    </Avatar>
                </div>
                <div>
                    <Avatar className="p-2 bg-red-500">
                        <LogOut color="white" onClick={() => logOut()} />
                    </Avatar>
                </div>
            </div>
        </div>
    )
}