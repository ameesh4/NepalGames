import { ShoppingCart, Menu, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./ui/Container";
import UserMenu from "./UserMenu";

export function Navbar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <a href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">NG</h1>
            </a>
          </div>

          <nav className="hidden lg:flex lg:gap-x-12 justify-center items-center">
            <a href="/" className="text-sm font-medium">Home</a>
            <a href="/shop" className="text-sm font-medium">Shop</a>
            <a href="/categories" className="text-sm font-medium">Categories</a>
            <a href="/about" className="text-sm font-medium">About</a>
          </nav>

          <div className="flex items-center">
            <div className="hidden lg:flex items-center">
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
              <UserMenu />
              <Button variant="ghost" size="icon" className="ml-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}