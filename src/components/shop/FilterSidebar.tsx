"use client";

import { Check, Star, X } from "lucide-react";
import { formatInr } from "@/lib/pricing";
import type { Facets, ProductFilters } from "@/lib/product-utils";

interface FilterSidebarProps {
  facets: Facets;
  filters: ProductFilters;
  onChange: (patch: Partial<ProductFilters>) => void;
  onClear: () => void;
  activeCount: number;
}

/* ─── Small building blocks ─── */

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-stone-100 py-6">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="group flex w-full items-center gap-2.5 py-1.5 text-left"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          checked ? "border-ink bg-ink text-cream" : "border-stone-300 group-hover:border-ink"
        }`}
      >
        {checked && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      </span>
      <span
        className={`text-xs transition-colors ${
          checked ? "font-semibold text-ink" : "text-stone-600 group-hover:text-ink"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Dual price range slider ─── */

function PriceRange({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const span = Math.max(1, max - min);
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;

  const thumb =
    "pointer-events-none absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent " +
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 " +
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink " +
    "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer " +
    "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 " +
    "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-ink " +
    "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer";

  return (
    <div>
      <div className="relative mb-5 h-4">
        <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-stone-200" />
        <span
          className="gold-gradient-bg absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={lo}
          aria-label="Minimum price"
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - 50), hi])}
          className={thumb}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={hi}
          aria-label="Maximum price"
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + 50)])}
          className={thumb}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-ink">
        <span className="rounded-full bg-stone-100 px-3 py-1">{formatInr(lo)}</span>
        <span className="text-stone-300">—</span>
        <span className="rounded-full bg-stone-100 px-3 py-1">{formatInr(hi)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */

export default function FilterSidebar({
  facets,
  filters,
  onChange,
  onClear,
  activeCount,
}: FilterSidebarProps) {
  const toggleIn = (key: "categories" | "types" | "skinTypes", value: string) => {
    const list = filters[key];
    onChange({
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    } as Partial<ProductFilters>);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-ink">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-deep transition-colors hover:text-ink"
          >
            Clear <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {facets.categories.length > 1 && (
        <Group title="Category">
          <div className="flex flex-col gap-0.5">
            {facets.categories.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={filters.categories.includes(c)}
                onToggle={() => toggleIn("categories", c)}
              />
            ))}
          </div>
        </Group>
      )}

      <Group title="Price Range">
        <PriceRange
          min={facets.priceMin}
          max={facets.priceMax}
          value={filters.priceRange}
          onChange={(v) => onChange({ priceRange: v })}
        />
      </Group>

      {facets.types.length > 1 && (
        <Group title="Product Type">
          <div className="flex max-h-52 flex-col gap-0.5 overflow-y-auto pr-1">
            {facets.types.map((t) => (
              <CheckRow
                key={t}
                label={t}
                checked={filters.types.includes(t)}
                onToggle={() => toggleIn("types", t)}
              />
            ))}
          </div>
        </Group>
      )}

      {facets.skinTypes.length > 0 && (
        <Group title="Skin Type">
          <div className="flex flex-col gap-0.5">
            {facets.skinTypes.map((s) => (
              <CheckRow
                key={s}
                label={s}
                checked={filters.skinTypes.includes(s)}
                onToggle={() => toggleIn("skinTypes", s)}
              />
            ))}
          </div>
        </Group>
      )}

      <Group title="Rating">
        <div className="flex flex-col gap-1">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ minRating: filters.minRating === r ? 0 : r })}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                filters.minRating === r ? "bg-porcelain" : "hover:bg-stone-50"
              }`}
            >
              <span className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < r ? "fill-gold text-gold" : "fill-stone-200 text-stone-200"}`}
                  />
                ))}
              </span>
              <span className="text-[11px] font-medium text-stone-500">&amp; up</span>
            </button>
          ))}
        </div>
      </Group>

      <Group title="Availability">
        <div className="flex flex-col gap-0.5">
          {[
            { label: "In Stock", val: "in" },
            { label: "Out of Stock", val: "out" },
          ].map((o) => (
            <CheckRow
              key={o.val}
              label={o.label}
              checked={filters.availability === o.val}
              onToggle={() =>
                onChange({
                  availability:
                    filters.availability === (o.val as "in" | "out") ? "all" : (o.val as "in" | "out"),
                })
              }
            />
          ))}
        </div>
      </Group>
    </div>
  );
}
