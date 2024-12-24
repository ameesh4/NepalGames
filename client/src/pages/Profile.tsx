import { Navbar } from "@/components/NavBar"
import { OrderHistory } from "@/components/orderHistory"
import ProfileDetail from "@/components/profileDetail"
import ProfileHeader from "@/components/profileHeader"
import { Container } from "@/components/ui/Container"



export default function Profile() {
    return (
        <>
            <Navbar />
            <div className="py-10">
            <Container>
                <div className="space-y-8">
                <ProfileHeader />
                <div className="grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-4">
                    <ProfileDetail />
                    </div>
                    <div className="md:col-span-8">
                    <OrderHistory />
                    </div>
                </div>
                </div>
            </Container>
            </div>
        </>
    )
}