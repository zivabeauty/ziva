"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Magnetic from "./Magnetic";
import type { OrderRecord, WishlistItem } from "@/lib/cart-types";
import { parsePrice, PROMO_CODES } from "@/lib/pricing";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useUiStore } from "@/store/ui.store";
import { checkoutService } from "@/features/checkout/services/checkout.service";
import { useTrackOrderMutation } from "@/features/orders/hooks/useTrackOrder";
import { ApiError } from "@/types/api";
import Image from "next/image";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isCartOpen = useUiStore((s) => s.drawers.cart);
  const openCart = useUiStore((s) => s.openDrawer);
  const closeCart = useUiStore((s) => s.closeDrawer);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    items: cartItems,
    count: cartCount,
    totals,
    promoCode: appliedPromoCode,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setPromoCode,
    clearPromoCode,
  } = useCart();
  const { items: wishlistItems, remove: removeWishlist } = useWishlist();
  const trackOrderMutation = useTrackOrderMutation();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Live Order Tracking Logic
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackOrderIdInput, setTrackOrderIdInput] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<Partial<OrderRecord> | null>(null);
  const [trackError, setTrackError] = useState("");
  const isTrackLoading = trackOrderMutation.isPending;

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderIdInput.trim()) return;

    setTrackError("");
    setTrackedOrder(null);

    const cleanId = trackOrderIdInput.trim().replace("#", "").replace("ZIVA-", "");

    try {
      const data = await trackOrderMutation.mutateAsync(cleanId);
      setTrackedOrder(data);
    } catch (err) {
      const status = err instanceof ApiError ? err.status : undefined;
      if (status === 404) {
        setTrackError("Order ID not found. Please check and try again.");
      } else {
        setTrackError("Unable to retrieve order details. Please try again later.");
      }
    }
  };

  // Promo Code
  const [promoCode, setPromoCodeInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const [visible, setVisible] = useState(true);

  // Razorpay Integration States
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState<{ paymentId: string; orderId: string; amount: number; pending?: boolean } | null>(null);

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping">("cart");
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const onProceedClick = () => {
    setCheckoutError("");
    if (checkoutStep === "cart") {
      setCheckoutStep("shipping");
    } else {
      if (!shippingDetails.name || !shippingDetails.email || !shippingDetails.phone ||
          !shippingDetails.address || !shippingDetails.city || !shippingDetails.state || !shippingDetails.pincode) {
        setCheckoutError("Please fill in all shipping details before proceeding.");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(shippingDetails.email)) {
        setCheckoutError("Please enter a valid email address.");
        return;
      }
      handleCheckout();
    }
  };

  
  const recordOrder = async (payment: {
    razorpay_order_id: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  }) => {
    return checkoutService.recordOrder({
      payment,
      shipping: shippingDetails,
      items: cartItems.map((i) => ({ id: i.id, size: i.size, quantity: i.quantity })),
      promoCode: appliedPromoCode,
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      // The server recomputes the amount from item ids + quantities.
      const order = await checkoutService.createPaymentOrder(
        cartItems.map((i) => ({ id: i.id, size: i.size, quantity: i.quantity })),
        appliedPromoCode
      );

      // Demo mode (no live Razorpay keys): record the order as pending
      // so the full flow can be exercised without a real payment.
      if (order.mock) {
        const saved = await recordOrder({ razorpay_order_id: order.id });
        setCheckoutSuccess({ paymentId: "—", orderId: saved.orderId, amount: saved.amount, pending: true });
        clearCart();
        closeCart("cart");
        setCheckoutStep("cart");
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay failed to load. Please check your internet connection.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "ZIVA",
        description: "Luxury Skincare & Makeup",
        image: "/Logo.png",
        order_id: order.id,
        handler: async function (paymentResult: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const saved = await recordOrder(paymentResult);
            setCheckoutSuccess({
              paymentId: paymentResult.razorpay_payment_id,
              orderId: saved.orderId,
              amount: saved.amount,
            });
            clearCart();
            closeCart("cart");
            setCheckoutStep("cart");
          } catch (err) {
            console.error("Order recording failed:", err);
            setCheckoutError(
              `Payment succeeded (id ${paymentResult.razorpay_payment_id}) but the order could not be saved. Please contact support.`
            );
          } finally {
            setIsCheckingOut(false);
          }
        },
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#C9A961",
        },
        modal: {
          ondismiss: function() {
            setIsCheckingOut(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      return;
    } catch (err) {
      console.error(err);
      setCheckoutError(err instanceof Error ? err.message : "An error occurred during checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Scroll detection for transparent -> glass transition & hide/show behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync scroll lock
  useEffect(() => {
    if (isSearchOpen || isCartOpen || isWishlistOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen, isCartOpen, isWishlistOpen, isMobileMenuOpen]);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoError("");
      setPromoCodeInput("");
    } else {
      setPromoError("That promo code isn't valid.");
    }
  };

  const moveToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      size: "Standard",
      price: parsePrice(item.price),
      quantity: 1,
      image: item.image,
    });
    removeWishlist(item.id);
    openCart("cart");
  };

  const { subtotal, discountPercent, discount, total } = totals;
  const appliedPromo = appliedPromoCode ? `${appliedPromoCode} · ${discountPercent}% OFF` : "";

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const offersList = [
    "✨ Free Shipping on All Orders • Limited Time Offer ✨",
    "🌿 Flat 15% Off on First Order • Use Code: ZIVA15 🌿",
    "🛡️ Dermatologist Approved Active Gold Formulas 🛡️"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offersList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Skin Care", href: "/skincare" },
    { name: "Hair Care", href: "/hair-care" },
    { name: "Makeup", href: "/makeup" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      {/* 1. Global Announcement Bar (centered, arrow-cycled) */}
      <div className="w-full candy-gradient-bg text-white select-none relative z-50 h-[38px] flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-center gap-3 px-4 h-full">
          <button
            onClick={() => setCurrentOfferIndex((p) => (p - 1 + offersList.length) % offersList.length)}
            aria-label="Previous offer"
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="relative flex-1 h-4 flex items-center justify-center overflow-hidden">
            {offersList.map((offer, i) => (
              <span
                key={i}
                className={`absolute text-center text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-500 ease-in-out ${
                  i === currentOfferIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
              >
                {offer}
              </span>
            ))}
          </div>
          <button
            onClick={() => setCurrentOfferIndex((p) => (p + 1) % offersList.length)}
            aria-label="Next offer"
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Sticky single-row Navbar — logo left · centered links · icons right */}
      <header className={`fixed z-40 w-full transition-all duration-300 ease-in-out bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] border-b border-stone-100 ${
        scrolled ? "top-0" : "top-[38px]"
      } ${
        visible ? "translate-y-0" : "-translate-y-[100%]"
      }`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">

          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 text-ink hover:text-gold-deep transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center select-none">
              <Image
                src="/ziva_beauty_logo.png"
                alt="ZIVA"
                width={186}
                height={120}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Category nav (desktop) — absolutely centered */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-[13px] font-bold uppercase tracking-[0.12em] text-ink hover:text-gold-deep transition-colors"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-gold-deep transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: Icons — Search, Track, Wishlist, Cart */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-ink hover:text-gold-deep transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="hidden sm:inline-flex p-2 text-ink hover:text-gold-deep transition-colors cursor-pointer"
              title="Track your order"
              aria-label="Track order"
            >
              <Truck className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 relative text-ink hover:text-gold-deep transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-deep text-[8px] font-bold text-white border border-white">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => openCart("cart")}
              className="p-2 relative text-ink hover:text-gold-deep transition-colors cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[8px] font-bold text-white border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Modals & Drawers */}
      <AnimatePresence>
        {/* 3. Live Search Fullscreen Popup */}
        {isSearchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-45 bg-[#0D0D0D] backdrop-blur-xs"
            />
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="fixed inset-x-0 top-0 z-50 bg-white border-b border-stone-200"
            >
              <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[10px] uppercase tracking-[0.25em] font-medium text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
                    Luxury Concierge Search
                  </h2>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-stone-400 hover:text-black transition-colors p-1"
                    aria-label="Close Search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="relative flex items-center border-b border-stone-300 py-3 focus-within:border-[#C9A961] transition-all">
                  <input 
                    type="text" 
                    placeholder="Discover skincare, makeup or rituals..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-lg md:text-xl font-light tracking-wide placeholder-stone-300 focus:outline-none text-black bg-transparent"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="mr-3 text-[10px] uppercase tracking-widest text-stone-400 hover:text-black">
                      Clear
                    </button>
                  )}
                  <Search className="w-5 h-5 text-stone-400" />
                </div>

                {/* Popular searches suggestions */}
                <div className="mt-8">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 mb-4 font-semibold">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Botanical Elixir", "Setting Powder", "Jasmine Oud Fragrance", "Lipstick Set", "Caviar Hair Masque", "Acne Treatment"].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 text-[10px] bg-stone-50 border border-stone-150 text-stone-750 hover:border-[#C9A961] hover:bg-black hover:text-white transition-all duration-300 rounded-none cursor-pointer font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* 4. Cart Drawer */}
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => closeCart("cart")}
              className="fixed inset-0 z-45 bg-[#0D0D0D] backdrop-blur-xs"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col border-l border-stone-200/50"
            >
              <div className="px-6 py-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-light text-sm uppercase tracking-[0.2em] text-[#0D0D0D]">Shopping Bag</span>
                  <span className="text-[11px] text-stone-400">({cartCount})</span>
                </div>
                <button onClick={() => closeCart("cart")} className="text-stone-400 hover:text-black p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-6 divide-y divide-stone-100">
                {checkoutStep === "shipping" ? (
                  <div className="py-4 flex flex-col gap-4 text-black">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A961]">Shipping Information</h3>
                      <button onClick={() => setCheckoutStep("cart")} className="text-[9px] uppercase tracking-widest text-stone-400 hover:text-black">
                        Back to Bag
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingDetails.name}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={shippingDetails.email}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={shippingDetails.phone}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                            placeholder="+91 99999 99999"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">Delivery Address</label>
                        <input
                          type="text"
                          required
                          value={shippingDetails.address}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                          placeholder="Flat, House no., Apartment, Street"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={shippingDetails.city}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                            className="w-full px-2 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                            placeholder="Mumbai"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={shippingDetails.state}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                            className="w-full px-2 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                            placeholder="Maharashtra"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-1">Pincode</label>
                          <input
                            type="text"
                            required
                            value={shippingDetails.pincode}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                            className="w-full px-2 py-2 text-xs border border-stone-200 focus:outline-none focus:border-[#C9A961] bg-stone-50/50 text-black font-medium"
                            placeholder="400001"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="py-5 flex gap-4">
                        <div className="h-24 w-20 flex-shrink-0 overflow-hidden border border-stone-100 bg-stone-50 relative">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-[11px] font-medium text-black">
                              <h3 className="line-clamp-2 pr-2 text-stone-900 tracking-wide">{item.name}</h3>
                              <p className="ml-2">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                            <p className="mt-1 text-[9px] text-stone-400 font-medium uppercase tracking-widest">Size: {item.size}</p>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs mt-3">
                            <div className="flex items-center border border-stone-200 bg-stone-50/50">
                              <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-2 py-0.5 text-stone-500 hover:text-black">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-0.5 font-medium text-black text-[10px]">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-2 py-0.5 text-stone-500 hover:text-black">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeItem(item.id, item.size)} className="text-stone-300 hover:text-[#C9A961] p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center px-4">
                      <ShoppingBag className="w-8 h-8 text-stone-200 mb-4" />
                      <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Your Bag is empty</h3>
                      <p className="text-[10px] text-stone-400 max-w-[240px] leading-relaxed mb-6">Explore Ziva formulations and add timeless elegance to your daily rituals.</p>
                    </div>
                  )
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-stone-100 py-6 px-6 bg-stone-50/50">
                  <form onSubmit={applyPromo} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PROMO CODE"
                        value={promoCode}
                        onChange={(e) => { setPromoCodeInput(e.target.value); setPromoError(""); }}
                        className="flex-1 px-3 py-2 text-[10px] border border-stone-300 uppercase tracking-widest focus:outline-none focus:border-[#C9A961] bg-white text-black font-medium"
                      />
                      <button type="submit" className="px-4 py-2 bg-[#0D0D0D] text-white hover:bg-[#C9A961] hover:text-black text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="mt-2 text-[10px] text-red-500 font-medium">{promoError}</p>
                    )}
                    {appliedPromoCode && (
                      <p className="mt-2 text-[10px] text-[#C9A961] font-semibold flex items-center gap-2">
                        {appliedPromo} applied
                        <button
                          type="button"
                          onClick={() => clearPromoCode()}
                          className="text-stone-400 hover:text-black underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </p>
                    )}
                  </form>

                  <div className="flex flex-col gap-2 text-[11px] text-stone-600 mb-5">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#C9A961] font-medium">
                        <span>Discount ({appliedPromo})</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="border-t border-stone-200 pt-3.5 mt-2 flex justify-between text-xs font-semibold text-black">
                      <span className="uppercase tracking-widest">Total</span>
                      <span className="text-[#C9A961]">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] font-medium leading-relaxed rounded">
                      {checkoutError}
                    </div>
                  )}

                  <Magnetic>
                    <button
                      onClick={onProceedClick}
                      disabled={isCheckingOut}
                      className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-[#A8841B] via-[#F5E396] to-[#C9A961] text-black hover:bg-black hover:text-white transition-all shadow-[0_4px_20px_rgba(201,162,39,0.15)] hover:shadow-lg duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        checkoutStep === "cart" ? "Proceed To Checkout" : "Pay with Razorpay"
                      )}
                    </button>
                  </Magnetic>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* 5. Wishlist Drawer */}
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-45 bg-[#0D0D0D] backdrop-blur-xs"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col border-l border-stone-200/50"
            >
              <div className="px-6 py-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-light text-sm uppercase tracking-[0.2em] text-[#0D0D0D]">Wishlist</span>
                  <span className="text-[11px] text-stone-400">({wishlistItems.length})</span>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="text-stone-400 hover:text-black p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-6 divide-y divide-stone-100">
                {wishlistItems.length > 0 ? (
                  wishlistItems.map((item) => (
                    <div key={item.id} className="py-5 flex gap-4">
                      <div className="h-20 w-16 flex-shrink-0 overflow-hidden border border-stone-100 bg-stone-50 relative">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-[11px] font-medium text-black">
                            <h3 className="line-clamp-2 pr-2 text-stone-900 tracking-wide">{item.name}</h3>
                            <p className="ml-2 font-medium">{item.price}</p>
                          </div>
                          <p className="mt-1 text-[9px] text-[#C9A961] font-semibold uppercase tracking-widest">{item.category}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mt-2">
                          <button 
                            onClick={() => moveToCart(item)}
                            className="text-[10px] uppercase font-bold tracking-widest text-[#0D0D0D] hover:text-[#C9A961] transition-colors flex items-center gap-1.5"
                          >
                            Add to Bag
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => removeWishlist(item.id)}
                            className="text-stone-300 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center px-4">
                    <Heart className="w-10 h-10 text-stone-200 mb-4 stroke-[1.2]" />
                    <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Wishlist is empty</h3>
                    <p className="text-[10px] text-stone-400 max-w-[240px] leading-relaxed mb-6">Select your favorite products and store them in your private vanity wishlist.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}

        {/* 6. Mobile Side Menu */}
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-45 bg-[#0D0D0D] backdrop-blur-xs"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-[280px] bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-1">
                  <span className="text-xl font-extrabold tracking-[0.2em] font-serif text-ink">ZIVA</span>
                  <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#C9A961]"></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-stone-400 hover:text-black p-1">
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col gap-6">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[11px] font-bold tracking-widest text-ink hover:text-lavender transition-colors uppercase block py-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 7. Checkout Success Modal */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutSuccess(null)}
              className="fixed inset-0 bg-[#0D0D0D]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100 flex flex-col items-center text-center z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#C9A961]/10 flex items-center justify-center text-[#C9A961] mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">
                {checkoutSuccess.pending ? "Order Placed" : "Order Confirmed"}
              </h3>
              <p className="text-stone-500 text-xs font-light mb-6">
                {checkoutSuccess.pending
                  ? "Your order was recorded in demo mode — payment is marked as pending."
                  : "Thank you for your order! Your payment was processed successfully."}
              </p>
              <div className="w-full bg-[#FAF8F5] border border-stone-100 rounded-2xl p-4 flex flex-col gap-2.5 text-left text-xs mb-6 text-stone-600">
                <div className="flex justify-between">
                  <span className="font-light">Payment ID</span>
                  <span className="font-mono text-[10px] text-black select-all">{checkoutSuccess.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-light">Order ID</span>
                  <span className="font-mono text-[10px] text-black select-all">{checkoutSuccess.orderId}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200/50 pt-2.5 mt-1 font-semibold text-black">
                  <span>Amount Paid</span>
                  <span className="text-[#C9A961]">₹{checkoutSuccess.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button 
                onClick={() => setCheckoutSuccess(null)}
                className="w-full py-3.5 bg-[#0D0D0D] hover:bg-[#C9A961] text-white hover:text-black text-xs font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. Live Order Tracking Modal */}
      <AnimatePresence>
        {isTrackOrderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrackOrderOpen(false)}
              className="fixed inset-0 bg-[#0D0D0D] backdrop-blur-xs"
            />
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-stone-100 flex flex-col z-10 font-sans text-ink"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsTrackOrderOpen(false)} 
                className="absolute top-4 right-4 text-stone-400 hover:text-black p-1 bg-stone-50 hover:bg-stone-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-lavender-soft text-lavender flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-ink">Track Order</h3>
                  <p className="text-[10px] text-stone-450 font-bold uppercase tracking-wider">Live Supabase Tracking</p>
                </div>
              </div>

              <p className="text-xs text-stone-500 font-medium leading-relaxed mb-6">
                Enter your Order ID (e.g. `24c5...` from checkout details) below to look up real-time delivery status.
              </p>

              {/* Form Input */}
              <form onSubmit={handleTrackOrder} className="flex flex-col gap-3.5 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter Order ID (e.g. 5d83b0f5...)"
                    value={trackOrderIdInput}
                    onChange={(e) => setTrackOrderIdInput(e.target.value)}
                    className="w-full px-4.5 py-3 text-xs bg-stone-50 border border-stone-200 focus:outline-none focus:border-lavender text-ink font-mono font-bold rounded-2xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTrackLoading}
                  className="w-full py-3.5 bg-ink hover:bg-lavender text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isTrackLoading ? "Searching Order..." : "Search Order"}
                </button>
              </form>

              {/* Error State */}
              {trackError && (
                <div className="p-4 bg-coral-soft text-[#a33737] text-xs font-bold rounded-2xl border border-coral/30 text-center animate-shake">
                  {trackError}
                </div>
              )}

              {/* Track Details State */}
              {trackedOrder && (
                <div className="flex flex-col gap-4 border-t border-stone-100 pt-5 mt-2 text-xs text-left">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-stone-400 font-bold uppercase">Order Reference</span>
                    <span className="font-mono text-[11px] text-black bg-stone-50 p-2 rounded-xl border border-stone-100/50 select-all font-bold">
                      #ZIVA-{trackedOrder.order_id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">Order Date</span>
                      <span className="font-bold text-ink">
                        {new Date(trackedOrder.time_stamp ?? Date.now()).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">Total Amount</span>
                      <span className="font-extrabold text-ink">
                        ₹{(Number(trackedOrder.total_amount) || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Visual Stepper */}
                  <div className="mt-4 flex flex-col gap-6 pl-5 relative border-l-2 border-stone-100/80">
                    
                    {/* Step 1: Placed */}
                    <div className="relative flex gap-3">
                      <span className="absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full bg-mint shadow-[0_0_8px_rgba(30,170,120,0.5)] border-2 border-white flex items-center justify-center"></span>
                      <div className="flex flex-col">
                        <span className="font-bold text-ink">Order Placed</span>
                        <span className="text-[10px] text-stone-450 font-bold">Confirmed by checkout desk</span>
                      </div>
                    </div>

                    {/* Step 2: Confirmed/Paid */}
                    <div className="relative flex gap-3">
                      <span className={`absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                        ["paid", "dispatched", "delivered"].includes(String(trackedOrder.payment_status).toLowerCase())
                          ? "bg-mint shadow-[0_0_8px_rgba(30,170,120,0.5)]"
                          : "bg-stone-200"
                      }`}></span>
                      <div className="flex flex-col">
                        <span className={`font-bold ${
                          ["paid", "dispatched", "delivered"].includes(String(trackedOrder.payment_status).toLowerCase()) ? "text-ink" : "text-stone-400"
                        }`}>Confirmed</span>
                        <span className="text-[10px] text-stone-450 font-bold">Payment captured successfully</span>
                      </div>
                    </div>

                    {/* Step 3: Dispatched */}
                    <div className="relative flex gap-3">
                      <span className={`absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                        ["dispatched", "delivered"].includes(String(trackedOrder.payment_status).toLowerCase())
                          ? "bg-mint shadow-[0_0_8px_rgba(30,170,120,0.5)]"
                          : "bg-stone-200"
                      }`}></span>
                      <div className="flex flex-col">
                        <span className={`font-bold ${
                          ["dispatched", "delivered"].includes(String(trackedOrder.payment_status).toLowerCase()) ? "text-ink" : "text-stone-400"
                        }`}>Dispatched / Shipped</span>
                        <span className="text-[10px] text-stone-450 font-bold">
                          {trackedOrder.tracking_id 
                            ? `Tracking Code: ${trackedOrder.tracking_id}`
                            : "Awaiting courier pickup details"}
                        </span>
                      </div>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative flex gap-3">
                      <span className={`absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                        String(trackedOrder.payment_status).toLowerCase() === "delivered"
                          ? "bg-mint shadow-[0_0_8px_rgba(30,170,120,0.5)]"
                          : "bg-stone-200"
                      }`}></span>
                      <div className="flex flex-col">
                        <span className={`font-bold ${
                          String(trackedOrder.payment_status).toLowerCase() === "delivered" ? "text-ink" : "text-stone-400"
                        }`}>Delivered</span>
                        <span className="text-[10px] text-stone-450 font-bold">Handed over to customer</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
