import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../data/products";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <div className="relative h-[250px] sm:h-[320px] md:h-[420px] lg:h-[500px]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-transparent to-transparent" />
          </div>
        ))}

        <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-10">
          <button
            onClick={() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)}
            className="bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 md:p-3 rounded-md transition"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-10">
          <button
            onClick={() => setCurrent((c) => (c + 1) % heroSlides.length)}
            className="bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 md:p-3 rounded-md transition"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white z-10 px-4 max-w-2xl">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
            {heroSlides[current].title}
          </div>
          <div className="text-lg md:text-2xl font-medium drop-shadow">
            {heroSlides[current].subtitle}
          </div>
          <div className="mt-2 text-sm md:text-base drop-shadow">
            {heroSlides[current].tagline}
          </div>
        </div>
      </div>
    </div>
  );
}
