"use client";

import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Product } from "@/lib/products";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const CATEGORY_COLORS: Record<string, string> = {
  skincare: "#f9a8c9",
  fragrance: "#c4b5fd",
  wellness: "#86efac",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    });
    toast.success(`Added ${product.name} to your bag ✨`);
  };

  const accentColor = CATEGORY_COLORS[product.category] ?? "#f9a8c9";

  return (
    <article className="group relative flex flex-col h-full min-w-0 overflow-hidden rounded-2xl ...">
      {/* ── Image ── */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-sm font-medium tracking-wide uppercase">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick actions — slide up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors shrink-0">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        {/* Category dot-badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-foreground/70">
            {product.category}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name */}
        <h3 className="font-serif text-lg leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/50">
          <div>
            <span className="text-base font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-foreground/40 ml-2">
              {product.size}
            </span>
          </div>

          {/* Fallback add-to-cart button (visible when not hovering on mobile) */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center text-black transition-all disabled:opacity-40"
            style={{ backgroundColor: accentColor }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          {/* Static "View" text on desktop — no longer a link */}
          <span className="hidden sm:flex items-center text-xs text-foreground/30">
            View →
          </span>
        </div>
      </div>

      {/* Accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: accentColor }}
      />
    </article>
  );
}
