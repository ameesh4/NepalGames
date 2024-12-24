import { Navbar } from "@/components/NavBar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeatureProducts";
import axios from "axios";
import { useProfile } from "@/components/ProfileContext";
import { useEffect } from "react";


export default function Home() {
    const profile = useProfile();
    const token = localStorage.getItem("token");
    localStorage.removeItem("adminToken");
    if (!token || token === "undefined") {
        window.location.href = "/auth";
    }

    const header = {
        headers: {
            Authorization: `${token}`,
        }
    }
        
    useEffect(()=>{
        axios.post("http://localhost:8000/api/getuser", {}, header).then((res)=>{
            if (res.status === 200) {
                profile.setProfile(res.data.user);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }, [token])   

    return (
        <>
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <main>
                    <Hero />
                    <FeaturedProducts />
                </main>
            </div>
        </>
    )
}