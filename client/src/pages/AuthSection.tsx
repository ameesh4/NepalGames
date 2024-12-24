import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";


export default function AuthSection() {
    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }

    const [activeTab, setActiveTab] = useState("signin");

    return (
        <div className="h-screen w-screen">
            <div className="flex justify-center items-center h-full">
                <div className="max-w-md mx-auto w-3/5">
                <Card className="border-none shadow-2xl bg-background/50 backdrop-blur">
                    <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                        <SigninForm />
                        </TabsContent>
                        <TabsContent value="signup">
                        <SignupForm />
                        </TabsContent>
                    </Tabs>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    )
}