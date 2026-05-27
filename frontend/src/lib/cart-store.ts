import { useEffect, useState } from "react";
import type { Dish } from "./data";

type CartItem = { dish: Dish; qty: number; size?: string };
const KEY = "maison-cart";
const listeners = new Set<() => void>();

function itemKey(dish: Dish, size?: string) {
  return size ? `${dish.id}:${size}` : dish.id;
}

function keyFromParts(id: string, size?: string) {
  return size ? `${id}:${size}` : id;
}

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
    add: (dish: Dish, size?: string) => {
      const cur = read();
      const found = cur.find((i) => itemKey(i.dish, i.size) === itemKey(dish, size));
      if (found) found.qty += 1;
      else cur.push({ dish, qty: 1, size });
      write(cur);
    },
    remove: (id: string, size?: string) =>
      write(read().filter((i) => itemKey(i.dish, i.size) !== keyFromParts(id, size))),
    setQty: (id: string, qty: number, size?: string) => {
      const cur = read()
        .map((i) => (itemKey(i.dish, i.size) === keyFromParts(id, size) ? { ...i, qty } : i))
        .filter((i) => i.qty > 0);
      write(cur);
    },
    clear: () => write([]),
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.dish.price, 0),
  };
}
