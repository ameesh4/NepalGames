import { User } from "lucide-react";
import { useProfile } from "./ProfileContext";


export default function ProfileHeader() {
    const { profile } = useProfile();
    if (!profile) {
        window.location.href = "/auth";
    }

    return (
        <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{profile?.name}</h1>
                <p className="text-muted-foreground">{profile?.email}</p>
            </div>
        </div>
    )
}