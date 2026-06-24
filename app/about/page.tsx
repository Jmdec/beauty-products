import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Skye Avenue",
  description: "Discover the story behind Skye Avenue luxury beauty",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf8f8] overflow-x-hidden">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-200/60 via-rose-100/40 to-transparent blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-pink-300/50 via-fuchsia-100/30 to-transparent blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-rose-100/30 via-pink-50/20 to-fuchsia-100/30 blur-2xl" />
          </div>

          {/* Decorative rings — hidden on small screens to avoid overflow */}
          <div className="hidden sm:block absolute top-12 right-12 w-64 h-64 rounded-full border border-pink-200/50" />
          <div className="hidden sm:block absolute top-20 right-20 w-48 h-48 rounded-full border border-pink-100/40" />
          <div className="hidden sm:block absolute bottom-16 left-8 w-32 h-32 rounded-full border border-rose-200/40" />
          <div
            className="hidden sm:block absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-pink-200/60 to-transparent"
            style={{ transform: "rotate(15deg) translateX(50px)" }}
          />

          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
            <p
              className="text-[11px] tracking-[0.35em] uppercase text-pink-400 mb-6 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Est. Sydney, Australia
            </p>

            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-light text-transparent bg-clip-text leading-[1.05] mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                backgroundImage:
                  "linear-gradient(135deg, #be185d 0%, #ec4899 35%, #f9a8d4 60%, #fda4af 80%, #be185d 100%)",
                backgroundSize: "200% auto",
                animation: "shimmer 6s linear infinite",
              }}
            >
              Our Story
            </h1>

            <p
              className="text-base sm:text-xl text-rose-900/60 leading-relaxed max-w-2xl mx-auto font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Founded in Sydney, Australia, Skye Avenue is dedicated to bringing
              premium, thoughtfully curated beauty to women who appreciate
              quality and elegance.
            </p>

            <div className="mt-12 flex flex-col items-center gap-2 text-pink-300">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-pink-300" />
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Scroll
              </span>
            </div>
          </div>
        </section>

        {/* ── The Beginning ── */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <p
                  className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-4 font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  01 — Origin
                </p>
                <h2
                  className="text-3xl sm:text-5xl font-light text-rose-950/80 mb-8 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  The Beginning
                </h2>
                <div
                  className="space-y-5 text-rose-900/55 leading-relaxed font-light text-sm sm:text-base"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <p>
                    Skye Avenue was born from a passion for discovering and
                    sharing the world&apos;s finest beauty products. What
                    started as a personal collection has evolved into a
                    carefully curated marketplace dedicated to helping you find
                    the products that make you feel your best.
                  </p>
                  <p>
                    Every product in our collection is selected with intention,
                    quality, and your wellbeing in mind. We believe beauty is
                    not just about appearance, but about feeling confident and
                    taking time for self-care.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 max-w-sm mx-auto lg:max-w-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-200/80 to-rose-300/60 blur-sm" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p
                        className="text-8xl font-light text-transparent bg-clip-text"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          backgroundImage:
                            "linear-gradient(135deg, #be185d, #f9a8d4)",
                        }}
                      >
                        SA
                      </p>
                      <p
                        className="text-[10px] tracking-[0.4em] uppercase text-pink-400 mt-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Skye Avenue
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-pink-300/60" />
                  <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-rose-200/70" />
                </div>

                {/* Floating badge — positioned relative to card, inset so it never overflows */}
                <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(244,114,182,0.15)] border border-pink-100">
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase text-pink-400 mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Founded
                  </p>
                  <p
                    className="text-xl sm:text-2xl font-light text-rose-950/70"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Sydney, AU
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50/80 to-fuchsia-50/60" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

          <div className="relative container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p
                className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-4 font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                02 — Philosophy
              </p>
              <h2
                className="text-3xl sm:text-5xl font-light text-rose-950/80"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Our Values
              </h2>
            </div>

            {/* Stack on mobile, 3-col on md+ */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  num: "I",
                  title: "Quality First",
                  body: "Every product meets our rigorous standards for effectiveness and quality.",
                  gradient: "from-pink-200/60 via-rose-100/40 to-transparent",
                },
                {
                  num: "II",
                  title: "Authenticity",
                  body: "All products are sourced directly from luxury brands and are 100% authentic.",
                  gradient:
                    "from-fuchsia-200/50 via-pink-100/40 to-transparent",
                },
                {
                  num: "III",
                  title: "Customer Focused",
                  body: "Your satisfaction is our priority. We stand behind every product we sell.",
                  gradient: "from-rose-200/60 via-pink-100/30 to-transparent",
                },
              ].map((val) => (
                <div
                  key={val.num}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-7 sm:p-8 border border-pink-100/80 hover:border-pink-200 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(244,114,182,0.12)] overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                  />
                  <div className="relative">
                    <p
                      className="text-5xl font-light text-transparent bg-clip-text mb-6"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        backgroundImage:
                          "linear-gradient(135deg, #f9a8d4, #be185d)",
                      }}
                    >
                      {val.num}
                    </p>
                    <h3
                      className="text-xl font-light text-rose-950/80 mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {val.title}
                    </h3>
                    <p
                      className="text-sm text-rose-900/50 leading-relaxed font-light"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {val.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sustainable Beauty ── */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-pink-100/40 to-transparent pointer-events-none" />

          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative flex justify-center">
                <div className="w-full aspect-square max-w-[280px] sm:max-w-sm relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-100 to-rose-50 border border-pink-200/50" />
                  <div className="absolute inset-6 rounded-full bg-gradient-to-tl from-fuchsia-100/60 to-pink-50" />
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-white to-pink-50 border border-pink-100/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p
                        className="text-2xl sm:text-3xl font-light text-rose-900/60 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Beauty
                        <br />
                        <span
                          className="text-transparent bg-clip-text"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, #be185d, #f472b6)",
                          }}
                        >
                          & Earth
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-pink-300/60" />
                  <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-rose-400/50" />
                  <div className="absolute top-1/2 right-2 w-1.5 h-1.5 rounded-full bg-fuchsia-300/60" />
                </div>
              </div>

              <div>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-4 font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  03 — Commitment
                </p>
                <h2
                  className="text-3xl sm:text-5xl font-light text-rose-950/80 mb-8 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Sustainable Beauty
                </h2>
                <div
                  className="space-y-5 text-rose-900/55 leading-relaxed font-light text-sm sm:text-base"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <p>
                    We&apos;re committed to promoting sustainable and ethical
                    beauty practices. Many of the brands we partner with are
                    dedicated to minimizing environmental impact and supporting
                    fair trade practices.
                  </p>
                  <p>
                    We encourage our customers to make conscious choices about
                    the products they use and the impact those choices have on
                    our planet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Connect CTA ── */}
        <section className="py-20 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-500" />
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-600/40 via-transparent to-rose-300/20" />
          <div className="hidden sm:block absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="hidden sm:block absolute -top-12 -right-12 w-72 h-72 rounded-full border border-white/10" />
          <div className="hidden sm:block absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-white/10" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "sheen 4s ease-in-out infinite",
            }}
          />

          <div className="relative container mx-auto px-6 text-center max-w-2xl">
            <p
              className="text-[10px] tracking-[0.35em] uppercase text-pink-100/80 mb-6 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get in Touch
            </p>
            <h2
              className="text-4xl sm:text-6xl font-light text-white mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Let&apos;s Connect
            </h2>
            <p
              className="text-pink-100/80 mb-10 text-base sm:text-lg font-light leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Have questions? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 sm:px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-pink-50 transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes sheen {
          0%, 100% { background-position: -100% 0; }
          50% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
