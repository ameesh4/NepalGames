import axios from "axios";
import { useProfile } from "./ProfileContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";

type UserUpdate = {
    name: string
    age: number
    email: string
}

export default function ProfileDetail(){
    const { profile } = useProfile();

    const updateProfile = () => {
        const user: UserUpdate = {
            name: (document.getElementById("name") as HTMLInputElement).value,
            age: parseInt((document.getElementById("age") as HTMLInputElement).value),
            email: profile?.email || ""
        }

        const header = {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }

        axios.post("http://localhost:8000/api/edituser", user, header).then((res)=>{
            if (res.status === 200) {
                toast({
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully",
                    variant: "success",
                })
            }
        }).catch((err)=>{
            toast({
                title: "Error",
                description: err.response.data.message,
                variant: "destructive"
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={profile?.name} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input className="cursor-not-allowed" id="email" type="email" defaultValue={profile?.email} readOnly/>
                </div>
                <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="tel" defaultValue={profile?.age} />
                </div>
                <Button className="w-full" onClick={()=>updateProfile()}>Update Profile</Button>
            </CardContent>
        </Card>
    )
} 