"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the item type
interface BagItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

// Create a context for the bag
interface BagContextType {
  bag: BagItem[];
  addToBag: (item: BagItem) => void;
  removeFromBag: (itemId: string, size: string) => void;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

// BagProvider to wrap your app and provide context
export const BagProvider = ({ children }: { children: ReactNode }) => {
  const [bag, setBag] = useState<BagItem[]>([]);

  // Load the bag from localStorage if it exists
  useEffect(() => {
    const savedBag = JSON.parse(localStorage.getItem("bag") || "[]");
    setBag(savedBag);
  }, []);

  // Update localStorage whenever the bag changes
  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  const addToBag = (item: BagItem) => {
    setBag((prevBag) => {
      const existingItem = prevBag.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        return prevBag.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevBag, item];
    });
  };

  const removeFromBag = (itemId: string, size: string) => {
    setBag((prevBag) => prevBag.filter((item) => item.id !== itemId || item.size !== size));
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    setBag((prevBag) =>
      prevBag.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  return (
    <BagContext.Provider value={{ bag, addToBag, removeFromBag, updateQuantity }}>
      {children}
    </BagContext.Provider>
  );
};

// Custom hook to use the bag context
export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};
