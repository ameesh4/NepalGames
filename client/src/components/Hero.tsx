import { Button } from "./ui/button";
import home from "../assets/home.webp";
import { Container } from "./ui/Container";


export default function Hero(){
    return (
            <>
                <div className="relative bg-background">
                <div className="absolute inset-0">
                    <img
                    src={home}
                    alt="Hero background"
                    className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
                </div>
                    <Container>
                        <div className="relative py-32 sm:py-48 lg:py-56">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Elevate Your Style
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-300">
                                Discover our curated collection of premium fashion items. Where luxury meets contemporary design.
                                </p>
                                <div className="mt-10 flex gap-x-6">
                                <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200">
                                    Shop Now
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full text-black border-white hover:bg-white/10 hover:text-white">
                                    Learn More
                                </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
    )
}