import { Product } from '@prisma/client';
import { create } from 'zustand';

interface CartProduct extends Product {
  quantity: number;
}

interface ShopState {
  products: any;
  setProducts: (products: any) => void;
  selectedCat: string;
  setSelectedCat: (category: string) => void;
  cart: CartProduct[];
  updateCart: (product: Product) => void;
  increaseProduct: (productId: string) => void;
  decreaseProduct: (productId: string) => void;
  currentSingleProduct: any;
  setCurrentSingleProduct: (product: any) => void;
  totalPrice: number;
  setTotalPrice: (price: number, op: string) => void;
}

const increaseQuantity = (cart: CartProduct[], productId: string) => {
  const indexOfProduct = cart.findIndex((p) => p.id === productId);
  const newCart = [...cart];
  newCart[indexOfProduct] = {
    ...newCart[indexOfProduct],
    quantity: newCart[indexOfProduct].quantity + 1,
  };
  return newCart;
};

const decreaseQuantity = (cart: CartProduct[], productId: string) => {
  const indexOfProduct = cart.findIndex((p: CartProduct) => p.id === productId);
  const productToUpdate = cart.find((p: CartProduct) => p.id === productId);
  const newCart = [...cart];
  if (productToUpdate!.quantity - 1 <= 0) {
    const filteredCart = newCart.filter((p) => p.id !== productId);
    return filteredCart;
  } else {
    newCart[indexOfProduct] = {
      ...newCart[indexOfProduct],
      quantity: newCart[indexOfProduct].quantity - 1,
    };
    return newCart;
  }
};

const updatePrice = (price: any, op: string, currentPrice: any) => {
  const updatedPrice =
    op === 'add' ? price + currentPrice : currentPrice - price;
  if (updatedPrice < 0) return 0;
  return updatedPrice;
};

export const useShopStore = create<ShopState>()((set) => ({
  products: null,
  setProducts: (products) => set((state) => ({ products })),
  selectedCat: 'All products',
  setSelectedCat: (category) => set((state) => ({ selectedCat: category })),
  cart: [],
  updateCart: (product: Product) =>
    set((state) => ({ cart: [...state.cart, { ...product, quantity: 1 }] })),
  increaseProduct: (productId) =>
    set((state) => ({
      cart: increaseQuantity(state.cart, productId),
    })),
  decreaseProduct: (productId) =>
    set((state) => ({
      cart: decreaseQuantity(state.cart, productId),
    })),
  currentSingleProduct: null,
  setCurrentSingleProduct: (product) =>
    set((state) => ({ currentSingleProduct: product })),
  totalPrice: 0,
  setTotalPrice: (price: number, op: string) =>
    set((state) => ({
      totalPrice: updatePrice(price, op, state.totalPrice),
    })),
}));
