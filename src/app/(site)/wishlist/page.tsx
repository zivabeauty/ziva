"use client";

import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useCart } from "@/features/cart/hooks/useCart";
import { useUiStore } from "@/store/ui.store";
import { getDiscountedPrice } from "@/lib/pricing";
import Price from "@/components/ui/Price";

export default function WishlistPage() {
  const { items: wishlistItems, remove } = useWishlist();
  const { addItem } = useCart();
  const openCart = useUiStore((s) => s.openDrawer);

  const moveToCart = (item: (typeof wishlistItems)[number]) => {
    addItem({
      id: item.id,
      name: item.name,
      size: "Standard",
      price: getDiscountedPrice(item.price),
      quantity: 1,
      image: item.image,
    });
    remove(item.id);
    openCart("cart");
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-[#C9A961] selection:text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 select-none">
          <span className="text-[10px] font-bold tracking-[0.35em] text-[#C9A961] uppercase">Your Private Vanity</span>
          <h1 className="text-3xl font-light font-serif uppercase tracking-widest text-[#0D0D0D] mt-2.5">
            Vanity Wishlist
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A961] mx-auto mt-4"></div>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group border border-stone-200/60 p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-lg rounded-none"
              >
                <div className="relative aspect-square overflow-hidden bg-stone-50 mb-4 border border-stone-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  
                  <button 
                    onClick={() => remove(item.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white text-stone-400 hover:text-red-500 rounded-full border border-stone-100 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[9px] text-[#C9A961] font-semibold uppercase tracking-widest block mb-1">{item.category}</span>
                  <h3 className="text-xs font-semibold text-stone-900 tracking-wide mb-1 line-clamp-1">{item.name}</h3>
                  <Price price={item.price} size="sm" />
                </div>

                <div className="mt-6">
                  <Magnetic>
                    <button
                      onClick={() => moveToCart(item)}
                      className="w-full py-3 bg-black text-white hover:bg-[#C9A961] hover:text-black text-[9px] font-bold uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Add To Bag
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center select-none">
            <div className="w-20 h-20 rounded-full border border-dashed border-[#C9A961] flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-stone-200" />
            </div>
            <h2 className="text-[11px] font-bold tracking-[0.2em] text-[#0D0D0D] uppercase mb-2">No Saved Masterpieces</h2>
            <p className="text-[10px] text-stone-400 max-w-[280px] leading-relaxed mb-8">Save your favorite beauty and skincare elixirs here to build your personalized skin health ceremony.</p>
            <Link 
              href="/"
              className="px-8 py-3.5 bg-[#0D0D0D] text-white hover:bg-[#C9A961] hover:text-black text-[10px] font-bold uppercase tracking-widest transition-all rounded-none"
            >
              Shop Collections
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
