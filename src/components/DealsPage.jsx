import { Tag } from "lucide-react";
import { products, formatPrice } from "../data/products";

export default function DealsPage({ onOpen, products: passedProducts }) {
  const deals = [...(passedProducts || products)].sort((a, b) => b.discount - a.discount);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-4">
        <Tag size={32} className="text-[#cc0c39]" />
        <h2 className="text-3xl font-bold">Today's Deals</h2>
      </div>
      <p className="text-gray-600 mb-6">Discover today's featured deals and limited-time offers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {deals.map((p) => (
          <div
            key={p.id}
            onClick={() => onOpen(p)}
            className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="aspect-square overflow-hidden rounded mb-3 bg-gray-50">
              <img src={p.image} alt={p.title} className="w-full h-full object-contain hover:scale-105 transition" />
            </div>
            <div className="mb-2">
              <span className="bg-[#cc0c39] text-white text-xs px-2 py-0.5 rounded font-medium">
                {p.discount}% off
              </span>
              <span className="ml-2 text-[#cc0c39] text-sm font-medium">Deal of the Day</span>
            </div>
            <h3 className="text-sm font-medium line-clamp-2 mb-2 hover:text-[#c7511f]">{p.title}</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-semibold text-[#B12704]">{formatPrice(p.price)}</span>
              <span className="text-sm text-gray-500 line-through">{formatPrice(p.originalPrice)}</span>
            </div>
            <div className="text-xs text-gray-600 mb-3">{p.delivery}</div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-1.5 rounded-full text-sm font-medium border border-[#fcd200]"
            >
              See deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
