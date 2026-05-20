"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Bell, Sparkles, Star, X, ArrowRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Summer Collection Launch",
    date: "May 18, 2024",
    tag: "New Arrival",
    excerpt:
      "Discover refreshing scents and lightweight skincare for the warm season.",
    content:
      "Our new summer collection is now available! Discover refreshing scents and lightweight skincare products perfect for the warm season. From hydrating mists to sun-kissed glow serums, each product is crafted to keep your skin radiant all summer long.",
    featured: true,
  },
  {
    id: 2,
    title: "Free Shipping on Orders Over $100",
    date: "May 15, 2024",
    tag: "Offer",
    excerpt: "Enjoy complimentary delivery on all orders over $100 AUD.",
    content:
      "We're excited to announce free shipping on all orders over $100 AUD. Shop now and enjoy complimentary delivery to your doorstep — no code needed, automatically applied at checkout.",
    featured: false,
  },
  {
    id: 3,
    title: "New Wellness Line",
    date: "May 10, 2024",
    tag: "New Arrival",
    excerpt:
      "Organic, plant-based products to enhance your daily self-care routine.",
    content:
      "Introducing our latest wellness collection featuring organic, plant-based products designed to enhance your daily self-care routine. Each product is thoughtfully formulated with natural botanicals to nourish both body and mind.",
    featured: true,
  },
  {
    id: 4,
    title: "Customer Appreciation Week",
    date: "May 5, 2024",
    tag: "Event",
    excerpt:
      "Exclusive discounts, early access, and special gifts just for you.",
    content:
      "Join us for our Customer Appreciation Week! Enjoy exclusive discounts, early access to new products, and special gifts with every purchase. Our way of saying thank you for being part of the Skye Avenue family.",
    featured: false,
  },
  {
    id: 5,
    title: "Sustainability Update",
    date: "April 30, 2024",
    tag: "Update",
    excerpt: "All our packaging is now 100% recyclable and eco-friendly.",
    content:
      "We're committed to sustainability. All our packaging is now 100% recyclable and made from eco-friendly materials. This is part of our ongoing commitment to reducing our environmental footprint while delivering the luxury experience you deserve.",
    featured: false,
  },
  {
    id: 6,
    title: "New Blog: Skincare Tips for Winter",
    date: "April 25, 2024",
    tag: "Blog",
    excerpt: "Expert skincare tips and product picks for the colder months.",
    content:
      "Check out our latest blog post featuring expert skincare tips and product recommendations for the winter season. Learn how to keep your skin hydrated, protected, and glowing even through the harshest cold months.",
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  "New Arrival": "linear-gradient(135deg, #fce7f3, #fbcfe8)",
  Offer: "linear-gradient(135deg, #fef3c7, #fde68a)",
  Event: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
  Update: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
  Blog: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
};
const tagText: Record<string, string> = {
  "New Arrival": "#be185d",
  Offer: "#92400e",
  Event: "#5b21b6",
  Update: "#065f46",
  Blog: "#1e40af",
};

