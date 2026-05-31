import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { products as staticProducts, categories } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Header({ searchQuery, setSearchQuery, view, setView, activeCategory, setActiveCategory, productsList = staticProducts, isPrimeMember }) {
  const { totalItems } = useCart();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const filteredSuggestions = searchQuery.length > 0
    ? productsList
        .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (showAccountDropdown) setShowAccountDropdown(false);
      if (showCatDropdown) setShowCatDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showAccountDropdown, showCatDropdown]);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Top Bar */}
      <div className="bg-[#131921] text-white px-3 py-1.5 flex items-center gap-2">
        {/* Logo */}
        <button
          onClick={() => { setView("home"); setSearchQuery(""); setActiveCategory("All"); }}
          className="flex items-center gap-0.5 hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 shrink-0"
        >
          <div className="text-xl font-bold italic text-white tracking-tight">
            amazon<span className="text-orange-400">.in</span>
          </div>
        </button>

        {/* Location */}
        <button className="hidden md:flex flex-col hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 text-left shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <MapPin size={14} />
            <span>Deliver to</span>
          </div>
          <div className="text-sm font-bold flex items-center">
            Mumbai 400001
            <ChevronDown size={12} className="ml-0.5" />
          </div>
        </button>

        {/* Search Bar */}
        <div className="flex-grow flex max-w-[1000px]" ref={searchRef}>
          <button
            onClick={() => setShowCatDropdown(!showCatDropdown)}
            className="relative hidden sm:flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 rounded-l-md border-r border-gray-300 shrink-0"
          >
            <span className="truncate max-w-[60px]">{activeCategory}</span>
            <ChevronDown size={12} />
          </button>
          {showCatDropdown && (
            <div className="absolute top-full left-16 mt-0 bg-white text-black rounded-md shadow-xl border py-1 z-50 min-w-[200px]">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCategory(c);
                    setView("home");
                    setShowCatDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm ${activeCategory === c ? "bg-orange-100 font-bold" : "hover:bg-gray-100"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              placeholder="Search Amazon.in"
              className="w-full h-[38px] px-3 text-black focus:outline-none"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white text-black shadow-xl border-t rounded-b-md z-50 py-1">
                {filteredSuggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSearch(p.title)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <img src={p.image} alt="" className="w-8 h-8 object-cover rounded" />
                    <span className="text-sm truncate">{p.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="bg-[#febd69] hover:bg-[#f3a847] text-gray-900 px-4 rounded-r-md transition"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Language */}
        <button className="hidden lg:flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 shrink-0">
          <span className="text-lg">🇮🇳</span>
          <span className="text-sm font-bold">EN</span>
          <ChevronDown size={12} />
        </button>

        {/* Account */}
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className={`hidden sm:flex flex-col hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 text-left shrink-0 ${isPrimeMember ? "border border-amber-400/50 bg-amber-500/5" : ""}`}
          >
            <span className="text-xs flex items-center gap-1">
              {isPrimeMember ? <span className="text-amber-400 font-extrabold flex items-center gap-0.5">★ Prime Member</span> : "Hello, sign in"}
            </span>
            <span className="text-sm font-bold flex items-center">
              Account & Lists <ChevronDown size={12} className="ml-0.5" />
            </span>
          </button>
          {showAccountDropdown && (
            <div className="absolute right-0 top-full mt-0 bg-white text-black rounded-md shadow-xl border p-4 z-50 min-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <User size={40} className="text-gray-400" />
                <div>
                  <div className="font-bold">Your Account</div>
                  <div className="text-xs text-gray-500">Track orders, returns, wishlist</div>
                </div>
              </div>
              <div className="border-t pt-2">
                <div className="text-xs font-bold mb-1">Your Lists</div>
                <ul className="text-sm space-y-1 text-[#007185]">
                  <li><button onClick={() => { setView("wishlist"); setShowAccountDropdown(false); }} className="hover:text-orange-600 hover:underline">Wishlist</button></li>
                  <li className="hover:text-orange-600 hover:underline cursor-pointer">Create a List</li>
                  <li className="hover:text-orange-600 hover:underline cursor-pointer">Find a List</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Orders */}
        <button
          onClick={() => setView("cart")}
          className="hidden sm:flex flex-col hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 text-left shrink-0"
        >
          <span className="text-xs">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setView("cart")}
          className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1.5 relative shrink-0"
        >
          <div className="relative">
            <ShoppingCart size={30} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="font-bold ml-1 hidden sm:inline">Cart</span>
        </button>

        {/* Mobile menu */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden flex items-center">
          <Menu size={24} />
        </button>
      </div>

      {/* Secondary Nav */}
      <nav className="bg-[#232f3e] text-white text-sm py-1.5 px-3 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-0.5 min-w-max">
          <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 font-bold shrink-0">
            <Menu size={18} />
            All
          </button>
          <button
            onClick={() => { setView("fresh"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "fresh" ? "bg-green-700 text-white outline outline-1 outline-white" : ""}`}
          >
            Fresh
          </button>
          <button
            onClick={() => { setView("mxplayer"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "mxplayer" ? "bg-orange-600 text-white outline outline-1 outline-white" : ""}`}
          >
            MX Player
          </button>
          <button
            onClick={() => { setView("sell"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "sell" ? "bg-amber-600 text-white outline outline-1 outline-white" : ""}`}
          >
            Sell
          </button>
          <button
            onClick={() => setView("deals")}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold text-amber-300 ${view === "deals" ? "bg-amber-700 text-white outline outline-1 outline-white" : ""}`}
          >
            Today's Deals
          </button>
          <button
            onClick={() => { setView("bestsellers"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "bestsellers" ? "bg-[#e47911] text-white outline outline-1 outline-white" : ""}`}
          >
            Bestsellers
          </button>
          <button
            onClick={() => { setView("mobiles"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "mobiles" ? "bg-cyan-700 text-white outline outline-1 outline-white" : ""}`}
          >
            Mobiles
          </button>
          <button
            onClick={() => { setView("prime"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap flex items-center gap-0.5 font-bold ${
              view === "prime"
                ? "bg-sky-600 text-white outline outline-1 outline-white"
                : isPrimeMember
                ? "text-sky-300 shadow shadow-sky-500/20"
                : ""
            }`}
          >
            Prime {isPrimeMember && <span className="text-amber-400 font-extrabold ml-1">★</span>} <ChevronDown size={12} />
          </button>
          <button
            onClick={() => { setView("newreleases"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "newreleases" ? "bg-red-700 text-white outline outline-1 outline-white" : ""}`}
          >
            New Releases
          </button>
          <button
            onClick={() => { setView("customerservice"); setSearchQuery(""); setActiveCategory("All"); }}
            className={`hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap font-semibold ${view === "customerservice" ? "bg-slate-700 text-white outline outline-1 outline-white" : ""}`}
          >
            Customer Service
          </button>
          <button onClick={() => { setActiveCategory("Electronics"); setView("home"); }} className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap">Electronics</button>
          <button onClick={() => { setActiveCategory("Fashion"); setView("home"); }} className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap">Fashion</button>
          <button onClick={() => { setActiveCategory("Home & Kitchen"); setView("home"); }} className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap">Home & Kitchen</button>
          <button onClick={() => { setActiveCategory("Computers"); setView("home"); }} className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap">Computers</button>
          <button onClick={() => { setActiveCategory("Toys"); setView("home"); }} className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap">Toys & Games</button>
          <button className="hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0 whitespace-nowrap hidden lg:block">Automotive</button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[300px] bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            <div className="bg-[#232f3e] text-white p-4 flex items-center gap-3">
              <User size={30} className="bg-gray-100 text-gray-800 rounded-full p-1" />
              <div className="font-bold text-lg">Hello, sign in</div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute -right-12 top-4 text-white">
                <X size={32} />
              </button>
            </div>

            <div className="py-2">
              <div className="px-5 py-3 font-bold text-lg border-b text-gray-800">Shop by Category</div>
              <ul className="py-2 border-b">
                {["All", ...categories].map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => {
                        setActiveCategory(c);
                        setView("home");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm flex items-center justify-between ${activeCategory === c ? "text-[#c7511f] font-bold bg-orange-50" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {c}
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="px-5 py-3 font-bold text-lg border-b text-gray-800 mt-2">Help & Settings</div>
              <ul className="py-2">
                <li>
                  <button onClick={() => { setView("cart"); setIsMobileMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
                    Your Account
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView("wishlist"); setIsMobileMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
                    Your Wishlist
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <span>🌐</span> English
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <span>🇮🇳</span> India
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
