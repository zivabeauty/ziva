"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  Truck,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  Search,
  LogOut,
  Lock,
  Package,
  X,
  RefreshCw,
  Eye,
  LayoutDashboard,
  ExternalLink,
  AlertTriangle,
  Check,
  Loader2,
  Printer,
} from "lucide-react";
import { products as staticProducts, type Product } from "@/data/beautyData";
import type { OrderRecord } from "@/lib/cart-types";
import { useAdminSession, useAdminLogin, useAdminLogout } from "@/features/auth/hooks/useAdminAuth";
import { ApiError } from "@/types/api";

/* ────────────────────────────────────────────── */
/*  Small UI primitives                           */
/* ────────────────────────────────────────────── */

type ToastKind = "success" | "error";
interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dispatched: "bg-sky-50 text-sky-700 border-sky-200",
  paid: "bg-indigo-50 text-indigo-700 border-indigo-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const inr = (n: number | string) =>
  `₹${(parseFloat(String(n)) || 0).toLocaleString("en-IN")}`;

function parseOrderItems(raw: string | undefined) {
  try {
    const items = JSON.parse(raw || "[]");
    return Array.isArray(items) ? items : [{ name: raw, qty: 1 }];
  } catch {
    return [{ name: raw || "Product", qty: 1 }];
  }
}

/** Escape user-supplied strings before injecting them into the receipt HTML. */
function escapeHtml(value: unknown) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

