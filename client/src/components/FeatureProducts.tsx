import { Card, CardContent, CardFooter } from "./ui/card";
import { Container } from "./ui/Container";

const products = [
    {
      id: 1,
      name: "EA FC 25",
      price: "Rs. 2199",
      image: "https://images.pushsquare.com/96159411bff9b/ea-sports-fc-25-cover.cover_large.jpg"
    },
    {
      id: 2,
      name: "Call of Duty Black Ops 6",
      price: "Rs. 5999",
      image: "https://bleedingcool.com/wp-content/uploads/2024/05/Call-of-Duty-Black-Ops-6-Artwork-900x900.jpg"
    },
    {
      id: 3,
      name: "Among Us",
      price: "Rs. 399",
      image: "https://images.wikia.com/among-us-wiki/images/b/bc/Wiki.png"
    },
    {
      id: 4,
      name: "GTA 5",
      price: "Rs. 1500",
      image: "https://cdn.bynogame.com/games/gta5-1662829149472.webp"
    }
  ];

export default function FeaturedProducts() {
    return (
        <section className="py-24 animate">
            <Container>
                <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Discover our carefully curated selection of premium items
                </p>
                </div>
                
                <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 motion-presets-fade">
                {products.map((product) => (
                    <Card key={product.id} className="group cursor-pointer">
                        <CardContent className="p-0">
                            <div className="aspect-square relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            </div>
                        </CardContent>
                        <CardFooter className="p-4">
                            <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{product.price}</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            </Container>
        </section>
    )
}