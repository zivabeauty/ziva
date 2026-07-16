"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Leaf, 
  Truck,
  ArrowLeft,
  Share2,
  ChevronDown,
  Info,
  Sparkles
} from "lucide-react";
import Tilt from "@/components/Tilt";
import Magnetic from "@/components/Magnetic";
import { products as staticProducts, type Product } from "@/data/beautyData";
import { useProduct, useProducts } from "@/features/products/hooks/useProducts";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { addToCart } from "@/lib/product-utils";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params.id as string;
  const productId = parseInt(idStr) || 1;
  const { products: productList } = useProducts();
  const { data: fetchedProduct } = useProduct(productId);
  const product = fetchedProduct ?? productList.find((p) => p.id === productId) ?? staticProducts[0];
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("50 ml");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Custom Magnifier Zoom
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);
  
  // Fullscreen Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Accordion Expanders
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  // Dynamic details mapper based on sizes
  const basePriceNum = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 499.00;
  const sizeDetails: Record<string, { price: string; priceVal: number; stock: number; sku: string }> = {
    "30 ml": { price: `₹${Math.round(basePriceNum).toLocaleString('en-IN')}`, priceVal: basePriceNum, stock: 15, sku: `ZIV-${product.id}-30` },
    "50 ml": { price: `₹${Math.round(basePriceNum * 1.4).toLocaleString('en-IN')}`, priceVal: basePriceNum * 1.4, stock: 32, sku: `ZIV-${product.id}-50` },
    "100 ml": { price: `₹${Math.round(basePriceNum * 2.2).toLocaleString('en-IN')}`, priceVal: basePriceNum * 2.2, stock: 8, sku: `ZIV-${product.id}-100` },
    "200 ml": { price: `₹${Math.round(basePriceNum * 3.5).toLocaleString('en-IN')}`, priceVal: basePriceNum * 3.5, stock: 0, sku: `ZIV-${product.id}-200` } // Out of Stock
  };

  const currentDetail = sizeDetails[selectedSize] || sizeDetails["50 ml"];

  // Sync state if product changes
  useEffect(() => {
    setSelectedSize("50 ml");
    setActiveImage(product.image);
    setQuantity(1);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (currentDetail.stock === 0) return;
    addToCart(
      { ...product, price: currentDetail.price },
      selectedSize,
      quantity
    );
  };

  const handleWishlist = () => toggleWishlist(product);
  const wishlisted = isWishlisted(product.id);

  const [linkCopied, setLinkCopied] = useState(false);
  const shareProduct = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-[#C9A961] selection:text-black pb-24">
      
      {/* Dynamic Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-2 text-xs text-stone-500 font-light border-b border-stone-100 select-none">
        <Link href="/" className="hover:text-black transition-colors uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span>Shop</span>
        <ChevronRight className="w-3 h-3" />
        <span className="uppercase tracking-widest text-[#C9A961] font-semibold">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black line-clamp-1">{product.name}</span>
      </div>

      {/* Main product display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Photo gallery with vertical thumbnails */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6 items-start">
          
          {/* Vertical thumbnail list */}
          <div className="flex flex-row md:flex-col gap-4 w-full md:w-24 overflow-x-auto md:overflow-x-visible">
            {[product.image, product.hoverImage, "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=300&auto=format&fit=crop"].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 md:w-full aspect-square border overflow-hidden transition-all rounded-xl shrink-0 ${
                  activeImage === img ? "border-[#C9A961] scale-102 shadow-xs" : "border-stone-200 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Photo Box with high-res mouse magnifier */}
          <div className="flex-grow w-full relative">
            <span className="absolute top-6 left-6 z-10 px-3 py-1 bg-black text-[#C9A961] border border-[#C9A961] text-[8px] uppercase font-bold tracking-widest rounded-full">
              {product.badge}
            </span>

            <div 
              className="relative aspect-square w-full bg-stone-50 overflow-hidden border border-stone-200/50 rounded-2xl cursor-zoom-in shadow-xs"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-100"
                style={zoomed ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: "scale(1.8)"
                } : undefined}
              />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-light block mt-3 text-center">
              Click to view fullscreen lookbook
            </span>
          </div>

        </div>

        {/* Right Side: details & size selector & accordions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <span className="text-[9px] text-[#C9A961] font-bold uppercase tracking-[0.25em]">{product.category}</span>
              <h1 className="text-3xl font-light font-serif tracking-wide text-[#111111] uppercase leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex gap-0.5 text-[#C9A961]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A961] text-[#C9A961]" />
                  ))}
                </div>
                <span className="text-xs text-stone-450 font-light">(152 Verified Reviews)</span>
              </div>
            </div>

            {/* Price with Volume detail info */}
            <div className="flex flex-col gap-1 border-y border-stone-150 py-4">
              <div className="flex items-center gap-4 text-2xl font-serif">
                <span className="font-semibold text-black">{currentDetail.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-stone-400 line-through font-light">{product.oldPrice}</span>
                )}
                <span className="text-[8px] bg-[#C9A961]/10 text-[#C9A961] border border-[#C9A961]/20 px-2 py-0.5 font-bold uppercase tracking-widest rounded-full">
                  Save 20%
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 font-light tracking-wide mt-1">
                <span>SKU: <strong className="font-medium text-stone-700">{currentDetail.sku}</strong></span>
                <span>Availability: {currentDetail.stock > 0 ? (
                  <strong className="text-emerald-600 font-medium">In Stock ({currentDetail.stock} left)</strong>
                ) : (
                  <strong className="text-rose-600 font-medium">Out of Stock</strong>
                )}</span>
              </div>
            </div>

            <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector pills */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block mb-3">Select Volume</span>
              <div className="flex flex-wrap gap-3">
                {["30 ml", "50 ml", "100 ml", "200 ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative px-5 py-3 border text-[10px] tracking-widest uppercase font-semibold transition-all rounded-full ${
                      selectedSize === size 
                        ? "border-[#C9A961] bg-[#FAF8F5] text-black shadow-[0_0_12px_rgba(201,162,39,0.15)]" 
                        : "border-stone-200 bg-transparent text-stone-600 hover:border-black"
                    }`}
                  >
                    {size}
                    {size === "200 ml" && (
                      <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 bg-rose-100 text-rose-600 text-[6px] font-bold uppercase rounded-full">Sold Out</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selection */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block mb-2.5">Quantity</span>
              <div className="flex items-center border border-stone-200 w-28 rounded-full overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 py-2 text-stone-500 hover:text-black font-semibold text-xs flex justify-center items-center"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-black select-none">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 py-2 text-stone-500 hover:text-black font-semibold text-xs flex justify-center items-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-6 mt-2 border-t border-stone-100">
              <button
                onClick={handleAddToCart}
                disabled={currentDetail.stock === 0}
                className={`flex-grow py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-all rounded-full flex items-center justify-center gap-2 group/btn ${
                  currentDetail.stock > 0 
                    ? "bg-[#C9A961] text-black hover:bg-black hover:text-white shadow-[0_8px_25px_rgba(201,162,39,0.15)]" 
                    : "bg-stone-150 text-stone-400 cursor-not-allowed border border-stone-200"
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>

              <button 
                onClick={handleWishlist}
                className="p-4 border border-stone-200 text-stone-600 hover:text-black hover:border-black transition-all rounded-full flex items-center justify-center cursor-pointer"
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${wishlisted ? "text-red-500 fill-red-500" : ""}`} />
              </button>

              <div className="relative">
                <button
                  onClick={shareProduct}
                  className="p-4 border border-stone-200 text-stone-650 hover:text-black hover:border-black transition-all rounded-full flex items-center justify-center cursor-pointer"
                  aria-label="Share product"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
                {linkCopied && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Link copied
                  </span>
                )}
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-8 flex flex-col border-t border-stone-200">
              {[
                { id: "description", label: "Description", content: `${product.description} Formulated clinically with natural active bases to preserve cellular density.` },
                { id: "ingredients", label: "Ingredients", content: product.ingredients || "Ascorbyl Glucoside, Colloidal Gold, Rosehip Seed Oil, Hyaluronic Acids." },
                { id: "benefits", label: "Benefits", content: "Nourishes deeply, targets blemishes, restores natural cell hydration, and adds satin elasticity." },
                { id: "usage", label: "How to Use", content: product.usage || "Apply 3 drops morning and evening onto clean, dry skin. Press lightly until absorbed." },
                { id: "shipping", label: "Shipping & Returns", content: "Free shipping on all orders. Carbon-neutral priority carrier transit. Easy 30-day returns." }
              ].map((sect) => (
                <div key={sect.id} className="border-b border-stone-200 py-3">
                  <button 
                    onClick={() => toggleSection(sect.id)}
                    className="w-full flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#111111] hover:text-[#C9A961] transition-colors"
                  >
                    <span>{sect.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedSection === sect.id ? "rotate-180 text-[#C9A961]" : "text-stone-400"}`} />
                  </button>
                  {expandedSection === sect.id && (
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed mt-2.5 pl-1">
                      {sect.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* FREQUENTLY BOUGHT TOGETHER BUNDLE WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-150 mt-12 select-none">
        <div className="bg-[#FAF8F5] border border-stone-200/50 rounded-[28px] p-6 sm:p-8">
          <h3 className="text-sm font-semibold tracking-wide font-serif text-[#111111] uppercase mb-6 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#C9A961]" /> Frequently Bought Together
          </h3>

          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            {/* Bundle product line-up */}
            <div className="flex flex-wrap items-center gap-4 justify-center">
              {/* Product 1 (current) */}
              <div className="flex items-center gap-3 bg-white p-3 border border-stone-150 rounded-2xl max-w-[220px]">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-stone-200/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-stone-900 line-clamp-1">{product.name}</span>
                  <span className="text-[10px] text-stone-450">{selectedSize}</span>
                  <span className="text-xs font-bold text-black">{currentDetail.price}</span>
                </div>
              </div>

              <span className="text-lg font-light text-stone-400">+</span>

              {/* Product 2 (Active Glow Cleanser) */}
              <div className="flex items-center gap-3 bg-white p-3 border border-stone-150 rounded-2xl max-w-[220px]">
                <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=150&auto=format&fit=crop" alt="Cleanser Ziva" className="w-12 h-12 object-cover rounded-lg border border-stone-200/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-stone-900 line-clamp-1">Botanical Active Cleanser</span>
                  <span className="text-[10px] text-stone-450">150 ml</span>
                  <span className="text-xs font-bold text-black">$35.00</span>
                </div>
              </div>

              <span className="text-lg font-light text-stone-400">+</span>

              {/* Product 3 (Hydra Mist Spray) */}
              <div className="flex items-center gap-3 bg-white p-3 border border-stone-150 rounded-2xl max-w-[220px]">
                <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=150&auto=format&fit=crop" alt="Mist spray Ziva" className="w-12 h-12 object-cover rounded-lg border border-stone-200/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-stone-900 line-clamp-1">Active Rose Hydra Mist</span>
                  <span className="text-[10px] text-stone-450">100 ml</span>
                  <span className="text-xs font-bold text-black">$28.00</span>
                </div>
              </div>
            </div>

            {/* Price & Checkout CTA */}
            <div className="flex flex-col gap-3 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-stone-200/80 pt-6 lg:pt-0 lg:pl-10 min-w-[240px]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Bundle Total</span>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-xl font-bold text-black">${(currentDetail.priceVal + 35 + 28 - 15).toFixed(2)}</span>
                  <span className="text-xs text-stone-400 line-through font-light">${(currentDetail.priceVal + 35 + 28).toFixed(2)}</span>
                </div>
                <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-semibold mt-1 block">Bundle Save: $15.00 (Promo Applied)</span>
              </div>

              <button
                onClick={() => {
                  handleAddToCart();
                  alert("Bundle items added to Bag successfully!");
                }}
                className="w-full py-3 bg-[#111111] text-white hover:bg-[#C9A961] hover:text-black text-[9px] font-bold uppercase tracking-widest transition-colors rounded-full"
              >
                Add 3 Items to Bag
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      <section className="bg-stone-50/50 border-t border-stone-100 py-20 mt-16 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[9px] font-bold tracking-[0.3em] text-[#C9A961] uppercase">Related Rituals</span>
            <h2 className="text-2xl font-light font-serif uppercase tracking-widest text-[#111111] mt-2">
              Complete Your Ceremony
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.slice(0, 4).filter(p => p.id !== product.id).map((prod) => (
              <Tilt key={prod.id}>
                <div className="group bg-white border border-stone-200/50 p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-md rounded-2xl h-full">
                  <div className="relative aspect-square overflow-hidden bg-stone-50 mb-4 rounded-xl border border-stone-100">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-semibold text-stone-900 tracking-wide line-clamp-1 mb-1">{prod.name}</h4>
                    <span className="text-xs font-bold text-[#C9A961]">{prod.price}</span>
                  </div>
                  <button 
                    onClick={() => router.push(`/product/${prod.id}`)}
                    className="w-full py-2.5 bg-black text-white hover:bg-[#C9A961] hover:text-black text-[9px] font-bold uppercase tracking-widest mt-4 transition-all rounded-full"
                  >
                    View Product
                  </button>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED PRODUCTS WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-100 select-none">
        <div className="mb-8">
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#C9A961] uppercase">Your History</span>
          <h3 className="text-lg font-light font-serif uppercase tracking-wider text-[#111111]">Recently Viewed</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {productList.slice(1, 3).map((prod) => (
            <div key={prod.id} className="flex gap-4 items-center p-3 border border-stone-150 bg-[#FAF8F5] rounded-2xl max-w-[280px]">
              <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded-xl border border-stone-200/40" />
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{prod.name}</h4>
                  <span className="text-xs font-bold text-black block mt-0.5">{prod.price}</span>
                </div>
                <Link href={`/product/${prod.id}`} className="text-[9px] font-bold uppercase tracking-wider text-[#C9A961] hover:text-black mt-2">
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-stone-200 py-3.5 px-4 flex sm:hidden items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-widest text-stone-400">Total Price</span>
          <span className="text-sm font-bold text-black">{currentDetail.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={currentDetail.stock === 0}
          className={`px-6 py-2.5 text-[9px] font-bold uppercase tracking-widest rounded-full ${
            currentDetail.stock > 0 ? "bg-[#C9A961] text-black" : "bg-stone-200 text-stone-450 cursor-not-allowed"
          }`}
        >
          Add To Bag
        </button>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xs cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          />
          <div className="relative max-w-2xl w-full aspect-square z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#C9A961] p-2.5 bg-black/50 rounded-full"
              aria-label="Close lookbook"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
