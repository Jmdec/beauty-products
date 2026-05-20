import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetailClient } from "@/components/product-detail-client";
import { getProductById, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

// Generate static params for all products
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Skye Avenue`,
    description: product.description,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  skincare: "#f9a8c9",
  fragrance: "#c4b5fd",
  wellness: "#86efac",
};

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const accentColor = CATEGORY_COLORS[product.category] ?? "#f9a8c9";

  // Related products — same category, exclude current
  const related = getProducts(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* ── Breadcrumb nav ── */}
        <div className="border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-xs text-foreground/40">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground/70 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>

        {/* ── Hero Product Section ── */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* ── Left: Image ── */}
              <div className="lg:sticky lg:top-20">
                {/* Main image */}
                <div
                  className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border/40 shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}18 0%, #fdf6f9 100%)`,
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Category badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70">
                      {product.category}
                    </span>
                  </div>

                  {/* Stock badge */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                      <span className="text-white font-semibold tracking-wide">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Size pill */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/60 rounded-full border border-border/50">
                    <span className="text-xs text-foreground/40 uppercase tracking-wider">
                      Size
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {product.size}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/60 rounded-full border border-border/50">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Right: Info ── */}
              <div className="flex flex-col gap-8">
                {/* Heading */}
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.25em] font-medium mb-3"
                    style={{ color: accentColor }}
                  >
                    {product.category}
                  </p>
                  <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-foreground/50 mt-3 text-base leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-foreground/40">AUD</span>
                </div>

                {/* Add to cart / quantity */}
                <ProductDetailClient product={product} />

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Benefits */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium mb-4">
                    Key Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/50 border border-border/40"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="text-sm text-foreground/70">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Ingredients */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium mb-4">
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-full border font-medium text-foreground/70"
                        style={{
                          borderColor: `${accentColor}60`,
                          backgroundColor: `${accentColor}12`,
                        }}
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Full description */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-medium mb-4">
                    About This Product
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { icon: "✦", label: "Free shipping", sub: "Over AUD $100" },
                    { icon: "◎", label: "Clean formula", sub: "No nasties" },
                    { icon: "↺", label: "Easy returns", sub: "30-day policy" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="flex flex-col items-center text-center p-3 rounded-2xl bg-muted/40 border border-border/40 gap-1.5"
                    >
                      <span
                        className="text-base"
                        style={{ color: accentColor }}
                      >
                        {badge.icon}
                      </span>
                      <span className="text-[11px] font-semibold text-foreground/80">
                        {badge.label}
                      </span>
                      <span className="text-[10px] text-foreground/40">
                        {badge.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16 border-t border-border/60">
            <div className="container mx-auto px-4">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-medium mb-2">
                    You May Also Like
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground capitalize">
                    More {product.category}
                  </h2>
                </div>
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-xs text-foreground/50 hover:text-primary transition-colors underline underline-offset-4"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
