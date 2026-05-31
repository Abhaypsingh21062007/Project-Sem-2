import { Star, Heart } from "lucide-react";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onOpen, compact }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWish = isInWishlist(product.id);

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)));
        return (
          <div key={i} className="relative w-3.5 h-3.5">
            <Star size={14} className="text-gray-300 fill-gray-300 absolute inset-0" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={14} className="text-amber-500 fill-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );

  if (compact) {
    return (
      <div
        onClick={() => onOpen?.(product)}
        className="group bg-white rounded p-3 cursor-pointer hover:shadow-lg transition min-w-[180px] shrink-0"
      >
        <div className="relative aspect-square mb-2 overflow-hidden rounded">
          <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition" />
        </div>
        <div className="text-xs line-clamp-2 mb-1 group-hover:text-[#c7511f]">{product.title}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-semibold text-[#B12704]">{formatPrice(product.price)}</span>
        </div>
        <div className="text-[11px] text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 flex flex-col h-full group relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-1.5 rounded-full shadow hover:shadow-md transition"
      >
        <Heart size={18} className={inWish ? "fill-red-500 text-red-500" : "text-gray-500"} />
      </button>

      <div onClick={() => onOpen?.(product)} className="cursor-pointer">
        <div className="aspect-square mb-3 overflow-hidden rounded flex items-center justify-center bg-gray-50">
          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition" />
        </div>
        <div className="line-clamp-2 text-sm font-medium mb-1 group-hover:text-[#c7511f] min-h-[2.5rem]">
          {product.title}
        </div>
        <div className="flex items-center gap-1 mb-1">
          {renderStars(product.rating)}
          <span className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline ml-1">
            {product.reviewCount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xs align-top">₹</span>
            <span className="text-2xl font-medium">{Math.floor(product.price).toLocaleString("en-IN")}</span>
            <span className="text-xs">{String(product.price).split(".")[1] ?? "00"}</span>
          </div>
          <div className="flex items-baseline gap-2 text-xs">
            <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-[#cc0c39] font-medium">({product.discount}% off)</span>
          </div>
        </div>
        {product.prime && (
          <div className="flex items-center gap-1 mb-1">
            <span className="bg-[#232f3e] text-white text-[10px] px-1.5 py-0.5 rounded font-bold italic">prime</span>
            <span className="text-xs text-gray-600">FREE delivery</span>
          </div>
        )}
        <div className="text-xs text-gray-600 mb-2">{product.delivery}</div>
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.badges.map((b) => (
              <span key={b} className="text-[10px] bg-[#c7511f] text-white px-1.5 py-0.5 rounded">
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto space-y-1.5">
        <button onClick={() => addToCart(product)} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium py-1.5 rounded-full border border-[#fcd200] shadow-sm transition">
          Add to Cart
        </button>
        <button onClick={() => addToCart(product)} className="w-full bg-[#fa8900] hover:bg-[#e47900] text-sm font-medium py-1.5 rounded-full shadow-sm transition text-white">
          Buy Now
        </button>
      </div>
    </div>
  );
}
