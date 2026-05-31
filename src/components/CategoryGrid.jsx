import { categorySections } from "../data/products";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6 -mt-16 md:-mt-24 relative z-10">
      {categorySections.map((section, idx) => (
        <div key={idx} className="bg-white p-4 rounded-sm shadow-sm">
          <h3 className="font-bold text-lg mb-3">{section.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            {section.items.map((item, i) => (
              <div key={i} className="cursor-pointer group">
                <div className="aspect-square overflow-hidden rounded bg-gray-50 mb-1">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <p className="text-xs text-gray-700 line-clamp-2 group-hover:text-[#c7511f]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <button className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm mt-3">
            {section.link}
          </button>
        </div>
      ))}
    </div>
  );
}
