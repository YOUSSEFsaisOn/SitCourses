import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "@/lib/types";

interface CartStore extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find((i) => i.courseId === item.courseId);

        if (!existingItem) {
          const newItems = [...items, item];
          const total = newItems.reduce((sum, i) => sum + i.course.price, 0);
          set({ items: newItems, total });
        }
      },

      removeItem: (courseId: string) => {
        const { items } = get();
        const newItems = items.filter((i) => i.courseId !== courseId);
        const total = newItems.reduce((sum, i) => sum + i.course.price, 0);
        set({ items: newItems, total });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      isInCart: (courseId: string) => {
        const { items } = get();
        return items.some((i) => i.courseId === courseId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);
