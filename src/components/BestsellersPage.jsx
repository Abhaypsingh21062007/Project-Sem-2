import { useState, useEffect } from "react";
import { Crown, Trophy, TrendingUp, ChevronRight, ShoppingCart, RefreshCw, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function BestsellersPage({ products, onOpen }) {
  const { items, addToCart, updateQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastUpdated, setLastUpdated] = useState("");

  // Set the "updated hourly" time dynamically to current hour
  useEffect(() => {
    const now = new Date();
    now.setMinutes(0);
    setLastUpdated(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
  }, []);

  const categories = [
    "All",
    "Electronics",
    "Mobiles",
    "Fashion",
    "Home & Kitchen",
    "Computers",
    "Grocery"
  ];

  // Helper to rank products within a dataset
  const getRankedProducts = (productList) => {
    return [...productList].sort((a, b) => {
      // Popularity score based on rating and number of reviews
      const scoreA = (a.rating || 0) * Math.log10(a.reviewCount || 1);
      const scoreB = (b.rating || 0) * Math.log10(b.reviewCount || 1);
      return scoreB - scoreA;
    });
  };

  // Render a product rank badge
  const renderRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-md flex items-center gap-1 z-10 animate-pulse border border-yellow-300">
          <Crown size={14} className="fill-white" />
          <span>#1 Bestseller</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 z-10 border border-slate-200">
          <Trophy size={12} />
          <span>#2 Bestseller</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 z-10 border border-amber-500">
          <Trophy size={12} />
          <span>#3 Bestseller</span>
        </span>
      );
    }
    return (
      <span className="absolute top-2 left-2 bg-gray-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
        #{rank} Bestseller
      </span>
    );
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<Star key={i} size={14} className="text-orange-400 fill-orange-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(
          <div key={i} className="relative inline-block w-[14px] h-[14px]">
            <Star size={14} className="text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={14} className="text-orange-400 fill-orange-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="bg-[#eaeded] min-h-screen pb-12">
      {/* Premium Hero Banner */}
      <div className="bg-[#232f3e] text-white py-6 px-4 md:px-8 border-b border-gray-700 shadow-sm">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#c7511f] text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                Rankings
              </span>
              <span className="text-xs text-gray-300 font-semibold flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin text-orange-400" />
                Updated Hourly (Last updated {lastUpdated})
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
              Amazon Bestsellers
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-1.5 max-w-xl">
              Our most popular products based on sales. Updated hourly. Discover what's flying off the shelves!
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#1a2531] px-4 py-2.5 rounded-lg border border-gray-700 w-fit">
            <TrendingUp size={16} className="text-orange-400" />
            <span className="text-gray-300 font-semibold">Trending:</span>
            <span className="text-white font-bold hover:underline cursor-pointer" onClick={() => setSelectedCategory("Electronics")}>Electronics</span>
            <span className="text-gray-500">|</span>
            <span className="text-white font-bold hover:underline cursor-pointer" onClick={() => setSelectedCategory("Mobiles")}>Mobiles</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigator Sidebar */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-md shadow-sm border border-gray-200 h-fit">
          <h2 className="font-bold text-base text-gray-900 border-b pb-2 mb-3">
            Bestsellers Department
          </h2>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-semibold flex items-center justify-between transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-50 text-orange-700 font-bold border-l-4 border-[#e47911]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat === "All" ? "Any Department" : cat}</span>
                  <ChevronRight size={14} className={selectedCategory === cat ? "text-orange-600" : "text-gray-400"} />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Side Rankings */}
        <main className="lg:col-span-9 space-y-8">
          {selectedCategory !== "All" ? (
            // Single Category Ranking List
            <div>
              <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="text-lg md:text-xl font-extrabold text-gray-800">
                  Bestsellers in {selectedCategory}
                </h3>
                <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full border">
                  Top Seller Rankings
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {getRankedProducts(products.filter((p) => p.category === selectedCategory))
                  .slice(0, 10)
                  .map((product, index) => {
                    const rank = index + 1;
                    const cartItem = items.find((i) => i.id === product.id);
                    const isInCart = !!cartItem;

                    return (
                      <div
                        key={product.id}
                        onClick={() => onOpen(product)}
                        className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer group relative"
                      >
                        <div>
                          {/* Rank Badge */}
                          {renderRankBadge(rank)}

                          {/* Image */}
                          <div className="aspect-square bg-gray-50 p-6 relative overflow-hidden flex items-center justify-center border-b border-gray-100 mt-2">
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
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              {product.brand}
                            </span>
                            <h4 className="font-bold text-gray-800 text-sm mt-1 line-clamp-2 h-10 group-hover:text-orange-600 transition">
                              {product.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              {renderStars(product.rating)}
                              <span className="text-xs text-blue-600 font-semibold hover:underline">
                                {product.reviewCount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0">
                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3 border-t border-gray-50 pt-3">
                            <span className="text-lg font-black text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Direct Purchase Button */}
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
                            {isInCart ? "Add Another to Cart" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            // Home view: Top 3 items from each of the active categories
            <div className="space-y-8">
              {categories
                .filter((cat) => cat !== "All")
                .map((cat) => {
                  const catProducts = products.filter((p) => p.category === cat);
                  if (catProducts.length === 0) return null;
                  const ranked = getRankedProducts(catProducts).slice(0, 3);

                  return (
                    <div key={cat} className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h3 className="text-base md:text-lg font-extrabold text-gray-800 flex items-center gap-2">
                          <Crown size={18} className="text-[#e47911]" /> Bestsellers in {cat}
                        </h3>
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className="text-xs font-bold text-[#007185] hover:text-orange-600 hover:underline flex items-center"
                        >
                          See more Bestsellers in {cat} <ChevronRight size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {ranked.map((product, index) => {
                          const rank = index + 1;
                          const cartItem = items.find((i) => i.id === product.id);
                          const isInCart = !!cartItem;

                          return (
                            <div
                              key={product.id}
                              onClick={() => onOpen(product)}
                              className="border border-gray-100 rounded p-3 hover:border-gray-300 transition duration-150 flex flex-col justify-between cursor-pointer group relative"
                            >
                              <div>
                                {/* Rank Emblem */}
                                <div className="absolute top-2 left-2 bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shadow-sm border border-white">
                                  {rank}
                                </div>

                                {/* Product Image */}
                                <div className="h-40 w-full flex items-center justify-center p-3 relative bg-gray-50/50 rounded mt-2">
                                  <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                                  />
                                </div>

                                <div className="mt-3">
                                  <h4 className="text-xs font-bold text-gray-800 line-clamp-2 h-8 group-hover:text-orange-600 transition">
                                    {product.title}
                                  </h4>
                                  <div className="flex items-center gap-1.5 mt-1.5">
                                    {renderStars(product.rating)}
                                    <span className="text-[10px] text-gray-500 font-semibold">
                                      ({product.reviewCount.toLocaleString()})
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between gap-2">
                                <span className="text-sm font-extrabold text-gray-900">
                                  {formatPrice(product.price)}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product, "");
                                  }}
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-sm transition flex items-center gap-1 ${
                                    isInCart
                                      ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                                      : "bg-[#f0c14b] hover:bg-[#ddb347] border border-[#a88734] text-gray-900"
                                  }`}
                                >
                                  {isInCart ? "Added" : "Add to Cart"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
