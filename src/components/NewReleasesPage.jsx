import { useState } from "react";
import { Sparkles, Calendar, ShoppingCart, Award, ChevronRight, Bookmark } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function NewReleasesPage({ products, onOpen }) {
  const { items, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Mobiles",
    "Fashion",
    "Home & Kitchen",
    "Grocery",
    "Computers"
  ];

  // Helper to determine if a product is "newly released"
  // Custom seller products are automatically marked as new releases, as well as items with specific IDs
  const getNewReleases = (list) => {
    // If it's a seller product (id > 18 or explicitly flagged), it's a fresh release.
    // Otherwise, we take the most recent additions.
    return list.map((p, idx) => {
      const isSellerProduct = p.id > 18 || p.isSellerProduct;
      // Assign mock release dates
      let releaseDate = "Released May 2026";
      let releaseBadge = "New Release";

      if (isSellerProduct) {
        releaseDate = "Just Released (Moments ago)";
        releaseBadge = "Seller Launch";
      } else if (p.id % 3 === 0) {
        releaseDate = "Released April 2026";
        releaseBadge = "New Launch";
      } else if (p.id % 2 === 0) {
        releaseDate = "Released May 2026";
        releaseBadge = "Hot Release";
      }

      return {
        ...p,
        releaseDate,
        releaseBadge,
        isNewRelease: true
      };
    });
  };

  const allNewReleases = getNewReleases(products);

  const filteredReleases = selectedCategory === "All"
    ? allNewReleases
    : allNewReleases.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#eaeded] min-h-screen pb-12">
      {/* Red Promo New Releases Header */}
      <div className="bg-[#b12704] text-white py-7 px-4 md:px-8 border-b border-red-800 shadow-sm relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-red-400/10 rounded-full blur-xl" />

        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-[#b12704] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                HOT NEW RELEASES
              </span>
              <span className="text-xs text-red-100 font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="animate-bounce" /> Fresh Launches in the Store
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-white">
              Amazon Hot New Releases
            </h1>
            <p className="text-xs md:text-sm text-red-100 mt-1 max-w-xl font-medium">
              Our best-selling new and future releases. Updated daily. Includes items listed by independent sellers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-red-950/40 px-4 py-2.5 rounded-lg border border-red-800/80 w-fit">
            <Award size={16} className="text-yellow-400" />
            <span className="text-red-200">Newly Listed:</span>
            <span className="text-white font-extrabold">{allNewReleases.length} products total</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigator Sidebar */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-md shadow-sm border border-gray-200 h-fit">
          <h2 className="font-bold text-base text-gray-900 border-b pb-2 mb-3">
            New Releases Department
          </h2>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-semibold flex items-center justify-between transition-all ${
                    selectedCategory === cat
                      ? "bg-red-50 text-red-700 font-bold border-l-4 border-[#b12704]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat === "All" ? "Any Department" : cat}</span>
                  <ChevronRight size={14} className={selectedCategory === cat ? "text-red-600" : "text-gray-400"} />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Content */}
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-base md:text-lg font-extrabold text-gray-800">
              Hot New Launches in {selectedCategory === "All" ? "All Departments" : selectedCategory}
            </h3>
            <span className="text-xs text-[#b12704] font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Latest Arrivals
            </span>
          </div>

          {filteredReleases.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 py-16 text-center shadow-sm">
              <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
              <h4 className="text-lg font-bold text-gray-700">No new releases in this category</h4>
              <p className="text-sm text-gray-500 mt-1">Try viewing all departments or check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredReleases.map((product) => {
                const cartItem = items.find((i) => i.id === product.id);
                const isInCart = !!cartItem;

                return (
                  <div
                    key={product.id}
                    onClick={() => onOpen(product)}
                    className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer group relative"
                  >
                    <div>
                      {/* Red Release Ribbon Badge */}
                      <span className="absolute top-2 left-2 bg-[#b12704] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md z-10 flex items-center gap-1 border border-red-500">
                        <Sparkles size={10} className="fill-white" />
                        {product.releaseBadge}
                      </span>

                      {/* Product Image */}
                      <div className="aspect-square bg-gray-50 p-6 relative overflow-hidden flex items-center justify-center border-b mt-2">
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

                      {/* Product Details */}
                      <div className="p-4">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <h4 className="font-bold text-gray-800 text-sm mt-1 line-clamp-2 h-10 group-hover:text-red-700 transition">
                          {product.title}
                        </h4>
                        
                        {/* Release Timeline Tag */}
                        <div className="mt-2.5 flex items-center gap-1 text-[11px] text-gray-500 font-bold bg-gray-50 px-2 py-1 rounded border border-gray-100 w-fit">
                          <Calendar size={12} className="text-red-600" />
                          <span>{product.releaseDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      {/* Price Section */}
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

                      {/* Direct Add to Cart Button */}
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
        </main>
      </div>
    </div>
  );
}
