import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sofa, Bed, Armchair, Lamp } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import heroImage from "@/assets/hero-furniture.jpg";
import chairImage from "@/assets/chair-product.jpg";
import sofaImage from "@/assets/sofa-product.jpg";
import tableImage from "@/assets/table-product.jpg";

const featuredProducts = [
  { id: "1", name: "Modern Oak Dining Chair", price: 299, image: chairImage, category: "Chairs" },
  { id: "2", name: "Contemporary Fabric Sofa", price: 1299, image: sofaImage, category: "Sofas" },
  { id: "3", name: "Minimalist Coffee Table", price: 449, image: tableImage, category: "Tables" },
  { id: "4", name: "Elegant Dining Chair", price: 279, image: chairImage, category: "Chairs" },
];

const categories = [
  { name: "Living Room", icon: Sofa, count: 245, color: "bg-accent-light" },
  { name: "Bedroom", icon: Bed, count: 189, color: "bg-secondary" },
  { name: "Dining", icon: Armchair, count: 156, color: "bg-muted" },
  { name: "Lighting", icon: Lamp, count: 98, color: "bg-accent-light" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Transform Your Space with Quality Furniture
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our curated collection of modern and timeless pieces for every room in your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products" className="gap-2">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect pieces for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className={`${category.color} rounded-2xl p-8 text-center hover:shadow-medium transition-all duration-300`}>
                  <div className="bg-background rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked favorites from our collection
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/products">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose FurnitureHub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-accent-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">On orders over $500</p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
            <p className="text-muted-foreground">Premium materials & craftsmanship</p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-muted-foreground">30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
}
