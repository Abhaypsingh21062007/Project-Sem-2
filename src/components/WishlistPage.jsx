import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

export default function WishlistPage({ onOpen, onContinue }) {
  const { wishlist } = useCart();

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b bg-white p-4 rounded-sm shadow-sm">
        <h2 className="text-2xl font-normal">Your Wishlist</h2>
        <span className="text-sm text-gray-500">{wishlist.length} items</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm shadow-sm">
          <h3 className="text-2xl font-bold mb-2">Your Wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
          <button
            onClick={onContinue}
            className="bg-[#ffd814] hover:bg-[#f7ca00] px-6 py-2 rounded-full font-medium border border-[#fcd200]"
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
