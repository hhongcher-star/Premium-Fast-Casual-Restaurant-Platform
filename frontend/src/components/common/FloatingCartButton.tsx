import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export default function FloatingCartButton() {
  const { count } = useCart();
  const { location } = useRouterState();

  if (location.pathname === "/reserve") return null;

  return (
    <Link
      to="/cart"
      aria-label="Open cart"
      className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-white text-[#211c1a] shadow-[0_18px_45px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:bg-[#f5a623] md:bottom-8 md:right-8 md:h-20 md:w-20"
    >
      <ShoppingBag className="h-7 w-7 md:h-8 md:w-8" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-[#f04b3f] px-1.5 text-xs font-bold text-white shadow-md">
          {count}
        </span>
      )}
    </Link>
  );
}
