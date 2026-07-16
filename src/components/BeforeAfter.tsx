"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  beforeImage = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop", // skin treatment/texture focus
  afterImage = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",   // glowing results focus
  beforeLabel = "Before Ziva Ritual",
  afterLabel = "After 14 Days"
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full max-w-3xl aspect-[16/10] overflow-hidden select-none border border-stone-200 shadow-xl cursor-ew-resize"
    >
      {/* After Image (Full Background) */}
      <img 
        src={afterImage} 
        alt="After Ziva Treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute bottom-4 right-4 z-10 glass-panel px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-[#0D0D0D] flex items-center gap-1.5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
        {afterLabel}
      </div>

      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Ziva Treatment" 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
        />
        <div className="absolute bottom-4 left-4 z-10 glass-panel px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-stone-500 shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line Separator */}
      <div 
        className="absolute top-0 bottom-0 w-[1.5px] bg-[#C9A961] z-20 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Slider Handle (Glassmorphism circle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-[#C9A961] shadow-lg flex items-center justify-center pointer-events-none">
          <div className="flex gap-[3px] text-[#C9A961] font-semibold text-xs select-none">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
