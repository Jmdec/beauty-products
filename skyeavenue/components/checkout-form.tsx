"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Upload,
  X,
  CreditCard,
  Banknote,
  ImageIcon,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

type PaymentMethod = "cod" | "card";

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    cardName: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 12.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setPaymentScreenshot(file);
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postcode
    ) {
      toast.error("Please fill in all shipping fields");
      return;
    }
    if (paymentMethod === "card" && !paymentScreenshot) {
      toast.error("Please upload your payment screenshot");
      return;
    }
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
    toast.success("Order placed successfully! 🎉");
  };

  const inputClass = [
    "w-full px-5 py-3.5 rounded-2xl text-sm font-light",
    "bg-white border border-pink-200",
    "text-rose-950 placeholder:text-rose-300",
    "focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100",
    "transition-all duration-300",
  ].join(" ");

  // ── Empty cart ──
  if (items.length === 0 && !orderPlaced) {
    return (
      <section
        className="py-16 bg-[#fdf8f8]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl font-light text-rose-900 mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your cart is empty
          </h2>
          <p className="text-rose-400 mb-8 font-light">
            Add some products before proceeding to checkout
          </p>
          <Link href="/products">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #be185d, #ec4899)",
              }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Shopping
            </button>
          </Link>
        </div>
      </section>
    );
  }

  // ── Order placed ──
  if (orderPlaced) {
    return (
      <section
        className="py-16 bg-[#fdf8f8]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-3xl p-10 text-center space-y-6 overflow-hidden bg-white shadow-xl shadow-pink-100">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4, #ec4899, #be185d)",
                }}
              />
              <div className="flex justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-pink-200"
                  style={{
                    background: "linear-gradient(135deg, #be185d, #ec4899)",
                  }}
                >
                  <Check className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h2
                  className="text-3xl font-light mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#be185d",
                  }}
                >
                  Thank You!
                </h2>
                <p className="text-rose-400 font-light">
                  Your order has been placed successfully
                </p>
              </div>
              <div
                className="rounded-2xl p-4 text-left"
                style={{
                  background: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
                  border: "1px solid #fbcfe8",
                }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-pink-400 mb-1">
                  Order Number
                </p>
                <p
                  className="text-xl font-light text-rose-800"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
              {paymentMethod === "cod" && (
                <div
                  className="rounded-2xl p-4 text-left"
                  style={{ background: "#fdf2f8", border: "1px solid #fbcfe8" }}
                >
                  <p className="text-sm text-rose-600 font-light">
                    💳 You selected{" "}
                    <span className="font-medium text-pink-600">
                      Cash on Delivery
                    </span>
                    . Please prepare the exact amount upon delivery.
                  </p>
                </div>
              )}
              <p className="text-sm text-rose-400 font-light">
                Confirmation sent to{" "}
                <span className="font-medium text-rose-600">
                  {formData.email}
                </span>
              </p>
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => router.push("/products")}
                  className="w-full py-3.5 rounded-full text-sm font-medium text-white shadow-md shadow-pink-200"
                  style={{
                    background: "linear-gradient(135deg, #be185d, #ec4899)",
                  }}
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3.5 rounded-full text-sm font-light text-rose-400 border border-pink-200 hover:border-pink-400 hover:text-rose-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Card style ──
  const cardStyle = {
    background: "white",
    border: "1px solid #fbcfe8",
    boxShadow: "0 4px 24px rgba(236,72,153,0.07)",
  };

  return (
    <section
      className="py-8 sm:py-12 bg-[#fdf8f8]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping */}
              <div
                className="relative rounded-3xl p-7 overflow-hidden"
                style={cardStyle}
              >
                {/* gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4)",
                  }}
                />
                <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-1 mt-1">
                  01
                </p>
                <h2
                  className="text-2xl font-light text-rose-900 mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div
                className="relative rounded-3xl p-7 overflow-hidden"
                style={cardStyle}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #ec4899, #f9a8d4, #be185d)",
                  }}
                />
                <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-1 mt-1">
                  02
                </p>
                <h2
                  className="text-2xl font-light text-rose-900 mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Payment Method
                </h2>

                {/* Method toggles */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300"
                    style={{
                      borderColor:
                        paymentMethod === "cod" ? "#ec4899" : "#fbcfe8",
                      background:
                        paymentMethod === "cod"
                          ? "linear-gradient(135deg, #fdf2f8, #fce7f3)"
                          : "white",
                    }}
                  >
                    {paymentMethod === "cod" && (
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #be185d, #ec4899)",
                        }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          paymentMethod === "cod"
                            ? "linear-gradient(135deg, #fce7f3, #fbcfe8)"
                            : "#fdf2f8",
                        border: "1px solid #fbcfe8",
                      }}
                    >
                      <Banknote className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-rose-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-rose-400 font-light mt-0.5">
                        Pay when you receive
                      </p>
                    </div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300"
                    style={{
                      borderColor:
                        paymentMethod === "card" ? "#ec4899" : "#fbcfe8",
                      background:
                        paymentMethod === "card"
                          ? "linear-gradient(135deg, #fdf2f8, #fce7f3)"
                          : "white",
                    }}
                  >
                    {paymentMethod === "card" && (
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #be185d, #ec4899)",
                        }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          paymentMethod === "card"
                            ? "linear-gradient(135deg, #fce7f3, #fbcfe8)"
                            : "#fdf2f8",
                        border: "1px solid #fbcfe8",
                      }}
                    >
                      <CreditCard className="w-5 h-5 text-pink-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-rose-900">
                        Card / Bank Transfer
                      </p>
                      <p className="text-xs text-rose-400 font-light mt-0.5">
                        Upload payment proof
                      </p>
                    </div>
                  </button>
                </div>

                {/* COD notice */}
                {paymentMethod === "cod" && (
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
                      border: "1px solid #fbcfe8",
                    }}
                  >
                    <p className="text-[10px] tracking-[0.25em] uppercase text-pink-400 mb-2">
                      Note
                    </p>
                    <p className="text-sm text-rose-700 font-light leading-relaxed">
                      Please prepare the{" "}
                      <span className="font-medium text-rose-800">
                        exact amount
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-pink-600">
                        ${total.toFixed(2)}
                      </span>{" "}
                      upon delivery. Our rider will not carry change.
                    </p>
                  </div>
                )}

                {/* Card details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    {/* Bank info */}
                    <div
                      className="rounded-2xl p-5"
                      style={{
                        background: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
                        border: "1px solid #fbcfe8",
                      }}
                    >
                      <p className="text-[10px] tracking-[0.25em] uppercase text-pink-400 mb-3">
                        Transfer To
                      </p>
                      <div className="space-y-2.5 text-sm">
                        {[
                          ["Bank", "Commonwealth Bank"],
                          ["Account Name", "Skye Avenue Pty Ltd"],
                          ["BSB", "062-000"],
                          ["Account No.", "1234 5678"],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between">
                            <span className="text-rose-400 font-light">
                              {label}
                            </span>
                            <span className="text-rose-800 font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                        <div
                          className="flex justify-between pt-2.5 mt-1"
                          style={{ borderTop: "1px solid #fbcfe8" }}
                        >
                          <span className="text-rose-400 font-light">
                            Amount
                          </span>
                          <span className="font-semibold text-pink-600">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder / Account Name (optional)"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={inputClass}
                    />

                    {/* Upload */}
                    <div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-pink-400 mb-3">
                        Upload Payment Screenshot{" "}
                        <span className="text-pink-500">*</span>
                      </p>
                      {!screenshotPreview ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed transition-all duration-300 group"
                          style={{
                            borderColor: "#fbcfe8",
                            background: "#fdf8f8",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#ec4899";
                            e.currentTarget.style.background = "#fdf2f8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#fbcfe8";
                            e.currentTarget.style.background = "#fdf8f8";
                          }}
                        >
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, #fce7f3, #fbcfe8)",
                              border: "1px solid #f9a8d4",
                            }}
                          >
                            <Upload className="w-5 h-5 text-pink-500" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-rose-600 font-light">
                              Click to upload screenshot
                            </p>
                            <p className="text-xs text-rose-300 mt-1">
                              PNG, JPG, WEBP accepted
                            </p>
                          </div>
                        </button>
                      ) : (
                        <div
                          className="relative rounded-2xl overflow-hidden"
                          style={{ border: "1px solid #fbcfe8" }}
                        >
                          <div className="relative w-full h-48 bg-rose-50">
                            <Image
                              src={screenshotPreview}
                              alt="Payment screenshot"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{
                              background:
                                "linear-gradient(135deg, #fdf2f8, #fce7f3)",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-pink-400" />
                              <span className="text-xs text-rose-600 font-light truncate max-w-[180px]">
                                {paymentScreenshot?.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removeScreenshot}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-100 transition-colors"
                            >
                              <X className="w-3.5 h-3.5 text-rose-400" />
                            </button>
                          </div>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full relative overflow-hidden rounded-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 disabled:opacity-60 group shadow-lg shadow-pink-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, #be185d, #ec4899, #f472b6)",
                  }}
                />
                <span className="relative text-white flex items-center justify-center gap-2">
                  {isProcessing
                    ? "Processing…"
                    : `Place Order — $${total.toFixed(2)}`}
                </span>
              </button>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div>
            <div
              className="relative rounded-3xl p-6 sticky top-24 overflow-hidden"
              style={cardStyle}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, #be185d, #ec4899, #f9a8d4, #ec4899, #be185d)",
                }}
              />
              <p className="text-[10px] tracking-[0.35em] uppercase text-pink-400 mb-1 mt-1">
                Summary
              </p>
              <h2
                className="text-2xl font-light text-rose-900 mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Order Summary
              </h2>

              <div
                className="space-y-4 mb-6 pb-6 max-h-[280px] overflow-y-auto"
                style={{ borderBottom: "1px solid #fbcfe8" }}
              >
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="relative w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ border: "1px solid #fbcfe8" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-light text-rose-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-rose-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-rose-700 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="space-y-3 text-sm mb-6 pb-6 font-light"
                style={{ borderBottom: "1px solid #fbcfe8" }}
              >
                {[
                  ["Subtotal", `$${subtotal.toFixed(2)}`],
                  [
                    "Shipping",
                    shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`,
                  ],
                  ["Tax (10%)", `$${tax.toFixed(2)}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-rose-500">{label}</span>
                    <span
                      className={
                        value === "Free"
                          ? "text-pink-500 font-medium"
                          : "text-rose-700"
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-sm text-rose-500 font-light">Total</span>
                <span
                  className="text-2xl font-light text-transparent bg-clip-text"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    backgroundImage:
                      "linear-gradient(135deg, #be185d, #ec4899)",
                  }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <div
                className="flex items-center gap-2 pt-4"
                style={{ borderTop: "1px solid #fbcfe8" }}
              >
                {paymentMethod === "cod" ? (
                  <Banknote className="w-4 h-4 text-pink-400" />
                ) : (
                  <CreditCard className="w-4 h-4 text-pink-400" />
                )}
                <span className="text-xs text-rose-400 font-light">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Card / Bank Transfer"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
}
