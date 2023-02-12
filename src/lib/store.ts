import { useGetProducts } from '@/hooks/useGetProducts';
import { create } from 'zustand';
import { UserWithSession } from './session';

interface ShopState {
  products: any;
  setProducts: (products: any) => void;
  selectedCat: string;
  setSelectedCat: (category: string) => void;
}

export const useShopStore = create<ShopState>()((set) => ({
  products: null,
  setProducts: (products) => set((state) => ({ products })),
  selectedCat: '',
  setSelectedCat: (category) => set((state) => ({ selectedCat: category })),
}));
