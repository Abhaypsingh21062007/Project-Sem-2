import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import DealsPage from "./components/DealsPage";
import FreshPage from "./components/FreshPage";
import MXPlayerPage from "./components/MXPlayerPage";
import SellPage from "./components/SellPage";
import BestsellersPage from "./components/BestsellersPage";
import MobilesPage from "./components/MobilesPage";
import PrimePage from "./components/PrimePage";
import NewReleasesPage from "./components/NewReleasesPage";
import CustomerServicePage from "./components/CustomerServicePage";
import Footer from "./components/Footer";
import DealCard from "./components/DealCard";
import { products } from "./data/products";

const HomePage = ({ searchQuery, activeCategory, onOpen, setView, setActiveCategory, products }) => {
  const bestsellers = products.slice(0, 6);
  const electronics = products.filter((p) => p.category === "Electronics");
  const fashion = products.filter((p) => p.category === "Fashion");
  const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 6);
  const trending = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);
  const recentlyViewed = products.slice(4, 10);

  const searchFiltered = searchQuery
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categoryFiltered = activeCategory !== "All"
    ? products.filter((p) => p.category === activeCategory)
    : [];

  // Show a full page grid if searching or browsing a specific category
  if (searchQuery || activeCategory !== "All") {
    const displayProducts = searchQuery ? searchFiltered : categoryFiltered;
    const filterLabel = searchQuery ? `Results for "${searchQuery}"` : `${activeCategory} Products`;

    return (
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-sm shadow-sm mb-6">
          <div className="flex flex-wrap items-baseline justify-between mb-4 gap-2">
            <h2 className="text-xl md:text-2xl font-bold">{filterLabel}</h2>
            <button
              onClick={() => {
                if (searchQuery) {
                  setView("home");
                } else {
                  setActiveCategory("All");
                }
              }}
              className="text-[#007185] hover:underline text-sm"
            >
              Clear filter
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500">{displayProducts.length} results found</span>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-[#007185]">Sort by: Featured</span>
          </div>

          {displayProducts.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <p className="text-lg md:text-xl mb-2 font-medium">No results found</p>
              <p className="text-sm">Try searching for something else or browse our other categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <CategoryGrid />

      <div className="px-4 md:px-6 mt-6 space-y-6">
        {/* Today's Deals */}
        <div>
          <div className="flex items-baseline justify-between mb-3 px-2">
            <h2 className="text-2xl font-bold">Today's Deals</h2>
            <button
              onClick={() => setView("deals")}
              className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
            >
              See all deals
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {deals.map((p) => (
              <div key={p.id} onClick={() => onOpen(p)} className="cursor-pointer">
                <DealCard product={p} />
              </div>
            ))}
          </div>
        </div>

        <ProductCarousel
          title="Bestsellers in Electronics"
          seeMore="See more"
          products={electronics}
          onOpen={onOpen}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <h3 className="text-xl font-bold mb-3">Customers' Most-Loved Fashion for you</h3>
            <div className="grid grid-cols-2 gap-3">
              {fashion.map((p) => (
                <div key={p.id} onClick={() => onOpen(p)} className="cursor-pointer">
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-1">
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-full object-contain hover:scale-105 transition"
                    />
                  </div>
                  <div className="line-clamp-2 text-xs hover:text-[#c7511f]">{p.title}</div>
                  <div className="font-semibold text-sm text-[#B12704]">
                    ₹{Math.floor(p.price).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[#007185] hover:underline text-sm mt-3">Explore more</button>
          </div>

          <div className="bg-white rounded-sm shadow-sm p-4">
            <h3 className="text-xl font-bold mb-3">Up to 50% off | International brands</h3>
            <div className="aspect-video bg-gray-50 rounded overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm mb-2">Premium brands from around the world, now at exclusive prices.</p>
            <button className="text-[#007185] hover:underline text-sm">See all offers</button>
          </div>
        </div>

        <ProductCarousel
          title="Keep shopping for"
          subtitle="Based on your browsing history"
          seeMore="See more"
          products={recentlyViewed}
          onOpen={onOpen}
        />

        <ProductCarousel
          title="More items to consider"
          seeMore="See more"
          products={trending}
          onOpen={onOpen}
        />

        <ProductCarousel
          title="Trending now"
          subtitle="Most popular right now"
          seeMore="See more"
          products={bestsellers.slice().reverse()}
          onOpen={onOpen}
        />
      </div>
    </div>
  );
};

function AppContent() {
  const [view, setView] = useState("home");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [productsList, setProductsList] = useState(products);
  const [isPrimeMember, setIsPrimeMember] = useState(false);
  const { totalItems } = useCart();

  const openProduct = (p) => {
    setCurrentProduct(p);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProductById = (id) => {
    const p = productsList.find((x) => x.id === id);
    if (p) openProduct(p);
  };

  const handleAddProduct = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
  };

  useEffect(() => {
    if (view !== "product") {
      setCurrentProduct(null);
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        view={view}
        setView={setView}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        productsList={productsList}
        isPrimeMember={isPrimeMember}
      />

      {view === "home" && (
        <HomePage
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          onOpen={openProduct}
          setView={setView}
          setActiveCategory={setActiveCategory}
          products={productsList}
        />
      )}
      {view === "product" && currentProduct && (
        <ProductDetail
          product={currentProduct}
          onBack={() => setView("home")}
          onOpen={openProduct}
        />
      )}
      {view === "cart" && (
        <CartPage
          onContinue={() => setView("home")}
          onOpenProduct={openProductById}
        />
      )}
      {view === "wishlist" && (
        <WishlistPage onOpen={openProduct} onContinue={() => setView("home")} />
      )}
      {view === "deals" && <DealsPage onOpen={openProduct} products={productsList} />}
      {view === "fresh" && <FreshPage products={productsList} onOpen={openProduct} />}
      {view === "mxplayer" && <MXPlayerPage />}
      {view === "sell" && (
        <SellPage
          products={productsList}
          onAddProduct={handleAddProduct}
          onOpenProduct={openProduct}
        />
      )}
      {view === "bestsellers" && (
        <BestsellersPage products={productsList} onOpen={openProduct} />
      )}
      {view === "mobiles" && (
        <MobilesPage products={productsList} onOpen={openProduct} />
      )}
      {view === "prime" && (
        <PrimePage isPrime={isPrimeMember} onJoin={() => setIsPrimeMember(true)} />
      )}
      {view === "newreleases" && (
        <NewReleasesPage products={productsList} onOpen={openProduct} />
      )}
      {view === "customerservice" && (
        <CustomerServicePage />
      )}

      <Footer />

      {/* Floating Cart Button */}
      {totalItems > 0 && view !== "cart" && (
        <button
          onClick={() => setView("cart")}
          className="fixed bottom-6 right-6 bg-[#232f3e] hover:bg-[#1a242f] text-white rounded-full shadow-2xl px-5 py-3 flex items-center gap-2 z-50 transition-all"
        >
          <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
          <span className="font-medium text-sm">View Cart</span>
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