export default function AnnouncementsPage() {
  const [selected, setSelected] = useState<(typeof announcements)[0] | null>(
    null,
  );
  const featured = announcements.filter((a) => a.featured);

  return (
    <>
      <Header />
      <main
        className="bg-[#fdf8f8]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Hero ── */}
        <section className="relative min-h-[44vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-pink-200/60 via-rose-100/40 to-transparent blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full bg-gradient-to-tl from-pink-300/50 via-fuchsia-100/30 to-transparent blur-3xl" />
          </div>
          <div className="absolute top-8 right-10 w-52 h-52 rounded-full border border-pink-200/50" />
          <div className="absolute top-16 right-[4.5rem] w-36 h-36 rounded-full border border-pink-100/40" />
          <div className="absolute bottom-6 left-8 w-20 h-20 rounded-full border border-rose-200/40" />
          <div
            className="absolute top-0 right-[38%] w-px h-full bg-gradient-to-b from-transparent via-pink-200/40 to-transparent"
            style={{ transform: "rotate(10deg)" }}
          />

          <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
                border: "1px solid #f9a8d4",
              }}
            >
              <Bell className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-pink-500 font-medium">
                Latest Updates
              </span>
            </div>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-light text-transparent bg-clip-text leading-[1.05] mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                backgroundImage:
                  "linear-gradient(135deg, #be185d 0%, #ec4899 35%, #f9a8d4 60%, #fda4af 80%, #be185d 100%)",
                backgroundSize: "200% auto",
                animation: "shimmer 6s linear infinite",
              }}
            >
              Announcements
            </h1>
            <p className="text-lg text-rose-900/50 font-light max-w-xl mx-auto">
              Stay updated with our latest news, product launches, and exclusive
              offers.
            </p>
          </div>
        </section>

        {/* ── Featured ── */}
        {featured.length > 0 && (
          <section className="py-14">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-4 h-4 text-pink-400" fill="#ec4899" />
                <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 font-medium">
                  Featured
                </p>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: "linear-gradient(90deg, #fbcfe8, transparent)",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {featured.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className="group relative text-left rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100"
                    style={{
                      background: "white",
                      border: "1px solid #fbcfe8",
                      boxShadow: "0 4px 20px rgba(236,72,153,0.06)",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4)"
                            : "linear-gradient(90deg, #f9a8d4, #ec4899, #be185d)",
                      }}
                    />
                    <div className="p-7">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium"
                          style={{
                            background:
                              tagColors[a.tag] ?? tagColors["New Arrival"],
                            color: tagText[a.tag] ?? "#be185d",
                          }}
                        >
                          <Sparkles className="w-3 h-3" />
                          {a.tag}
                        </span>
                        <span className="text-xs text-rose-300 font-light">
                          {a.date}
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-light text-rose-900 mb-2 group-hover:text-pink-700 transition-colors duration-300"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {a.title}
                      </h3>
                      <p className="text-sm text-rose-500 font-light leading-relaxed mb-5">
                        {a.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-pink-500 font-medium group-hover:gap-2.5 transition-all duration-300">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All Cards ── */}
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <Bell className="w-4 h-4 text-pink-400" />
              <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 font-medium">
                All Announcements
              </p>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, #fbcfe8, transparent)",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className="group relative text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-100"
                  style={{ background: "white", border: "1px solid #fbcfe8" }}
                >
                  {/* number badge */}
                  <div
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-pink-400"
                    style={{
                      background: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="p-6 pr-12">
                    <span
                      className="inline-flex mb-4 px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-medium"
                      style={{
                        background:
                          tagColors[a.tag] ?? tagColors["New Arrival"],
                        color: tagText[a.tag] ?? "#be185d",
                      }}
                    >
                      {a.tag}
                    </span>
                    <h3
                      className="text-lg font-light text-rose-900 mb-2 group-hover:text-pink-700 transition-colors duration-200 line-clamp-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-xs text-rose-400 font-light leading-relaxed line-clamp-2 mb-4">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-rose-300 font-light">
                        {a.date}
                      </span>
                      <span className="text-[11px] text-pink-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  {/* bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section
          className="py-20 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fdf8f8 100%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-200/30 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-rose-200/30 blur-3xl" />
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #ec4899 30%, #f9a8d4 50%, #ec4899 70%, transparent)",
            }}
          />
          <div className="relative container mx-auto px-4 text-center max-w-xl">
            <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-4 font-medium">
              Newsletter
            </p>
            <h2
              className="text-4xl sm:text-5xl font-light text-rose-900 mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Stay in the Loop
            </h2>
            <p className="text-rose-500 font-light mb-10 leading-relaxed">
              Subscribe to receive the latest announcements, exclusive offers,
              and skincare tips right in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full text-sm text-rose-900 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 font-light"
                style={{ background: "white", border: "1px solid #fbcfe8" }}
              />
              <button
                className="px-7 py-3.5 rounded-full text-sm font-medium text-white whitespace-nowrap shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #be185d, #ec4899)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* ── Modal ── */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm" />
            {/* panel */}
            <div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-pink-200"
              onClick={(e) => e.stopPropagation()}
              style={{ background: "white" }}
            >
              {/* gradient top */}
              <div
                className="h-1.5"
                style={{
                  background:
                    "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4, #ec4899, #be185d)",
                }}
              />

              <div className="p-8">
                {/* close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-pink-50 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* tag + date */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{
                      background:
                        tagColors[selected.tag] ?? tagColors["New Arrival"],
                      color: tagText[selected.tag] ?? "#be185d",
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {selected.tag}
                  </span>
                  <span className="text-xs text-rose-300 font-light">
                    {selected.date}
                  </span>
                </div>

                {/* title */}
                <h2
                  className="text-3xl font-light text-rose-900 mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {selected.title}
                </h2>

                {/* divider */}
                <div
                  className="h-px mb-5"
                  style={{
                    background: "linear-gradient(90deg, #fbcfe8, transparent)",
                  }}
                />

                {/* body */}
                <p className="text-sm text-rose-600 font-light leading-relaxed">
                  {selected.content}
                </p>

                {/* close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="mt-8 w-full py-3.5 rounded-full text-sm font-medium text-white shadow-md shadow-pink-100 hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #be185d, #ec4899)",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </>
  );
}