/** Builds a self-contained, print-optimised receipt document for one order. */
function buildReceiptHtml(order: OrderRecord) {
  const items = parseOrderItems(order.products);
  const date = order.time_stamp
    ? new Date(order.time_stamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "—";

  let subtotal = 0;
  const rows = items
    .map((it: { name?: string; qty?: number; size?: string; price?: number }) => {
      const qty = Number(it.qty) || 1;
      const unit = parseFloat(String(it.price)) || 0;
      const line = unit * qty;
      subtotal += line;
      return `<tr>
        <td class="it">${escapeHtml(it.name || "Item")}${
          it.size ? `<span class="sz">${escapeHtml(it.size)}</span>` : ""
        }</td>
        <td class="qty">${qty}</td>
        <td class="amt">${unit ? inr(line) : "—"}</td>
      </tr>`;
    })
    .join("");

  const total = parseFloat(String(order.total_amount)) || subtotal;
  const address = [order.address, order.city, order.state].filter(Boolean).join(", ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Ziva Receipt · ${escapeHtml(order.order_id)}</title>
<style>
  * { box-sizing: border-box; }
  @page { size: auto; margin: 12mm; }
  body { margin: 0; font-family: "Helvetica Neue", Arial, sans-serif; color: #2a211d; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .receipt { width: 360px; max-width: 100%; margin: 0 auto; padding: 8px; }
  .brand { text-align: center; padding-bottom: 14px; border-bottom: 2px solid #3D2412; }
  .brand h1 { margin: 0; font-size: 26px; letter-spacing: 6px; color: #3D2412; font-weight: 800; }
  .brand p { margin: 4px 0 0; font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase; color: #79443B; }
  .brand .gstin { margin-top: 8px; font-size: 10px; letter-spacing: 1px; text-transform: none; color: #2a211d; font-weight: 600; }
  .tag { text-align: center; margin: 12px 0 16px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #79443B; font-weight: 700; }
  .meta { font-size: 11px; line-height: 1.7; }
  .meta .row { display: flex; justify-content: space-between; gap: 12px; }
  .meta .k { color: #8a7f78; }
  .meta .v { color: #2a211d; font-weight: 600; text-align: right; word-break: break-word; }
  .sec { margin-top: 14px; font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #a39a93; font-weight: 700; border-bottom: 1px dashed #d8cfc8; padding-bottom: 4px; margin-bottom: 6px; }
  .bill { font-size: 11px; line-height: 1.6; }
  .bill .name { font-weight: 700; color: #2a211d; }
  table { width: 100%; border-collapse: collapse; margin-top: 4px; }
  th { text-align: left; font-size: 8px; letter-spacing: 1px; text-transform: uppercase; color: #a39a93; padding: 4px 0; border-bottom: 1px solid #e5ded8; }
  th.qty, th.amt, td.qty, td.amt { text-align: right; }
  td { font-size: 11px; padding: 7px 0; border-bottom: 1px dashed #e9e2dc; vertical-align: top; }
  td.it { padding-right: 8px; }
  td .sz { display: block; font-size: 9px; color: #8a7f78; margin-top: 2px; }
  td.qty { white-space: nowrap; color: #6b625c; }
  td.amt { white-space: nowrap; font-weight: 600; }
  .totals { margin-top: 10px; font-size: 11px; }
  .totals .row { display: flex; justify-content: space-between; padding: 3px 0; color: #6b625c; }
  .totals .grand { margin-top: 6px; padding-top: 8px; border-top: 2px solid #3D2412; font-size: 14px; font-weight: 800; color: #3D2412; }
  .foot { text-align: center; margin-top: 20px; padding-top: 12px; border-top: 1px dashed #d8cfc8; font-size: 10px; color: #8a7f78; line-height: 1.6; }
  .foot strong { color: #79443B; letter-spacing: 1px; }
  @media print { body { padding: 0; } .noprint { display: none !important; } }
  .noprint { text-align: center; margin: 18px 0 4px; }
  .noprint button { font: inherit; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 10px 22px; background: #3D2412; color: #fff; border: 0; border-radius: 999px; cursor: pointer; }
</style>
</head>
<body>
  <div class="receipt">
    <div class="brand">
      <h1>ZivaBeauty</h1>
      <p>Luxury Beauty · Skincare · Makeup</p>
      <p class="gstin">GSTIN: 07ABXPW9068N2Z4</p>
    </div>
    <div class="tag">Payment Receipt</div>

    <div class="meta">
      <div class="row"><span class="k">Order ID</span><span class="v">${escapeHtml(order.order_id)}</span></div>
      <div class="row"><span class="k">Date</span><span class="v">${escapeHtml(date)}</span></div>
      <div class="row"><span class="k">Status</span><span class="v">${escapeHtml((order.payment_status || "pending").toUpperCase())}</span></div>
      <div class="row"><span class="k">Method</span><span class="v">${escapeHtml(order.payment_method || "Online")}</span></div>
      ${order.tracking_id ? `<div class="row"><span class="k">Tracking</span><span class="v">${escapeHtml(order.tracking_id)}</span></div>` : ""}
    </div>

    <div class="sec">Billed To</div>
    <div class="bill">
      <div class="name">${escapeHtml(order.name || "—")}</div>
      ${order.phone ? `<div>${escapeHtml(order.phone)}</div>` : ""}
      ${order.email ? `<div>${escapeHtml(order.email)}</div>` : ""}
      ${address ? `<div>${escapeHtml(address)}${order.pincode ? " — " + escapeHtml(order.pincode) : ""}</div>` : ""}
    </div>

    <div class="sec">Items</div>
    <table>
      <thead><tr><th class="it">Item</th><th class="qty">Qty</th><th class="amt">Amount</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="totals">
      ${subtotal ? `<div class="row"><span>Subtotal</span><span>${inr(subtotal)}</span></div>` : ""}
      <div class="row grand"><span>Total Paid</span><span>${inr(total)}</span></div>
    </div>

    <div class="foot">
      <strong>Thank you for shopping with Ziva.</strong><br/>
      For any queries, reply to your order confirmation email.
    </div>

    <div class="noprint">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>
  <script>
    window.onload = function () { setTimeout(function () { window.print(); }, 200); };
    window.onafterprint = function () { window.close(); };
  </script>
</body>
</html>`;
}

/** Opens the receipt in a new window and triggers the print dialog. */
function printReceipt(order: OrderRecord) {
  const w = window.open("", "_blank", "width=440,height=680");
  if (!w) return false;
  w.document.open();
  w.document.write(buildReceiptHtml(order));
  w.document.close();
  w.focus();
  return true;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/60 p-5 flex items-start justify-between shadow-[0_2px_12px_rgba(10,10,10,0.03)]">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-2">{label}</p>
        <p className="text-2xl font-serif text-ink leading-none">{value}</p>
      </div>
      <span className={`p-2.5 rounded-xl ${accent}`}>
        <Icon className="w-4 h-4" />
      </span>
    </div>
  );
}

function ModalShell({
  onClose,
  children,
  maxWidth = "max-w-xl",
}: {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative bg-white w-full ${maxWidth} rounded-2xl border border-stone-200/60 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-1.5 text-stone-400 hover:text-ink bg-stone-50 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>
        {children}
      </div>
    </div>
  );
}

/** Tracking-id cell with an explicit save action (replaces save-on-blur + alert). */
function TrackingCell({
  order,
  onSave,
}: {
  order: OrderRecord;
  onSave: (orderId: string, trackingId: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState(order.tracking_id || "");
  const [saving, setSaving] = useState(false);
  const dirty = value !== (order.tracking_id || "");

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        value={value}
        placeholder="AWB code"
        onChange={(e) => setValue(e.target.value)}
        className="px-2.5 py-1.5 text-[10px] font-mono border border-stone-200 rounded-lg w-28 bg-stone-50/60 focus:outline-none focus:border-[#C9A961] focus:bg-white transition-colors"
      />
      {dirty && (
        <button
          onClick={async () => {
            setSaving(true);
            await onSave(order.order_id, value.trim());
            setSaving(false);
          }}
          disabled={saving}
          title="Save tracking id"
          className="p-1.5 rounded-lg bg-ink text-white hover:bg-[#C9A961] hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
        </button>
      )}
    </div>
  );
}

/** Product image field: file upload to Supabase Storage with preview, plus manual URL entry. */
function ImageUploadField({
  label,
  value,
  required = false,
  onChange,
  onError,
}: {
  label: string;
  value: string;
  required?: boolean;
  onChange: (url: string) => void;
  onError: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {/* Preview */}
        <div className="w-14 h-14 shrink-0 rounded-xl border border-stone-200 bg-stone-50 overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Package className="w-5 h-5 text-stone-300" />
          )}
        </div>

        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-fit flex items-center gap-2 px-3.5 py-2 bg-ink hover:bg-[#C9A961] text-white hover:text-ink rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
            {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>
          <input
            type="text"
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className="w-full px-2.5 py-1.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-[#C9A961] text-stone-500"
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Admin page                                    */
/* ────────────────────────────────────────────── */

const EMPTY_FORM = {
  id: "",
  name: "",
  category: "Skincare",
  price: "",
  oldPrice: "",
  rating: 5,
  badge: "",
  image: "",
  hoverImage: "",
  description: "",
  sizes: "30 ml, 50 ml, 100 ml",
  ingredients: "",
  usage: "",
  gallery: [] as string[],
};

export default function AdminPage() {
  const { data: session, isLoading: authLoading } = useAdminSession();
  const loginMutation = useAdminLogin();
  const logoutMutation = useAdminLogout();
  const authChecked = !authLoading;
  const isAuthenticated = Boolean(session?.authenticated);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [usingFallbackCatalog, setUsingFallbackCatalog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState(EMPTY_FORM);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productFormError, setProductFormError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const pushToast = useCallback((kind: ToastKind, message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  // Depend on `.mutate` (stable across renders), never the mutation object
  // itself — its identity changes every render and would re-create every
  // callback below, re-firing the data-loading effect in an infinite loop.
  const logout = logoutMutation.mutate;
  const handleUnauthorized = useCallback(() => {
    logout();
    pushToast("error", "Your session expired. Please sign in again.");
  }, [logout, pushToast]);

  /* ── Data loading ── */
  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) return handleUnauthorized();
      if (!res.ok) throw new Error(await res.text());
      setOrders(await res.json());
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      pushToast("error", "Could not load orders.");
    } finally {
      setLoadingOrders(false);
    }
  }, [handleUnauthorized, pushToast]);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.status === 401) return handleUnauthorized();
      if (!res.ok) throw new Error(await res.text());
      const data: Product[] = await res.json();
      if (data.length > 0) {
        setProducts(data);
        setUsingFallbackCatalog(false);
      } else {
        setProducts(staticProducts);
        setUsingFallbackCatalog(true);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts(staticProducts);
      setUsingFallbackCatalog(true);
    } finally {
      setLoadingProducts(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    if (isAuthenticated) {
      // Data fetch on auth — loading flags set inside are intentional
      // external-system synchronization, not derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOrders();
      fetchProducts();
    }
  }, [isAuthenticated, fetchOrders, fetchProducts]);

  /* ── Auth actions ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await loginMutation.mutateAsync({ password });
      setPassword("");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Connection error. Please try again.";
      setLoginError(message);
    }
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync().catch(() => {});
  };

  /* ── Order actions ── */
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const previous = orders;
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, payment_status: newStatus as OrderRecord["payment_status"] } : o
      )
    );
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, payment_status: newStatus }),
      });
      if (res.status === 401) return handleUnauthorized();
      if (!res.ok) throw new Error(await res.text());
      pushToast("success", `Order marked as ${newStatus}.`);
      setSelectedOrder((prev) =>
        prev?.order_id === orderId
          ? { ...prev, payment_status: newStatus as OrderRecord["payment_status"] }
          : prev
      );
    } catch (err) {
      console.error("Status update failed:", err);
      setOrders(previous);
      pushToast("error", "Failed to update the order status.");
    }
  };

  const handleUpdateTracking = async (orderId: string, trackingId: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, tracking_id: trackingId }),
      });
      if (res.status === 401) {
        handleUnauthorized();
        return false;
      }
      if (!res.ok) throw new Error(await res.text());
      setOrders((prev) => prev.map((o) => (o.order_id === orderId ? { ...o, tracking_id: trackingId } : o)));
      pushToast("success", "Tracking id saved.");
      return true;
    } catch (err) {
      console.error("Tracking update failed:", err);
      pushToast("error", "Failed to save the tracking id.");
      return false;
    }
  };

  /* ── Product actions ── */
  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormError("");
    setProductForm({
      id: String(prod.id),
      name: prod.name,
      category: prod.category || "Skincare",
      price: prod.price,
      oldPrice: prod.oldPrice || "",
      rating: prod.rating || 5,
      badge: prod.badge || "",
      image: prod.image,
      hoverImage: prod.hoverImage || "",
      description: prod.description || "",
      sizes: Array.isArray(prod.sizes) ? prod.sizes.join(", ") : "50 ml",
      ingredients: prod.ingredients || "",
      usage: prod.usage || "",
      gallery: Array.isArray(prod.gallery) ? prod.gallery.filter(Boolean) : [],
    });
    setIsProductModalOpen(true);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductFormError("");
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProductForm({ ...EMPTY_FORM, id: String(nextId), price: "₹999" });
    setIsProductModalOpen(true);
  };

  /** Set one gallery slot by index (keeps the array length stable for the UI). */
  const setGalleryImage = (index: number, url: string) => {
    setProductForm((f) => {
      const gallery = [...f.gallery];
      gallery[index] = url;
      return { ...f, gallery };
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    setProductFormError("");
    const payload = {
      ...productForm,
      id: parseInt(productForm.id),
      rating: Number(productForm.rating),
      sizes: productForm.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: productForm.gallery.filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: editingProduct ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) return handleUnauthorized();
      const data = await res.json();
      if (!res.ok) {
        setProductFormError(
          typeof data.error === "string" && data.error.length < 200
            ? data.error
            : "Save failed — make sure the Supabase 'product' table exists and the service key is configured."
        );
        return;
      }
      pushToast("success", editingProduct ? "Product updated." : "Product created.");
      setIsProductModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Save product failed:", err);
      setProductFormError("Connection error while saving. Please try again.");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?id=${deleteTarget.id}`, { method: "DELETE" });
      if (res.status === 401) return handleUnauthorized();
      if (!res.ok) throw new Error(await res.text());
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      pushToast("success", `"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed:", err);
      pushToast("error", "Failed to delete the product.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSeedCatalog = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      if (res.status === 401) return handleUnauthorized();
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Seed failed.");
      pushToast("success", `Seeded ${data.count} products into Supabase.`);
      fetchProducts();
    } catch (err) {
      console.error("Seed failed:", err);
      pushToast("error", err instanceof Error ? err.message : "Seed failed.");
    } finally {
      setSeeding(false);
    }
  };

  /* ── Derived data ── */
  const activeOrders = orders.filter((o) => o.payment_status?.toLowerCase() !== "cancelled");
  const totalRevenue = activeOrders.reduce((acc, o) => acc + (parseFloat(String(o.total_amount)) || 0), 0);
  const countBy = (status: string) =>
    orders.filter((o) => o.payment_status?.toLowerCase() === status).length;

  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    const matchesSearch =
      o.order_id?.toLowerCase().includes(q) ||
      o.name?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q);
    const matchesStatus = statusFilter
      ? o.payment_status?.toLowerCase() === statusFilter.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  /* ────────────────────────────────────────── */
  /*  Render                                    */
  /* ────────────────────────────────────────── */

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#C9A961] animate-spin" />
      </div>
    );
  }

  /* ── Login gate ── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm">
          <div className="bg-white border border-stone-200/60 rounded-3xl p-10 shadow-[0_20px_60px_rgba(10,10,10,0.08)] flex flex-col items-center">
            <span className="w-12 h-12 rounded-2xl bg-ink text-[#C9A961] flex items-center justify-center mb-5">
              <Lock className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-serif tracking-[0.2em] text-ink uppercase">Ziva</h1>
            <p className="text-[10px] tracking-[0.25em] text-[#C9A961] uppercase font-bold mt-1 mb-8">
              Admin Console
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div>
                <label htmlFor="admin-password" className="block text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-3.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] focus:bg-white tracking-widest text-center transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-[11px] text-center font-medium">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3.5 bg-ink hover:bg-[#C9A961] text-white hover:text-ink text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl transition-colors duration-300 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loginMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Sign In
              </button>
            </form>
          </div>
          <p className="text-center text-[10px] text-stone-400 mt-6">
            <Link href="/" className="hover:text-ink underline underline-offset-2">← Back to the store</Link>
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  const navItems = [
    { key: "orders" as const, label: "Orders", icon: ShoppingBag },
    { key: "products" as const, label: "Products", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-ink font-sans flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-ink text-cream flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="text-xl font-serif tracking-[0.25em] uppercase">Ziva</p>
          <p className="text-[9px] tracking-[0.25em] text-[#C9A961] uppercase font-bold mt-1">Admin Console</p>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer ${
                activeTab === key
                  ? "bg-[#C9A961] text-ink"
                  : "text-cream/60 hover:text-cream hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-white/10 flex flex-col gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View store
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-cream/60 hover:text-red-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-ink text-cream px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-4.5 h-4.5 text-[#C9A961]" />
            <span className="text-sm font-serif tracking-[0.2em] uppercase">Ziva Admin</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                  activeTab === key ? "bg-[#C9A961] text-ink" : "text-cream/60"
                }`}
              >
                {label}
              </button>
            ))}
            <button onClick={handleLogout} aria-label="Sign out" className="p-2 text-cream/60 hover:text-red-300 cursor-pointer">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-8 py-8 max-w-[1200px] w-full mx-auto">
          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-serif text-ink">Orders</h1>
                  <p className="text-[11px] text-stone-400 font-medium mt-1">
                    Live order feed, payments and fulfilment
                  </p>
                </div>
                <button
                  onClick={fetchOrders}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200/70 rounded-xl text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:border-[#C9A961] hover:text-ink transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                <StatCard label="Total Orders" value={orders.length} icon={ShoppingBag} accent="bg-[#EFE6D2] text-[#8a6d15]" />
                <StatCard label="Revenue" value={inr(totalRevenue)} icon={TrendingUp} accent="bg-emerald-50 text-emerald-600" />
                <StatCard label="Pending" value={countBy("pending")} icon={Clock} accent="bg-amber-50 text-amber-600" />
                <StatCard label="Dispatched" value={countBy("dispatched")} icon={Truck} accent="bg-sky-50 text-sky-600" />
                <StatCard label="Delivered" value={countBy("delivered")} icon={CheckCircle2} accent="bg-emerald-50 text-emerald-700" />
              </div>

              {/* Filters */}
              <div className="bg-white border border-stone-200/60 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row justify-between gap-3">
                <div className="relative flex items-center flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by order id, name or phone…"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] focus:bg-white transition-colors"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] cursor-pointer"
                >
                  <option value="">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Orders table */}
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden">
                {loadingOrders ? (
                  <div className="p-6 flex flex-col gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-14 rounded-xl bg-stone-100 animate-pulse" />
                    ))}
                  </div>
                ) : filteredOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-50/80 border-b border-stone-200/60 text-[9px] uppercase tracking-[0.15em] text-stone-400 font-bold">
                          <th className="py-4 px-5">Order</th>
                          <th className="py-4 px-5">Customer</th>
                          <th className="py-4 px-5">Items</th>
                          <th className="py-4 px-5">Amount</th>
                          <th className="py-4 px-5">Status</th>
                          <th className="py-4 px-5">Tracking</th>
                          <th className="py-4 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredOrders.map((o) => {
                          const items = parseOrderItems(o.products);
                          const status = (o.payment_status || "pending").toLowerCase();
                          return (
                            <tr key={o.order_id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                              <td className="py-4 px-5">
                                <span className="font-mono text-[10px] text-stone-600 select-all block max-w-[120px] truncate" title={o.order_id}>
                                  {o.order_id}
                                </span>
                                <span className="text-[9px] text-stone-400 block mt-1">
                                  {o.time_stamp ? new Date(o.time_stamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}
                                </span>
                              </td>
                              <td className="py-4 px-5">
                                <span className="font-semibold text-ink block">{o.name}</span>
                                <span className="text-[10px] text-stone-400 block mt-0.5">{o.phone}</span>
                              </td>
                              <td className="py-4 px-5">
                                <div className="flex flex-col gap-0.5 max-w-[200px]">
                                  {items.slice(0, 2).map((p: { name?: string; qty?: number }, idx: number) => (
                                    <span key={idx} className="line-clamp-1 text-stone-600">
                                      {p.name} <span className="text-stone-400">×{p.qty || 1}</span>
                                    </span>
                                  ))}
                                  {items.length > 2 && (
                                    <span className="text-[10px] text-stone-400">+{items.length - 2} more</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-5 font-semibold text-ink">{inr(o.total_amount)}</td>
                              <td className="py-4 px-5">
                                <select
                                  value={status}
                                  onChange={(e) => handleUpdateStatus(o.order_id, e.target.value)}
                                  className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-full cursor-pointer border ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="paid">Paid</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-4 px-5">
                                <TrackingCell order={o} onSave={handleUpdateTracking} />
                              </td>
                              <td className="py-4 px-5 text-right">
                                <div className="inline-flex gap-2">
                                  <button
                                    onClick={() => setSelectedOrder(o)}
                                    className="p-2 border border-stone-200 rounded-lg hover:border-[#C9A961] hover:text-[#8a6d15] bg-white transition-colors cursor-pointer"
                                    title="Order details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (!printReceipt(o))
                                        pushToast("error", "Allow pop-ups to print the receipt.");
                                    }}
                                    className="p-2 border border-stone-200 rounded-lg hover:border-[#C9A961] hover:text-[#8a6d15] bg-white transition-colors cursor-pointer"
                                    title="Print receipt"
                                  >
                                    <Printer className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <ShoppingBag className="w-8 h-8 text-stone-200 mx-auto mb-3" />
                    <p className="text-xs text-stone-400 font-medium">No orders match these filters.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === "products" && (
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-serif text-ink">Products</h1>
                  <p className="text-[11px] text-stone-400 font-medium mt-1">
                    Manage the catalog — prices, imagery and details
                  </p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="flex items-center gap-2 px-5 py-3 bg-ink hover:bg-[#C9A961] text-white hover:text-ink rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add product
                </button>
              </div>

              {usingFallbackCatalog && (
                <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-amber-800">
                  <div className="flex items-start gap-3 flex-1">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      Showing the bundled catalog — the Supabase <code className="font-mono">product</code> table is
                      empty or unreachable. Run <code className="font-mono">supabase/schema.sql</code> once, then seed it here.
                    </p>
                  </div>
                  <button
                    onClick={handleSeedCatalog}
                    disabled={seeding}
                    className="shrink-0 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {seeding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Seed catalog
                  </button>
                </div>
              )}

              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden">
                {loadingProducts ? (
                  <div className="p-6 flex flex-col gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-14 rounded-xl bg-stone-100 animate-pulse" />
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-50/80 border-b border-stone-200/60 text-[9px] uppercase tracking-[0.15em] text-stone-400 font-bold">
                          <th className="py-4 px-5">Product</th>
                          <th className="py-4 px-5">Category</th>
                          <th className="py-4 px-5">Price</th>
                          <th className="py-4 px-5">Sizes</th>
                          <th className="py-4 px-5">Badge</th>
                          <th className="py-4 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-11 h-11 object-cover rounded-xl border border-stone-100 shrink-0"
                                />
                                <div>
                                  <span className="font-semibold text-ink block max-w-[220px] truncate" title={p.name}>
                                    {p.name}
                                  </span>
                                  <span className="text-[10px] text-stone-400 font-mono">#{p.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-5 text-stone-500 font-medium">{p.category}</td>
                            <td className="py-3 px-5">
                              <span className="font-semibold text-ink">{p.price}</span>
                              {p.oldPrice && (
                                <span className="text-[10px] text-stone-400 line-through block mt-0.5">{p.oldPrice}</span>
                              )}
                            </td>
                            <td className="py-3 px-5 text-stone-500 max-w-[140px] truncate">
                              {Array.isArray(p.sizes) ? p.sizes.join(", ") : p.sizes}
                            </td>
                            <td className="py-3 px-5">
                              {p.badge && (
                                <span className="px-2.5 py-1 bg-[#EFE6D2] text-[#8a6d15] text-[8px] uppercase font-bold tracking-widest rounded-full">
                                  {p.badge}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-5 text-right">
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => openEditProduct(p)}
                                  className="p-2 border border-stone-200 rounded-lg hover:border-[#C9A961] hover:text-[#8a6d15] bg-white transition-colors cursor-pointer"
                                  title="Edit product"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteTarget(p)}
                                  className="p-2 border border-stone-200 rounded-lg hover:border-red-400 hover:text-red-500 bg-white transition-colors cursor-pointer"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <Package className="w-8 h-8 text-stone-200 mx-auto mb-3" />
                    <p className="text-xs text-stone-400 font-medium">No products yet — add your first one.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ── Order details modal ── */}
      {selectedOrder && (
        <ModalShell onClose={() => setSelectedOrder(null)} maxWidth="max-w-2xl">
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-serif text-ink mb-1">Order details</h3>
                <p className="font-mono text-[10px] text-stone-400 select-all">{selectedOrder.order_id}</p>
              </div>
              <button
                onClick={() => {
                  if (!printReceipt(selectedOrder))
                    pushToast("error", "Allow pop-ups to print the receipt.");
                }}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-ink hover:bg-[#C9A961] text-white hover:text-ink rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print receipt
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-stone-200/50">
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3">Payment</p>
                <div className="flex flex-col gap-1.5 text-stone-600">
                  <span>Amount: <strong className="text-ink">{inr(selectedOrder.total_amount)}</strong></span>
                  <span>
                    Status:{" "}
                    <strong className={`uppercase px-2 py-0.5 rounded-full text-[9px] border ${STATUS_STYLES[(selectedOrder.payment_status || "pending").toLowerCase()] ?? STATUS_STYLES.pending}`}>
                      {selectedOrder.payment_status}
                    </strong>
                  </span>
                  <span>Method: {selectedOrder.payment_method || "Online"}</span>
                  <span>Source: {selectedOrder.order_source || "Website"}</span>
                  <span>
                    Date: {selectedOrder.time_stamp ? new Date(selectedOrder.time_stamp).toLocaleString("en-IN") : "N/A"}
                  </span>
                  {selectedOrder.tracking_id && (
                    <span>Tracking: <span className="font-mono">{selectedOrder.tracking_id}</span></span>
                  )}
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-stone-200/50">
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3">Shipping</p>
                <div className="flex flex-col gap-1.5 text-stone-600">
                  <span className="font-semibold text-ink">{selectedOrder.name}</span>
                  <span>{selectedOrder.phone}</span>
                  <span>{selectedOrder.email}</span>
                  <span className="leading-relaxed mt-1">
                    {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Items</p>
            <div className="border border-stone-200/60 rounded-2xl divide-y divide-stone-100 overflow-hidden">
              {parseOrderItems(selectedOrder.products).map(
                (item: { name?: string; qty?: number; size?: string; price?: number }, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-4 text-xs bg-white">
                    <div>
                      <span className="font-semibold text-ink block">{item.name}</span>
                      {item.size && (
                        <span className="text-[9px] text-[#8a6d15] uppercase font-bold mt-0.5 block">
                          Size: {item.size}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-stone-500 block">× {item.qty}</span>
                      {item.price != null && <span className="font-semibold text-ink block mt-0.5">{inr(item.price)}</span>}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </ModalShell>
      )}

      {/* ── Product form modal ── */}
      {isProductModalOpen && (
        <ModalShell onClose={() => setIsProductModalOpen(false)}>
          <form onSubmit={handleSaveProduct} className="p-8 flex flex-col gap-4 text-xs">
            <h3 className="text-xl font-serif text-ink mb-2">
              {editingProduct ? "Edit product" : "New product"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Product id</label>
                <input
                  type="number"
                  value={productForm.id}
                  disabled={!!editingProduct}
                  onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] disabled:bg-stone-50 disabled:text-stone-400"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#C9A961] cursor-pointer"
                >
                  <option value="Skincare">Skincare</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Haircare">Haircare</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Badge</label>
                <input
                  type="text"
                  value={productForm.badge}
                  onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                  placeholder="Bestseller, New…"
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Price (e.g. ₹1,299)</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Old price (optional)</label>
                <input
                  type="text"
                  value={productForm.oldPrice}
                  onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadField
                label="Product image"
                value={productForm.image}
                required
                onChange={(url) => setProductForm((f) => ({ ...f, image: url }))}
                onError={(m) => setProductFormError(m)}
              />
              <ImageUploadField
                label="Hover image (optional)"
                value={productForm.hoverImage}
                onChange={(url) => setProductForm((f) => ({ ...f, hoverImage: url }))}
                onError={(m) => setProductFormError(m)}
              />
            </div>

            {/* Gallery images — extra photos shown in the product page thumbnails */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-2">
                Gallery images (optional · up to 4)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <ImageUploadField
                    key={i}
                    label={`Image ${i + 1}`}
                    value={productForm.gallery[i] || ""}
                    onChange={(url) => setGalleryImage(i, url)}
                    onError={(m) => setProductFormError(m)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={productForm.rating}
                  onChange={(e) => setProductForm({ ...productForm, rating: parseFloat(e.target.value) || 5 })}
                  required
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  required
                  placeholder="30 ml, 50 ml, 100 ml"
                  className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Description</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                required
                rows={3}
                className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] font-sans"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Ingredients (optional)</label>
              <textarea
                value={productForm.ingredients}
                onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] font-sans"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.18em] text-stone-500 font-bold mb-1.5">Usage ritual (optional)</label>
              <textarea
                value={productForm.usage}
                onChange={(e) => setProductForm({ ...productForm, usage: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A961] font-sans"
              />
            </div>

            {productFormError && (
              <p className="text-red-500 text-[11px] font-medium bg-red-50 border border-red-200 rounded-xl p-3">
                {productFormError}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-5 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 text-[10px] font-bold uppercase tracking-[0.15em] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProduct}
                className="px-6 py-3 bg-ink hover:bg-[#C9A961] text-white hover:text-ink rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {savingProduct && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {editingProduct ? "Save changes" : "Create product"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {/* ── Delete confirmation ── */}
      {deleteTarget && (
        <ModalShell onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
          <div className="p-8 text-center">
            <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-serif text-ink mb-2">Delete this product?</h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              <strong className="text-ink">“{deleteTarget.name}”</strong> will be permanently removed from the
              catalog. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 text-[10px] font-bold uppercase tracking-[0.15em] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                disabled={deleting}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ── Toasts ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-lg border text-xs font-medium flex items-center gap-2.5 bg-white ${
              t.kind === "success" ? "border-emerald-200 text-emerald-700" : "border-red-200 text-red-600"
            }`}
          >
            {t.kind === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
