import { useState } from "react";
import { Plus, LayoutDashboard, ShoppingBag, TrendingUp, AlertCircle, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";
import { formatPrice } from "../data/products";

export default function SellPage({ products, onAddProduct, onOpenProduct }) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [image, setImage] = useState("");
  const [prime, setPrime] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedPresetImage, setSelectedPresetImage] = useState("");

  const presetImages = [
    {
      label: "Gaming Keyboard",
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    },
    {
      label: "Smart Watch",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    },
    {
      label: "Designer Sneakers",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    },
    {
      label: "Gourmet Coffee Mug",
      url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
    },
    {
      label: "Wireless Earbuds",
      url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    },
  ];

  // Filter products listed by the seller
  const sellerListings = products.filter((p) => p.isSellerProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !brand || !description) {
      alert("Please fill in all required fields!");
      return;
    }

    const calculatedPrice = parseFloat(price);
    const calculatedOriginalPrice = originalPrice ? parseFloat(originalPrice) : calculatedPrice;
    const discount = calculatedOriginalPrice > calculatedPrice
      ? Math.round(((calculatedOriginalPrice - calculatedPrice) / calculatedOriginalPrice) * 100)
      : 0;

    const finalImage = image || selectedPresetImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80";

    const newProduct = {
      id: Date.now(),
      title,
      brand,
      price: calculatedPrice,
      originalPrice: calculatedOriginalPrice,
      discount,
      rating: 5.0, // Perfect score for brand-new seller products!
      reviewCount: 1,
      image: finalImage,
      category,
      delivery: prime ? "FREE delivery Tomorrow" : "FREE delivery Wednesday",
      prime,
      inStock,
      description,
      isSellerProduct: true,
      badges: ["New Release", "Seller Exclusive"],
    };

    onAddProduct(newProduct);

    // Reset Form
    setTitle("");
    setBrand("");
    setPrice("");
    setOriginalPrice("");
    setImage("");
    setSelectedPresetImage("");
    setDescription("");
    setSuccessMessage(`"${title}" has been listed successfully!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 6000);
  };

  const handleSelectPreset = (url) => {
    setSelectedPresetImage(url);
    setImage(""); // Clear custom URL if preset chosen
  };

  return (
    <div className="bg-[#f0f2f2] min-h-screen pb-16 font-sans">
      {/* Seller Header */}
      <div className="bg-[#19222d] text-white py-4 px-6 md:px-8 border-b border-gray-800 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <div className="text-xl font-black flex items-center gap-1.5 tracking-tight">
            <TrendingUp size={22} className="text-orange-500 stroke-[3]" />
            amazon<span className="text-orange-500 font-extrabold uppercase text-sm bg-gray-900 border border-gray-700 px-2 py-0.5 rounded ml-1 tracking-wider">seller central</span>
          </div>
        </div>
        <div className="text-xs font-semibold text-gray-400 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
          Seller Status: <span className="text-green-400 font-bold">Active</span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-6">
        {/* Dynamic Seller Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Revenue", val: formatPrice(sellerListings.reduce((sum, p) => sum + p.price * 2, 0) + (sellerListings.length > 0 ? 12400 : 0)), icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Active Listings", val: sellerListings.length, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Orders Pending", val: sellerListings.length > 0 ? "1" : "0", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Total Views", val: sellerListings.length > 0 ? "2,410" : "0", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">{stat.label}</span>
                <span className="text-xl md:text-2xl font-black text-gray-900 mt-1 block">{stat.val}</span>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl shadow-inner`}>
                <stat.icon size={22} className="stroke-[2.5]" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic success notification toast */}
        {successMessage && (
          <div className="bg-green-50 border border-green-400 rounded-lg p-4 mb-6 text-green-800 flex items-start gap-3 shadow-md animate-fade-in">
            <CheckCircle size={22} className="text-green-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Listing Created Successfully!</h4>
              <p className="text-xs text-green-700 mt-1 font-semibold">{successMessage}</p>
              <p className="text-[10px] text-green-600 mt-1">Your item is now live and can be searched, viewed, and purchased immediately.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List new product form */}
          <section className="lg:col-span-8 bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200/80">
            <h3 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
              <Plus size={20} className="text-orange-500 stroke-[3]" /> List a New Product on Amazon.in
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Sony, Apple, Borges"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 22990"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Original Price (M.R.P. in ₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 29990"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {["Electronics", "Fashion", "Home & Kitchen", "Books", "Mobiles", "Beauty", "Toys", "Grocery", "Sports", "Automotive"].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preset Image Selector Grid */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Select a High-Quality Preset Image *</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {presetImages.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => handleSelectPreset(img.url)}
                      className={`relative aspect-square rounded border overflow-hidden transition group flex flex-col justify-end p-1.5 text-[9px] font-black text-white ${
                        selectedPresetImage === img.url
                          ? "border-orange-500 ring-2 ring-orange-500 shadow"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 w-full truncate bg-black/45 p-1 rounded-sm text-center">{img.label}</span>
                    </button>
                  ))}
                </div>
                <div className="text-center text-xs text-gray-400 my-2.5 font-bold">OR</div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Provide Custom Product Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setSelectedPresetImage(""); // Clear preset if custom typed
                      }}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <ImageIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-center py-2.5 border-t border-b border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prime}
                    onChange={(e) => setPrime(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    Offer <span className="bg-[#232f3e] text-white text-[9px] font-extrabold italic px-1 rounded uppercase tracking-wider">prime</span> Shipping (Free Tomorrow)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-700">Mark as In-Stock</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Product Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Industry-leading features with reliable performance. Includes 1-year product warranty. Beautiful design with long-lasting quality."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#fa8900] hover:bg-[#e47900] text-white py-2.5 rounded text-sm font-bold shadow-md hover:shadow-lg transition duration-200 border border-[#e47900]"
              >
                Launch Product Live on Amazon.in
              </button>
            </form>
          </section>

          {/* Active listings sidebar */}
          <aside className="lg:col-span-4 bg-white rounded-lg p-5 shadow-sm border border-gray-200/80 h-fit">
            <h3 className="font-extrabold text-lg tracking-tight mb-4 flex items-center gap-2 text-gray-800">
              <LayoutDashboard size={18} className="text-orange-500" /> Your Active Listings
            </h3>

            {sellerListings.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                <ShoppingBag size={32} className="mx-auto text-gray-300 mb-2" />
                <h4 className="text-sm font-bold text-gray-700">No Listings Yet</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto">Fill out the listing form to launch your very first product.</p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                {sellerListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => onOpenProduct(listing)}
                    className="flex gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-orange-300 hover:bg-orange-50/20 cursor-pointer transition group"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded border overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img src={listing.image} alt={listing.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-bold text-xs text-gray-800 group-hover:text-orange-600 transition line-clamp-1">
                          {listing.title}
                        </h4>
                        <span className="text-[9px] text-gray-400 font-bold">{listing.brand} • {listing.category}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-black text-gray-900">{formatPrice(listing.price)}</span>
                        <span className="text-[9px] text-green-700 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                          Live Store
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
