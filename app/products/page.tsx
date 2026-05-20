import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductsGrid } from "@/components/products-grid";

export const metadata = {
  title: "Shop All Products | Skye Avenue",
  description:
    "Browse our complete collection of luxury beauty and skincare products",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* ── Editorial Header Banner ── */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-[#fdf0f5] via-[#fdf8fb] to-[#f8f0fd]">
          {/* Dot grid decoration */}
          <div
            className="absolute left-0 bottom-0 w-48 h-48 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e879a0 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          {/* Soft circle accent top-right */}
          <div className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative container mx-auto px-4 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Left: heading */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  Skye Avenue
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-none tracking-tight">
                  Our{" "}
                  <em className="not-italic text-primary italic">Collection</em>
                </h1>
                <p className="text-sm text-foreground/60 mt-4 max-w-sm leading-relaxed">
                  Carefully curated luxury beauty — skincare, fragrance &amp;
                  wellness for the modern woman.
                </p>
              </div>

              {/* Right: category quick links */}
              <div className="flex sm:flex-col gap-3 sm:gap-2 sm:items-end flex-wrap">
                {[
                  { label: "Skincare", color: "#f9a8c9", count: 7 },
                  { label: "Fragrance", color: "#c4b5fd", count: 2 },
                  { label: "Wellness", color: "#86efac", count: 3 },
                ].map((cat) => (
                  <a
                    key={cat.label}
                    href={`/products?category=${cat.label.toLowerCase()}`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group bg-white/70 hover:bg-white px-3 py-1.5 rounded-full border border-border/40 hover:border-primary/30"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.label}
                    <span className="text-xs text-foreground/40 ml-1">
                      ({cat.count})
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Products Section ── */}
        <section className="py-10 sm:py-14">
          <ProductsGrid
            category={searchParams.category}
            sort={searchParams.sort}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
