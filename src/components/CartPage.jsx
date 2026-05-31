import { ShoppingCart, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function CartPage({ onContinue, onOpenProduct }) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b">
            <h2 className="text-2xl font-normal">Shopping Cart</h2>
            <button onClick={clearCart} className="text-sm text-[#565959] hover:text-[#c7511f] hover:underline">
              Clear Cart
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={80} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Your Amazon.in Cart is empty</h3>
              <p className="text-gray-600 mb-6">Check your Saved for Later items below or explore Today's Deals.</p>
              <button
                onClick={onContinue}
                className="bg-[#ffd814] hover:bg-[#f7ca00] px-6 py-2 rounded-full font-medium border border-[#fcd200]"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              <div className="text-right mb-4 text-lg">
                Price: <span className="font-bold text-[#B12704]">{formatPrice(totalPrice)}</span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-contain bg-gray-50 rounded shrink-0 cursor-pointer"
                      onClick={() => onOpenProduct?.(item.id)}
                    />
                    <div className="flex-grow min-w-0">
                      <h3
                        className="font-medium text-sm md:text-base line-clamp-2 hover:text-[#c7511f] cursor-pointer mb-1"
                        onClick={() => onOpenProduct?.(item.id)}
                      >
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#007600] font-medium mb-1">In Stock</div>
                      <div className="text-xs text-gray-600 mb-1">
                        {item.prime && <span className="bg-[#232f3e] text-white px-1 py-0.5 rounded text-[10px] italic mr-1">prime</span>}
                        Eligible for FREE Shipping
                      </div>
                      {item.selectedVariant && (
                        <div className="text-xs text-gray-600 mb-1">
                          <span className="font-bold">Style:</span> {item.selectedVariant}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs mt-2">
                        <div className="flex items-center border rounded-md bg-[#f0f2f2]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-200">
                            <Minus size={12} />
                          </button>
                          <span className="px-2 py-1 font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-200">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-gray-400 hidden sm:inline">|</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#007185] hover:text-[#c7511f] hover:underline">
                          Delete
                        </button>
                        <span className="text-gray-400 hidden sm:inline">|</span>
                        <button className="text-[#007185] hover:text-[#c7511f] hover:underline hidden sm:inline">Save for later</button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-base md:text-lg">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4 text-lg">
                Subtotal ({totalItems} items): <span className="font-bold text-[#B12704]">{formatPrice(totalPrice)}</span>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="lg:col-span-4">
            <div className="bg-white p-4 rounded-sm shadow-sm sticky top-24">
              <div className="text-sm mb-3">
                Subtotal ({totalItems} items): <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
              </div>
              <label className="flex items-center gap-2 text-sm mb-3">
                <input type="checkbox" className="rounded" />
                This order contains a gift
              </label>
              <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full font-medium border border-[#fcd200] shadow-sm mb-3">
                Proceed to Buy
              </button>

              <div className="border-t pt-3 mt-3">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Truck size={18} className="text-[#007185]" />
                  <span className="font-medium">Delivery options</span>
                </div>
                <div className="text-xs text-gray-600 ml-6">FREE delivery available</div>

                <div className="flex items-center gap-2 text-sm mb-2 mt-3">
                  <ShieldCheck size={18} className="text-[#007185]" />
                  <span className="font-medium">Secure payment</span>
                </div>
                <div className="text-xs text-gray-600 ml-6">Your transaction is secure</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
