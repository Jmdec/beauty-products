import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const categories = [
    { name: "Skincare", href: "/products?category=skincare" },
    { name: "Fragrance", href: "/products?category=fragrance" },
    { name: "Wellness", href: "/products?category=wellness" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <HeroSection />

        {/* Categories Section */}
        <section className="py-12 sm:py-16 bg-background border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-center text-foreground mb-8 sm:mb-12">
              Shop by Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group"
                >
                  <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all">
                    <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:bg-primary/5 transition-colors">
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-5 h-5 mt-2 text-primary/60 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                  Featured Collection
                </h2>
                <p className="text-foreground/60">
                  Our most-loved products handpicked for you
                </p>
              </div>

              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto text-primary hover:bg-primary/10 rounded-md"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 sm:py-16 bg-accent/5 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  100% Authentic
                </h3>
                <p className="text-sm text-foreground/60">
                  Every product is sourced directly from luxury brands
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Fast Shipping
                </h3>
                <p className="text-sm text-foreground/60">
                  Free shipping on orders over AUD $100
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-sm text-foreground/60">
                  30-day returns on all purchases, no questions asked
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center space-y-4 sm:space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-foreground/60">
                Be the first to know about new releases, exclusive offers, and
                beauty tips from our experts.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-md bg-card border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-3 font-semibold whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-xs text-foreground/50">
                We&apos;ll never share your email. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
