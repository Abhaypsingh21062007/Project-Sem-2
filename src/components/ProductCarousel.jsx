import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ title, subtitle, seeMore, products, onOpen }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    updateScrollState();
  }, [products]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    <div className="bg-white rounded-sm shadow-sm py-4 px-4 relative">
      <div className="flex items-baseline justify-between mb-3 px-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        {seeMore && (
          <button className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm">
            {seeMore}
          </button>
        )}
      </div>
      <div className="relative">
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2 rounded">
            <ChevronLeft size={24} />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 pb-2"
        >
          {products.map((p) => (
            <div key={p.id} className="shrink-0 w-[200px]">
              <ProductCard product={p} onOpen={onOpen} compact />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2 rounded">
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
