"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";

interface ProductsGridProps {
  category?: string;
  sort?: string;
}

const CATEGORY_OPTIONS = [
  { value: "", label: "All", count: products.length },
  {
    value: "skincare",
    label: "Skincare",
    count: products.filter((p) => p.category === "skincare").length,
  },
  {
    value: "fragrance",
    label: "Fragrance",
    count: products.filter((p) => p.category === "fragrance").length,
  },
  {
    value: "wellness",
    label: "Wellness",
    count: products.filter((p) => p.category === "wellness").length,
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price ↑" },
  { value: "price-high", label: "Price ↓" },
  { value: "name", label: "A → Z" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 10000;
const STEP = 50;

// ── Drag-based dual range slider ──────────────────────────────────────────────
function DualRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const valueFromEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const track = trackRef.current;
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const ratio = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1,
      );
      const raw = min + ratio * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step],
  );

  const onPointerDown =
    (thumb: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      dragging.current = thumb;

      const move = (ev: MouseEvent | TouchEvent) => {
        const v = valueFromEvent(ev);
        if (v === null) return;
        if (dragging.current === "min") {
          onChange([Math.min(v, value[1] - step), value[1]]);
        } else {
          onChange([value[0], Math.max(v, value[0] + step)]);
        }
      };

      const up = () => {
        dragging.current = null;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchend", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("mouseup", up);
      window.addEventListener("touchend", up);
    };

  const onTrackClick = (e: React.MouseEvent) => {
    if (dragging.current) return;
    const v = valueFromEvent(e.nativeEvent);
    if (v === null) return;
    const distMin = Math.abs(v - value[0]);
    const distMax = Math.abs(v - value[1]);
    if (distMin <= distMax) {
      onChange([Math.min(v, value[1] - step), value[1]]);
    } else {
      onChange([value[0], Math.max(v, value[0] + step)]);
    }
  };

  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1">
            From
          </span>
          <span className="text-sm font-light tracking-wide text-foreground">
            ${value[0].toLocaleString()}
          </span>
        </div>
        <div className="h-px w-6 bg-border/60" />
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1">
            To
          </span>
          <span className="text-sm font-light tracking-wide text-foreground">
            ${value[1].toLocaleString()}
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        onClick={onTrackClick}
        className="relative h-px bg-border/60 cursor-pointer select-none my-4"
      >
        <div
          className="absolute h-px bg-foreground/80 pointer-events-none transition-all duration-75"
          style={{
            left: `${pct(value[0])}%`,
            right: `${100 - pct(value[1])}%`,
          }}
        />
        {/* Min thumb */}
        <div
          onMouseDown={onPointerDown("min")}
          onTouchStart={onPointerDown("min")}
          className="absolute w-4 h-4 bg-background border border-foreground/60 rounded-full -translate-y-1/2 top-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing hover:border-foreground transition-all duration-150 hover:scale-125 z-10"
          style={{ left: `${pct(value[0])}%` }}
        />
        {/* Max thumb */}
        <div
          onMouseDown={onPointerDown("max")}
          onTouchStart={onPointerDown("max")}
          className="absolute w-4 h-4 bg-background border border-foreground/60 rounded-full -translate-y-1/2 top-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing hover:border-foreground transition-all duration-150 hover:scale-125 z-10"
          style={{ left: `${pct(value[1])}%` }}
        />
      </div>

      {/* Presets */}
      <div className="flex gap-1.5 mt-5 flex-wrap">
        {(
          [
            [0, 500],
            [500, 2000],
            [2000, 5000],
            [5000, 10000],
          ] as [number, number][]
        ).map(([mn, mx]) => (
          <button
            key={`${mn}-${mx}`}
            onClick={() => onChange([mn, mx])}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-300 tracking-wide ${
              value[0] === mn && value[1] === mx
                ? "border-foreground/60 text-foreground bg-foreground/5"
                : "border-border/40 text-foreground/40 hover:border-foreground/30 hover:text-foreground/70"
            }`}
          >
            ${mn.toLocaleString()}–${mx === 10000 ? "10k" : mx.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Mobile Filter Sheet ───────────────────────────────────────────────────────
function MobileFilterSheet({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  search,
  setSearch,
  clearAll,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  search: string;
  setSearch: (v: string) => void;
  clearAll: () => void;
  resultCount: number;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-background rounded-t-2xl border-t border-border/40
          transition-transform duration-400 ease-out
          max-h-[85vh] overflow-y-auto
          ${open ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="px-5 pb-8 pt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
              Filters
            </p>
            <button
              onClick={onClose}
              className="text-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-foreground/30 mb-3">
              Search
            </p>
            <div className="flex items-center gap-2 border border-border/40 rounded-full px-4 py-2.5">
              <Search className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="bg-transparent text-[13px] tracking-wide outline-none flex-1 placeholder:text-foreground/30"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X className="w-3 h-3 text-foreground/40 hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-foreground/30 mb-3">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-[13px] tracking-wide border transition-all duration-200 ${
                    selectedCategory === cat.value
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "border-border/40 text-foreground/50 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-foreground/30 mb-3">
              Price Range
            </p>
            <DualRangeSlider
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={priceRange}
              onChange={setPriceRange}
            />
          </div>

          {/* Sort */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-foreground/30 mb-3">
              Sort By
            </p>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 rounded-full text-[13px] tracking-wide border transition-all duration-200 ${
                    sortBy === opt.value
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "border-border/40 text-foreground/50 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                clearAll();
                onClose();
              }}
              className="flex-1 py-3 rounded-full border border-border/40 text-[13px] tracking-wide text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-foreground text-background text-[13px] tracking-wide font-medium"
            >
              Show {resultCount} results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function ProductsGrid({ category, sort }: ProductsGridProps) {
  const [sortBy, setSortBy] = useState(sort || "featured");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false);
      if (priceRef.current && !priceRef.current.contains(e.target as Node))
        setPriceOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (mobileSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSheetOpen]);

  const activeFilterCount = [
    selectedCategory !== "",
    priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE,
    search !== "",
  ].filter(Boolean).length;

  const isPriceActive =
    priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchCategory =
        !selectedCategory || p.category === selectedCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return [...filtered].reverse();
      default:
        return filtered;
    }
  }, [selectedCategory, sortBy, priceRange, search]);

  const clearAll = () => {
    setSelectedCategory("");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSearch("");
    setSortBy("featured");
    setSearchOpen(false);
  };

  return (
    <div className="container mx-auto px-4 overflow-x-hidden">
      {/* ── MOBILE: Sticky filter bar ── */}
      <div className="sticky top-4 z-30 mb-8 md:hidden">
        <div
          className={`
          flex items-center gap-2 px-4 py-2.5
          rounded-full border transition-all duration-500
          ${
            scrolled
              ? "border-border/60 bg-background/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              : "border-border/30 bg-background/70 backdrop-blur-md"
          }
        `}
        >
          {/* Category scroll strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`
                  flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] tracking-wide
                  transition-all duration-200 whitespace-nowrap
                  ${
                    selectedCategory === cat.value
                      ? "bg-foreground text-background font-medium"
                      : "text-foreground/50 hover:text-foreground"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-border/50 flex-shrink-0" />

          {/* Filter button */}
          <button
            onClick={() => setMobileSheetOpen(true)}
            className={`
              flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px]
              tracking-wide transition-all duration-200
              ${
                activeFilterCount > 0
                  ? "bg-foreground text-background font-medium"
                  : "text-foreground/50 hover:text-foreground"
              }
            `}
          >
            <SlidersHorizontal className="w-3 h-3" />
            {activeFilterCount > 0 ? (
              <span>{activeFilterCount}</span>
            ) : (
              <span>Filter</span>
            )}
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Floating pill toolbar ── */}
      <div className="sticky top-6 z-30 hidden md:flex justify-center pointer-events-none mb-12">
        <div
          className={`
            pointer-events-auto
            flex items-center gap-1 p-1.5 rounded-full
            border transition-all duration-500 ease-out
            ${
              scrolled
                ? "border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                : "border-border/30 bg-background/60 backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
            }
          `}
        >
          {/* Category pills */}
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                relative px-4 py-2 rounded-full text-[13px] tracking-wide
                transition-all duration-300 whitespace-nowrap
                ${
                  selectedCategory === cat.value
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                }
              `}
            >
              {cat.label}
              {selectedCategory === cat.value && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {cat.count}
                </span>
              )}
            </button>
          ))}

          <div className="w-px h-5 bg-border/60 mx-1" />

          {/* Price filter */}
          <div ref={priceRef} className="relative">
            <button
              onClick={() => {
                setPriceOpen((v) => !v);
                setSortOpen(false);
              }}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] tracking-wide
                transition-all duration-300
                ${
                  isPriceActive
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                }
              `}
            >
              {isPriceActive
                ? `$${priceRange[0].toLocaleString()} – $${priceRange[1].toLocaleString()}`
                : "Price"}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${priceOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-40
                bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl p-6
                shadow-[0_16px_48px_rgba(0,0,0,0.12)]
                transition-all duration-300 origin-top
                ${priceOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
              `}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-medium mb-6">
                Price Range
              </p>
              <DualRangeSlider
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>
          </div>

          <div className="w-px h-5 bg-border/60 mx-1" />

          {/* Sort */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => {
                setSortOpen((v) => !v);
                setPriceOpen(false);
              }}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] tracking-wide
                transition-all duration-300
                ${
                  sortBy !== "featured"
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                }
              `}
            >
              {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`
                absolute top-full right-0 mt-3 w-44 z-40
                bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden
                shadow-[0_16px_48px_rgba(0,0,0,0.12)]
                transition-all duration-300 origin-top-right
                ${sortOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
              `}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortOpen(false);
                  }}
                  className={`
                    w-full text-left text-[13px] px-5 py-3 tracking-wide
                    transition-colors duration-150
                    ${
                      sortBy === opt.value
                        ? "text-foreground font-medium bg-foreground/5"
                        : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-5 bg-border/60 mx-1" />

          {/* Search */}
          <div className="relative flex items-center">
            <div
              className={`
                flex items-center gap-2 overflow-hidden
                transition-all duration-400 ease-out
                ${searchOpen ? "w-44 px-4" : "w-10 px-0 justify-center"}
                py-2 rounded-full
                ${search ? "bg-foreground text-background" : ""}
              `}
            >
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className={`
                  flex-shrink-0 transition-colors duration-200
                  ${search ? "text-background" : "text-foreground/50 hover:text-foreground"}
                `}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className={`
                  bg-transparent text-[13px] tracking-wide outline-none w-full
                  transition-all duration-300
                  ${search ? "placeholder:text-background/40 text-background" : "placeholder:text-foreground/30"}
                  ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  className="flex-shrink-0 text-background/60 hover:text-background transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Clear all */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-[11px] tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors duration-200 ml-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile filter sheet ── */}
      <MobileFilterSheet
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        search={search}
        setSearch={setSearch}
        clearAll={clearAll}
        resultCount={filteredAndSortedProducts.length}
      />

      {/* ── Active filter chips ── */}
      {activeFilterCount > 0 && (
        <div
          className="flex flex-wrap gap-2 mb-8 justify-center"
          style={{ animation: "fadeDown 0.3s ease-out" }}
        >
          {selectedCategory && (
            <span className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-foreground/50 px-3 py-1.5 rounded-full border border-border/40 hover:border-foreground/30 transition-colors">
              {
                CATEGORY_OPTIONS.find((c) => c.value === selectedCategory)
                  ?.label
              }
              <button
                onClick={() => setSelectedCategory("")}
                className="hover:text-foreground transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {isPriceActive && (
            <span className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-foreground/50 px-3 py-1.5 rounded-full border border-border/40 hover:border-foreground/30 transition-colors">
              ${priceRange[0].toLocaleString()} – $
              {priceRange[1].toLocaleString()}
              <button
                onClick={() => setPriceRange([MIN_PRICE, MAX_PRICE])}
                className="hover:text-foreground transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {search && (
            <span className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-foreground/50 px-3 py-1.5 rounded-full border border-border/40 hover:border-foreground/30 transition-colors">
              "{search}"
              <button
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                className="hover:text-foreground transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          <span className="text-[11px] tracking-widest uppercase text-foreground/30 px-3 py-1.5">
            {filteredAndSortedProducts.length} results
          </span>
        </div>
      )}

      {/* ── Product count (no active filters) ── */}
      {activeFilterCount === 0 && (
        <p className="text-center text-[11px] tracking-widest uppercase text-foreground/25 mb-10">
          {filteredAndSortedProducts.length} products
        </p>
      )}

      {/* ── Grid ── */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredAndSortedProducts.map((product, i) => (
            <div
              key={product.id}
              style={{
                animationDelay: `${i * 40}ms`,
                animation: "fadeUp 0.5s both",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-2xl font-serif font-light text-foreground/30 mb-2 tracking-wide">
            No results
          </p>
          <p className="text-[11px] tracking-widest uppercase text-foreground/25 mb-8">
            Try adjusting your filters
          </p>
          <button
            onClick={clearAll}
            className="text-[11px] tracking-widest uppercase text-foreground/40 hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
