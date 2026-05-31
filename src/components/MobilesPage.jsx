import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Info, ShieldCheck, Zap, Smartphone, Headphones } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function MobilesPage({ products, onOpen }) {
  const { items, addToCart } = useCart();
  const [activeBrand, setActiveBrand] = useState("All");
  const [bannerIndex, setBannerIndex] = useState(0);

  // Filter products by category Mobiles (or relevant electronics accessories like earbuds)
  const mobileRelatedProducts = products.filter(
    (p) => p.category === "Mobiles" || (p.category === "Electronics" && ["boAt", "Sony", "Apple"].includes(p.brand))
  );

  const brands = ["All", "Apple", "Samsung", "OnePlus", "boAt"];

  const filteredProducts = mobileRelatedProducts.filter((p) => {
    if (activeBrand === "All") return true;
    return p.brand.toLowerCase() === activeBrand.toLowerCase();
  });

  // Mobile specific promotional banners
  const banners = [
    {
      id: 1,
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "The ultimate smartphone experience. Now powered by Galaxy AI.",
      offer: "Flat ₹10,000 Instant Discount + Up to 12 Months No Cost EMI",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
      accent: "from-slate-900 to-indigo-950",
    },
    {
      id: 2,
      title: "Apple iPhone 15 Pro",
      subtitle: "Forged in titanium. Featuring the groundbreaking A17 Pro chip.",
      offer: "Exchange bonus up to ₹8,000 | One-Day Delivery with Prime",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      accent: "from-neutral-900 to-amber-950",
    },
    {
      id: 3,
      title: "OnePlus 12 5G",
      subtitle: "Smooth Beyond Belief. 4th Gen Hasselblad Camera for Mobile.",
      offer: "Starting from ₹64,999 | Free OnePlus Buds Z2 with purchase",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      accent: "from-zinc-900 to-emerald-950",
    }
  ];

  // Auto scroll banners
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleNextBanner = () => {
    setBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Helper to resolve technical specs based on product model
  const getProductSpecs = (product) => {
    const title = product.title.toLowerCase();
    if (title.includes("s24 ultra")) {
      return ["12GB RAM | 256GB", "200MP Camera", "5000mAh Battery", "Snapdragon 8 Gen 3"];
    }
    if (title.includes("macbook")) {
      return ["8GB Unified RAM", "256GB SSD", "M2 Octa-Core Chip", "18 Hr Battery Life"];
    }
    if (title.includes("airpods pro")) {
      return ["Adaptive Audio", "Active Noise Cancelling", "MagSafe (USB-C)", "6h Listening Time"];
    }
    if (title.includes("wh-1000xm5")) {
      return ["30h Battery Life", "Auto NC Optimizer", "Multipoint Connect", "High-Res Audio"];
    }
    if (title.includes("airdopes")) {
      return ["42h Total Playback", "ASAP Fast Charge", "IPX4 Water Proof", "Beast Low Latency"];
    }
    // Fallback based on category
    if (product.category === "Mobiles") {
      return ["8GB RAM | 128GB", "50MP Triple Camera", "5000mAh Battery", "5G Enabled"];
    }
    return ["Premium Sound", "Wireless Connectivity", "1 Year Warranty", "Travel Case Included"];
  };

  return (
    <div className="bg-[#f7f9f9] min-h-screen pb-12">
      {/* Sliding Tech Banner */}
      <div className="relative overflow-hidden h-[240px] md:h-[340px] w-full shadow-md">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className={`absolute inset-0 bg-gradient-to-r ${b.accent} text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-6 transition-all duration-1000 ease-in-out ${
              idx === bannerIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="max-w-xl text-center md:text-left z-10">
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Tech Spotlight
              </span>
              <h2 className="text-xl md:text-4xl font-extrabold tracking-tight mt-2">{b.title}</h2>
              <p className="text-xs md:text-base text-gray-300 mt-2 font-medium">{b.subtitle}</p>
              <div className="mt-3 md:mt-5 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-md inline-block">
                <p className="text-xs md:text-sm font-bold text-orange-400">{b.offer}</p>
              </div>
            </div>
            <div className="h-28 md:h-56 w-36 md:w-72 mt-4 md:mt-0 flex items-center justify-center shrink-0">
              <img
                src={b.image}
                alt={b.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-white/10 hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition z-20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition z-20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBannerIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition ${idx === bannerIndex ? "bg-orange-500 scale-125" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 mt-6">
        {/* Prime Shipping Callout Banner */}
        <div className="bg-white rounded-md border border-gray-200 p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-[#232f3e] text-white p-2.5 rounded-lg">
              <Smartphone size={24} className="text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">
                Mobiles & Accessories Hub
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Get free 1-day delivery with Amazon Prime on eligible brand models.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-600" /> 100% Genuine Brands</span>
            <span className="flex items-center gap-1"><Zap size={16} className="text-orange-500" /> Superfast Delivery</span>
          </div>
        </div>

        {/* Brand Selector Badges */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider mb-2.5">
            Filter by Brand
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition shadow-sm border ${
                  activeBrand === b
                    ? "bg-[#232f3e] text-white border-[#232f3e] scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
              >
                {b === "All" ? "⭐ All Brands" : b}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-extrabold text-gray-800">
              {activeBrand === "All" ? "Featured Smartphones & Audio Accessories" : `${activeBrand} Devices`}
            </h3>
            <span className="text-xs text-gray-500 font-bold bg-white px-3 py-1 rounded border shadow-sm">
              {filteredProducts.length} items found
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 py-16 text-center shadow-sm">
              <Smartphone size={48} className="mx-auto text-gray-300 mb-3" />
              <h4 className="text-lg font-bold text-gray-700">No brand products listed</h4>
              <p className="text-sm text-gray-500 mt-1">Check back later or browse other categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => {
                const specs = getProductSpecs(product);
                const cartItem = items.find((i) => i.id === product.id);
                const isInCart = !!cartItem;

                return (
                  <div
                    key={product.id}
                    onClick={() => onOpen(product)}
                    className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="aspect-square bg-gray-50 p-6 relative overflow-hidden flex items-center justify-center border-b">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                        {product.prime && (
                          <span className="absolute top-2 right-2 bg-sky-100 text-sky-800 text-[10px] font-extrabold italic px-1.5 py-0.5 rounded border border-sky-200">
                            prime
                          </span>
                        )}
                        <span className="absolute top-2 left-2 bg-[#232f3e] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                      </div>

                      {/* Info & Specifications */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 text-xs md:text-sm line-clamp-2 h-10 group-hover:text-blue-600 transition">
                          {product.title}
                        </h4>
                        
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-xs text-orange-500 font-extrabold">★ {product.rating}</span>
                          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
                        </div>

                        {/* Specifications Pills */}
                        <div className="mt-3.5 space-y-1">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Info size={10} /> Specs & Features
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {specs.map((spec, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200/50"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3 border-t border-gray-50 pt-3">
                        <span className="text-base md:text-lg font-black text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Add To Cart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, "");
                        }}
                        className={`w-full py-1.5 rounded-full text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 ${
                          isInCart
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] border border-[#a88734] hover:border-[#846a29] text-gray-900"
                        }`}
                      >
                        <ShoppingCart size={14} />
                        {isInCart ? "Add Another" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
