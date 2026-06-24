"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf8f8] overflow-x-hidden">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-200/60 via-rose-100/40 to-transparent blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-pink-300/50 via-fuchsia-100/30 to-transparent blur-3xl" />
          </div>

          {/* Decorative rings — desktop only */}
          <div className="hidden sm:block absolute top-8 right-8 w-56 h-56 rounded-full border border-pink-200/50" />
          <div className="hidden sm:block absolute top-14 right-14 w-40 h-40 rounded-full border border-pink-100/40" />
          <div className="hidden sm:block absolute bottom-8 left-8 w-24 h-24 rounded-full border border-rose-200/40" />
          <div
            className="hidden sm:block absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-pink-200/50 to-transparent"
            style={{ transform: "rotate(12deg)" }}
          />

          <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
            <p
              className="text-[11px] tracking-[0.35em] uppercase text-pink-400 mb-6 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              We&apos;d love to hear from you
            </p>
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-light text-transparent bg-clip-text leading-[1.05] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                backgroundImage:
                  "linear-gradient(135deg, #be185d 0%, #ec4899 35%, #f9a8d4 60%, #fda4af 80%, #be185d 100%)",
                backgroundSize: "200% auto",
                animation: "shimmer 6s linear infinite",
              }}
            >
              Get in Touch
            </h1>
            <p
              className="text-base sm:text-lg text-rose-900/50 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Reach out anytime — we&apos;re always happy to help.
            </p>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="py-16 sm:py-20 relative">
          <div className="absolute right-0 top-0 w-[400px] h-full bg-gradient-to-l from-pink-100/30 to-transparent pointer-events-none hidden sm:block" />

          <div className="container mx-auto px-6 max-w-6xl">
            {/* Single column on mobile, 5-col split on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
              {/* ── Contact Info ── */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-4 font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    01 — Contact
                  </p>
                  <h2
                    className="text-3xl font-light text-rose-950/80 mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Contact Information
                  </h2>
                </div>

                {/* Info items */}
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-4 h-4" />,
                      label: "Email",
                      value: "hello@skyeavenue.com.au",
                      href: "mailto:hello@skyeavenue.com.au",
                    },
                    {
                      icon: <Phone className="w-4 h-4" />,
                      label: "Phone",
                      value: "+61 (0)2 9876 5432",
                      href: "tel:+61298765432",
                    },
                    {
                      icon: <MapPin className="w-4 h-4" />,
                      label: "Location",
                      value: "Sydney, Australia",
                      href: null,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-200/60 flex items-center justify-center text-pink-400 flex-shrink-0 mt-0.5 group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[10px] tracking-[0.25em] uppercase text-pink-300 mb-1"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-rose-900/60 font-light hover:text-pink-500 transition-colors duration-200 text-sm break-all"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p
                            className="text-rose-900/60 font-light text-sm"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hours card */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100" />
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-200/40 blur-xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-rose-200/30 blur-xl" />
                  <div className="relative p-6 sm:p-7">
                    <p
                      className="text-[10px] tracking-[0.25em] uppercase text-pink-400 mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Hours
                    </p>
                    <h3
                      className="text-xl font-light text-rose-950/70 mb-5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Business Hours
                    </h3>
                    <div
                      className="space-y-3 text-sm text-rose-900/55 font-light"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {[
                        ["Mon – Fri", "9am – 6pm AEDT"],
                        ["Saturday", "10am – 4pm AEDT"],
                        ["Sunday", "Closed"],
                      ].map(([day, time]) => (
                        <div
                          key={day}
                          className="flex items-center justify-between gap-4"
                        >
                          <span>{day}</span>
                          <span className="text-rose-900/40">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Contact Form ── */}
              <div className="lg:col-span-3">
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-pink-100/80" />
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl from-pink-100/60 to-transparent blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-rose-100/40 to-transparent blur-2xl" />

                  <div className="relative p-6 sm:p-10">
                    <p
                      className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-2 font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      02 — Message
                    </p>
                    <h2
                      className="text-3xl font-light text-rose-950/80 mb-8"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Send a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name + Email: stack on mobile, side-by-side on sm+ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-3.5 bg-[#fdf8f8]/80 border border-pink-100 rounded-2xl text-sm text-rose-950/80 placeholder:text-rose-300/60 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all duration-300 font-light"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-3.5 bg-[#fdf8f8]/80 border border-pink-100 rounded-2xl text-sm text-rose-950/80 placeholder:text-rose-300/60 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all duration-300 font-light"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>

                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-3.5 bg-[#fdf8f8]/80 border border-pink-100 rounded-2xl text-sm text-rose-950/80 placeholder:text-rose-300/60 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all duration-300 font-light"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />

                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-5 py-3.5 bg-[#fdf8f8]/80 border border-pink-100 rounded-2xl text-sm text-rose-950/80 placeholder:text-rose-300/60 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all duration-300 font-light resize-none"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full relative overflow-hidden rounded-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 disabled:opacity-60"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 transition-all duration-500 group-hover:opacity-90" />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                          style={{
                            backgroundImage:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                            animation: isSubmitting
                              ? "none"
                              : "sheen 2s ease-in-out infinite",
                          }}
                        />
                        <span className="relative flex items-center justify-center gap-3 text-white">
                          {isSubmitting ? (
                            "Sending…"
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
