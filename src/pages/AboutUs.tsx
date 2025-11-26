import { Users, Award, Truck, Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">About FurnitureHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing quality furniture and exceptional service to homes across the nation
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="w-full h-96 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛋️</span>
            </div>
            <p className="text-muted-foreground">Premium Furniture Collection</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded in 2015, FurnitureHub started with a simple mission: to make quality furniture 
              accessible to everyone. What began as a small warehouse in New York has grown into a 
              thriving online marketplace serving thousands of customers across the nation.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We believe that your home should be a reflection of your personality and style. That's why 
              we carefully curate our collection from trusted suppliers and manufacturers who share our 
              commitment to quality and sustainability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, FurnitureHub is proud to be a leading provider of quality furniture, with a dedicated 
              team of professionals committed to ensuring every customer has an exceptional experience.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Quality Products</h3>
            <p className="text-sm text-muted-foreground">
              We only stock furniture from trusted brands known for durability and craftsmanship.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Quick and reliable delivery to your doorstep with real-time tracking.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Customer Care</h3>
            <p className="text-sm text-muted-foreground">
              Exceptional customer service available to help you with any questions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              Join thousands of satisfied customers who trust FurnitureHub.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">5K+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">2K+</p>
              <p className="text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Trusted Brands</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Team</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Behind FurnitureHub is a dedicated team of professionals passionate about helping you 
          find the perfect furniture for your home. We work tirelessly to ensure quality, reliability, and excellent service.
        </p>
      </section>
    </div>
  );
}
