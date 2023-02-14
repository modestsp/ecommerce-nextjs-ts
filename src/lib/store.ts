import { Product } from '@prisma/client';
import { create } from 'zustand';

interface ShopState {
  products: any;
  setProducts: (products: any) => void;
  selectedCat: string;
  setSelectedCat: (category: string) => void;
  cart: Product[] | [];
  updateCart: (product: Product) => void;
}

export const useShopStore = create<ShopState>()((set) => ({
  products: null,
  setProducts: (products) => set((state) => ({ products })),
  selectedCat: '',
  setSelectedCat: (category) => set((state) => ({ selectedCat: category })),
  cart: [],
  updateCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
}));
