import { create } from "zustand";

export type DrawerId = "cart" | "wishlist" | "search" | "mobileMenu" | "filter";
export type ModalId = "quickView" | "trackOrder" | "checkoutSuccess" | "gallery";

interface UiState {
  drawers: Record<DrawerId, boolean>;
  modals: Record<ModalId, boolean>;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: (id: DrawerId) => void;
  toggleDrawer: (id: DrawerId) => void;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
}

const defaultDrawers: Record<DrawerId, boolean> = {
  cart: false,
  wishlist: false,
  search: false,
  mobileMenu: false,
  filter: false,
};

const defaultModals: Record<ModalId, boolean> = {
  quickView: false,
  trackOrder: false,
  checkoutSuccess: false,
  gallery: false,
};

export const useUiStore = create<UiState>((set) => ({
  drawers: { ...defaultDrawers },
  modals: { ...defaultModals },
  openDrawer: (id) =>
    set((s) => ({ drawers: { ...s.drawers, [id]: true } })),
  closeDrawer: (id) =>
    set((s) => ({ drawers: { ...s.drawers, [id]: false } })),
  toggleDrawer: (id) =>
    set((s) => ({ drawers: { ...s.drawers, [id]: !s.drawers[id] } })),
  openModal: (id) =>
    set((s) => ({ modals: { ...s.modals, [id]: true } })),
  closeModal: (id) =>
    set((s) => ({ modals: { ...s.modals, [id]: false } })),
}));
