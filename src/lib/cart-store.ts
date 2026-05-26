import { useEffect, useState } from "react";
import type { Dish } from "./data";

type CartItem = { dish: Dish; qty: number };
const KEY = "maison-cart";
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return {
    items,
    add: (dish: Dish) => {
      const cur = read();
      const found = cur.find((i) => i.dish.id === dish.id);
      if (found) found.qty += 1;
      else cur.push({ dish, qty: 1 });
      write(cur);
    },
    remove: (id: string) => write(read().filter((i) => i.dish.id !== id)),
    setQty: (id: string, qty: number) => {
      const cur = read()
        .map((i) => (i.dish.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0);
      write(cur);
    },
    clear: () => write([]),
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.dish.price, 0),
  };
}
