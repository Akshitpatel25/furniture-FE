import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import chairImage from "@/assets/chair-product.jpg";
import sofaImage from "@/assets/sofa-product.jpg";
import tableImage from "@/assets/table-product.jpg";

// Mock products data
const allProducts = [
  { id: "1", name: "Modern Oak Dining Chair", price: 299, image: chairImage, category: "Chairs" },
  { id: "2", name: "Contemporary Fabric Sofa", price: 1299, image: sofaImage, category: "Sofas" },
  { id: "3", name: "Minimalist Coffee Table", price: 449, image: tableImage, category: "Tables" },
  { id: "4", name: "Elegant Dining Chair", price: 279, image: chairImage, category: "Chairs" },
  { id: "5", name: "Luxury Sectional Sofa", price: 2199, image: sofaImage, category: "Sofas" },
  { id: "6", name: "Round Coffee Table", price: 399, image: tableImage, category: "Tables" },
  { id: "7", name: "Scandinavian Chair", price: 249, image: chairImage, category: "Chairs" },
  { id: "8", name: "Mid-Century Sofa", price: 1599, image: sofaImage, category: "Sofas" },
];

export default function Products() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection of furniture</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-card rounded-xl p-6 shadow-soft sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="chairs">Chairs</SelectItem>
                  <SelectItem value="sofas">Sofas</SelectItem>
                  <SelectItem value="tables">Tables</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={3000}
                step={50}
                className="mb-2"
              />
            </div>

            {/* Material Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Material</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Material</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="fabric">Fabric</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="leather">Leather</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" variant="outline">
              Reset Filters
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {allProducts.length} products
            </p>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
