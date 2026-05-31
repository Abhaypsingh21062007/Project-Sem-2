import { useState, useRef } from "react";
import { Star, Heart, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ product, onBack, onOpen }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [mainImage, setMainImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.options[0] ?? "");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, zoom: false });
  const [qty, setQty] = useState(1);
  const imgRef = useRef(null);
  const inWish = isInWishlist(product.id);

  const images = product.images ?? [product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const alsoBought = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y, zoom: true });
  };

  const handleMouseLeave = () => setZoomPos({ x: 0, y: 0, zoom: false });

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)));
        return (
          <div key={i} className="relative w-4 h-4">
            <Star size={16} className="text-gray-300 fill-gray-300 absolute inset-0" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={16} className="text-amber-500 fill-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-2 text-xs text-[#565959]">
        <button onClick={onBack} className="hover:text-[#c7511f] hover:underline">Home</button>
        <span className="mx-1">›</span>
        <span className="hover:text-[#c7511f] hover:underline cursor-pointer">{product.category}</span>
        <span className="mx-1">›</span>
        <span className="truncate">{product.title}</span>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <div className="flex gap-4">
            <div className="flex flex-row lg:flex-col gap-2 order-2 lg:order-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`w-12 h-12 border rounded overflow-hidden shrink-0 ${
                    mainImage === i ? "border-[#e77600] shadow" : "border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            <div className="flex-grow order-1 lg:order-2">
              <div
                ref={imgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square bg-gray-50 rounded overflow-hidden cursor-crosshair"
              >
                <img
                  src={images[mainImage]}
                  alt={product.title}
                  className={`w-full h-full object-contain transition-transform ${zoomPos.zoom ? "scale-150" : ""}`}
                  style={zoomPos.zoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                />
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.badges.map((b) => (
                      <span key={b} className="bg-[#cc0c39] text-white text-xs px-2 py-1 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Truck, label: "Free Delivery" },
              { icon: Shield, label: "2 Year Warranty" },
              { icon: RotateCcw, label: "7 Day Return" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1 p-2">
                <b.icon size={24} className="text-[#007185]" />
                <span className="text-xs text-gray-700">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
              Visit the {product.brand} Store
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">4.5★ in {product.category}</span>
          </div>

          <div className="flex items-center gap-2 mb-3 pb-3 border-b">
            {renderStars(product.rating)}
            <span className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
              {product.reviewCount.toLocaleString("en-IN")} ratings
            </span>
          </div>

          <div className="bg-gray-50 p-3 rounded border mb-3">
            <div className="text-2xl font-medium text-gray-900">
              M.R.P.: <span className="line-through text-gray-500">{formatPrice(product.originalPrice)}</span>
            </div>
            <div className="text-3xl font-medium text-gray-900 my-1">
              Price: <span className="text-[#B12704]">{formatPrice(product.price)}</span>
            </div>
            <div className="text-sm text-[#cc0c39] font-medium mb-1">Inclusive of all taxes</div>
            <div className="text-sm text-gray-700">
              You save: <span className="font-semibold">{formatPrice(product.originalPrice - product.price)} ({product.discount}%)</span>
            </div>
          </div>

          {product.prime && (
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#232f3e] text-white text-xs px-2 py-0.5 rounded font-bold italic">prime</span>
                <span className="text-sm">{product.delivery}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Or fastest delivery <span className="font-bold">Today</span>. Order within <span className="text-[#007185]">4 hrs 23 mins</span>
              </div>
            </div>
          )}

          <div className="mb-3">
            <div className="text-lg font-medium text-[#007600] mb-1">In Stock</div>
            <div className="text-sm text-gray-600">
              Sold by <span className="text-[#007185] hover:underline cursor-pointer">Amazon.in</span> and Fulfilled by Amazon.in.
            </div>
          </div>

          {product.variants && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">
                {product.variants.type}: <span className="font-normal">{selectedVariant}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariant(opt)}
                    className={`px-3 py-1.5 border rounded text-sm ${
                      selectedVariant === opt
                        ? "border-[#e77600] ring-1 ring-[#e77600] bg-orange-50"
                        : "border-gray-400 hover:border-[#e77600]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <h3 className="text-sm font-medium">About this item</h3>
            <ul className="text-sm space-y-1 text-gray-700 list-disc pl-5">
              {product.description.split(". ").map((s, i) => (
                <li key={i}>{s}</li>
              ))}
              <li>1 Year Manufacturer Warranty</li>
              <li>Country of Origin: India</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="border rounded-lg p-4 sticky top-24">
            <div className="text-3xl font-medium text-[#B12704] mb-2">{formatPrice(product.price)}</div>
            <div className="text-sm mb-2">
              <span className="text-[#007185]">FREE delivery</span> <span className="font-bold">{product.delivery.split(" ").slice(-1)[0]}</span>
            </div>
            <div className="text-lg font-medium text-[#007600] mb-3">In Stock</div>

            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm">Qty:</label>
              <div className="flex items-center border rounded-md">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 py-1 hover:bg-gray-100">
                  <Minus size={14} />
                </button>
                <span className="px-3 text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-2 py-1 hover:bg-gray-100">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product, selectedVariant)}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full text-sm font-medium mb-2 border border-[#fcd200] shadow-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, selectedVariant);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full bg-[#fa8900] hover:bg-[#e47900] py-2 rounded-full text-sm font-medium mb-3 text-white shadow-sm"
            >
              Buy Now
            </button>

            <div className="border-t pt-3 space-y-1 text-xs">
              {[
                ["Ships from", "Amazon.in"],
                ["Sold by", "Amazon.in"],
                ["Payment", "Secure transaction"],
                ["Returns", "7-day Replacement"],
                ["Warranty", "1 year manufacturer"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-600">{k}</span>
                  <span className="text-[#007185]">{v}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2 border rounded-full text-sm hover:bg-gray-50"
            >
              <Heart size={16} className={inWish ? "fill-red-500 text-red-500" : ""} />
              {inWish ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t max-w-[1500px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Customer reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold">{product.rating}</span>
              <span className="text-gray-500">out of 5</span>
            </div>
            <div className="mb-2">{renderStars(product.rating)}</div>
            <div className="text-sm text-gray-600">{product.reviewCount.toLocaleString("en-IN")} global ratings</div>
          </div>
          <div className="md:col-span-2 border rounded p-4 space-y-3">
            {[
              { rating: 5, pct: 72 },
              { rating: 4, pct: 15 },
              { rating: 3, pct: 6 },
              { rating: 2, pct: 3 },
              { rating: 1, pct: 4 },
            ].map((r) => (
              <div key={r.rating} className="flex items-center gap-2 text-sm">
                <span className="text-[#007185] hover:underline cursor-pointer w-16">{r.rating} star</span>
                <div className="flex-grow bg-gray-200 rounded h-3 overflow-hidden">
                  <div className="bg-[#ffa41c] h-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-[#007185] hover:underline cursor-pointer w-12">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Rahul Sharma", date: "Reviewed on 15 January 2026", title: "Excellent product, highly recommended!", text: "Absolutely love this product. Quality is outstanding and delivery was super fast. Definitely worth the price.", rating: 5 },
            { name: "Priya Patel", date: "Reviewed on 10 January 2026", title: "Good value for money", text: "Works as expected. Build quality is solid and features are great. Minor issue with packaging but overall happy with purchase.", rating: 4 },
            { name: "Amit Kumar", date: "Reviewed on 5 January 2026", title: "Best in this category", text: "Compared to other products in this range, this is clearly the best choice. Premium feel and reliable performance.", rating: 5 },
          ].map((review, i) => (
            <div key={i} className="border rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {review.name[0]}
                </div>
                <span className="text-sm font-medium">{review.name}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{review.date}</div>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(review.rating)}
                <span className="font-bold text-sm">{review.title}</span>
              </div>
              <p className="text-sm text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t max-w-[1500px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Customers who viewed this item also viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onOpen(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="border rounded p-3 cursor-pointer hover:shadow-md transition"
            >
              <div className="aspect-square bg-gray-50 mb-2 overflow-hidden rounded">
                <img src={p.image} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="line-clamp-2 text-xs mb-1 hover:text-[#c7511f]">{p.title}</div>
              <div className="font-semibold text-sm text-[#B12704]">{formatPrice(p.price)}</div>
              <div className="text-xs text-[#007600]">FREE Delivery</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t max-w-[1500px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Frequently bought together</h2>
        <div className="flex items-start gap-4 overflow-x-auto pb-2">
          {alsoBought.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 shrink-0">
              {i > 0 && <Plus size={20} className="text-gray-400 shrink-0" />}
              <div className="w-32 shrink-0">
                <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2">
                  <img src={p.image} alt="" className="w-full h-full object-contain" />
                </div>
                <label className="flex items-center gap-1 text-xs">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="line-clamp-2">This item: {p.title.substring(0, 30)}</span>
                </label>
              </div>
            </div>
          ))}
          <div className="shrink-0 ml-4">
            <div className="text-sm mb-2">Total price: <span className="font-bold">{formatPrice(alsoBought.reduce((s, p) => s + p.price, 0))}</span></div>
            <button className="bg-[#ffd814] hover:bg-[#f7ca00] px-4 py-2 rounded-full text-sm font-medium border border-[#fcd200]">
              Add all 3 to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
