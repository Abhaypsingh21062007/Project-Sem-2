import { formatPrice } from "../data/products";

export default function DealCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition">
      <div className="aspect-square overflow-hidden rounded mb-3 bg-gray-50">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain hover:scale-105 transition" />
      </div>
      <div className="mb-1">
        <div className="inline-block bg-[#cc0c39] text-white text-xs px-1.5 py-0.5 rounded mr-2">
          {product.discount}% off
        </div>
        <span className="text-[#cc0c39] text-xs font-medium">Deal</span>
      </div>
      <h4 className="text-sm font-medium line-clamp-2 mb-1 hover:text-[#c7511f] cursor-pointer">{product.title}</h4>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-lg font-semibold text-[#B12704]">{formatPrice(product.price)}</span>
        <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
      </div>
      <div className="text-xs text-gray-600">{product.delivery}</div>
      <div className="mt-3">
        <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-[#e47911] h-full" style={{ width: `${Math.min(95, (product.reviewCount / 250000) * 100)}%` }} />
        </div>
        <div className="text-xs text-[#c7511f] mt-1 font-medium">
          {Math.min(95, Math.round((product.reviewCount / 250000) * 100))}% claimed
        </div>
      </div>
    </div>
  );
}
