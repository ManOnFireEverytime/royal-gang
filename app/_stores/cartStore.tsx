import { create } from "zustand";

//TODO: WHOEVER IS GOING TO WORK ON THIS, PLEASE IMPLEMENT THIS PROPERLY, I HAVE NO IDEA WHAT DATA IT RECEIVES
interface CartItem {
  id: string;
  name: string;
  color: string;
  image: StaticImageData;
  price: number;
  quantity: number;
}

interface CartDetails {
  items: CartItem[];
  subtotal: number;
  addToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  incrementItemQuantity: (id: string) => void;
  decrementItemQuantity: (id: string) => void;
}

import embraceTshirt from "../../public/embrace.webp";
import { StaticImageData } from "next/image";

export const cartStore = create<CartDetails>((set) => ({
  items: [
    {
      id: "1",
      name: "Oceanhood- Brown",
      color: "Brown",
      price: 100000,
      quantity: 4,
      image: embraceTshirt,
    },
    {
      id: "2",
      name: "Oceanhood - White",
      color: "White",
      price: 100000,
      quantity: 2,
      image: embraceTshirt,
    },
  ],

  subtotal: 600000,

  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],

      subtotal: state.subtotal + item.price * item.quantity,
    })),

  incrementItemQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      return {
        items: updatedItems,
        totalPrice: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      };
    }),

  decrementItemQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      );

      return {
        items: updatedItems,
        subtotal: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      };
    }),

  removeItemFromCart: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);

      return {
        items: updatedItems,
        subtotal: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      };
    }),
}));
