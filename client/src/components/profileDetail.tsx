import { useProfile } from "./ProfileContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


export default function ProfileDetail(){
    const { profile } = useProfile();

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
                <Input id="email" type="email" defaultValue={profile?.email} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="tel" defaultValue={profile?.age} />
                </div>
                <Button className="w-full">Update Profile</Button>
            </CardContent>
        </Card>
    )
} 