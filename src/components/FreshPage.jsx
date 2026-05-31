import { useState } from "react";
import { Plus, Minus, Search, Calendar, Clock, Leaf, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function FreshPage({ products, onOpen }) {
  const { items, addToCart, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState("All");
  const [slotSelected, setSlotSelected] = useState("Tomorrow, 8:00 AM - 10:00 AM");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter only Grocery items from the dynamic products list
  const groceryProducts = products.filter((p) => p.category === "Grocery");

  // Subcategory grouping
  const subCategories = ["All", "Fruits & Vegetables", "Dairy & Bakery", "Pantry Essentials", "Snacks & Drinks"];

  const getSubcategory = (product) => {
    const title = product.title.toLowerCase();
    if (title.includes("apple") || title.includes("banana") || title.includes("fruit") || title.includes("veg")) {
      return "Fruits & Vegetables";
    }
    if (title.includes("milk") || title.includes("bread") || title.includes("butter") || title.includes("cheese")) {
      return "Dairy & Bakery";
    }
    if (title.includes("oil") || title.includes("rice") || title.includes("flour") || title.includes("salt")) {
      return "Pantry Essentials";
    }
    return "Snacks & Drinks";
  };

  const filteredProducts = groceryProducts.filter((p) => {
    const subcat = getSubcategory(p);
    const matchesTab = activeTab === "All" || subcat === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const slots = [
    "Tomorrow, 8:00 AM - 10:00 AM",
    "Tomorrow, 11:00 AM - 1:00 PM",
    "Tomorrow, 3:00 PM - 5:00 PM",
    "Tomorrow, 6:00 PM - 8:00 PM"
  ];

  return (
    <div className="bg-[#f7f9f9] min-h-screen">
      {/* Fresh Header Bar */}
      <div className="bg-[#112211] text-white py-3 px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#224422] shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white font-black text-xl italic px-3 py-1 rounded tracking-tight flex items-center gap-1 shadow-inner">
            <Leaf size={20} className="fill-white" />
            amazon<span className="text-lime-300 font-extrabold">fresh</span>
          </div>
          <div className="hidden sm:block text-xs border-l border-green-800 pl-3 text-gray-300">
            <span className="block font-medium">Delivery to</span>
            <span className="font-bold text-white">Mumbai 400001</span>
          </div>
        </div>

        {/* Slot Selector */}
        <div className="flex items-center gap-2 text-xs bg-[#1a331a] px-3 py-1.5 rounded-full border border-green-800 w-fit">
          <Clock size={14} className="text-lime-400" />
          <span className="text-gray-300">Delivery Slot:</span>
          <select
            value={slotSelected}
            onChange={(e) => setSlotSelected(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            {slots.map((s) => (
              <option key={s} value={s} className="bg-[#112211] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Grocery Specific Search */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in Fresh Store..."
            className="w-full bg-white text-gray-800 pl-10 pr-4 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
          />
          <Search size={16} className="absolute left-3.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Fresh Promo Banner */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 mt-4">
        <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white rounded-lg p-6 md:p-8 relative overflow-hidden shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative z-10 text-center md:text-left">
            <span className="bg-lime-400/20 text-lime-300 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-lime-400/30">
              Super Saver Offers
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-2 text-white">
              Up to <span className="text-lime-300">50% Off</span> on Groceries
            </h2>
            <p className="text-sm md:text-base text-gray-200 mt-2 max-w-lg font-medium">
              Get organic fruits, farm-fresh vegetables, dairy and everyday essentials delivered directly to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-xs font-semibold text-gray-200">
              <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-lime-400" /> 100% Quality Guarantee</span>
              <span className="flex items-center gap-1"><Sparkles size={16} className="text-lime-400" /> No Minimum Order</span>
            </div>
          </div>
          <div className="relative h-32 md:h-40 w-44 md:w-56 shrink-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80" 
              alt="Grocery Basket" 
              className="h-full w-full object-cover rounded-xl shadow-2xl border border-white/10 hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side Category Navigation */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <Leaf size={18} className="text-green-600" /> Categories
          </h3>
          <ul className="space-y-1">
            {subCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveTab(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between transition ${
                    activeTab === cat
                      ? "bg-green-50 text-green-700 font-bold border-l-4 border-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat === "All" ? "All Groceries" : cat}</span>
                  <ChevronRight size={14} className={activeTab === cat ? "text-green-600" : "text-gray-400"} />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Side Products Grid */}
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === "All" ? "Popular Grocery Items" : activeTab}
            </h3>
            <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredProducts.length} items available
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border py-16 text-center shadow-sm">
              <Leaf size={48} className="mx-auto text-gray-300 mb-3" />
              <h4 className="text-lg font-bold text-gray-700">No Fresh products found</h4>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const cartItem = items.find((i) => i.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div
                    key={product.id}
                    onClick={() => onOpen(product)}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="aspect-square bg-gray-50 p-4 relative overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                        {product.badges && product.badges.length > 0 && (
                          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            {product.badges[0]}
                          </span>
                        )}
                        {product.prime && (
                          <span className="absolute top-2 right-2 bg-[#232f3e] text-white text-[10px] font-bold italic px-1.5 py-0.5 rounded">
                            prime
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-green-700 tracking-wider uppercase bg-green-50 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                        <h4 className="font-bold text-gray-800 text-sm mt-1.5 line-clamp-2 h-10 group-hover:text-green-700 transition">
                          {product.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1 font-semibold flex items-center gap-1.5">
                          <span>★ {product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-gray-50">
                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mt-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Inline Quantity Controls */}
                      <div onClick={(e) => e.stopPropagation()}>
                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(product, "")}
                            className="w-full bg-[#f0f9f0] hover:bg-green-600 text-green-700 hover:text-white py-1.5 rounded-full text-sm font-bold border border-green-300 hover:border-green-600 shadow-sm transition flex items-center justify-center gap-1"
                          >
                            <Plus size={16} /> Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-green-50 border border-green-500 rounded-full h-8 px-1.5 shadow-sm">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 text-green-700 hover:bg-green-200 rounded-full transition"
                            >
                              <Minus size={14} className="stroke-[3]" />
                            </button>
                            <span className="font-extrabold text-sm text-green-800">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 text-green-700 hover:bg-green-200 rounded-full transition"
                            >
                              <Plus size={14} className="stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2.5 font-medium">
                        Earliest delivery: <span className="text-green-700 font-bold">Tomorrow Morning</span>
                      </p>
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
