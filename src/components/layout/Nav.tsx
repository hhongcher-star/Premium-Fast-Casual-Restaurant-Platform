import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reserve", label: "Reserve" },
  { to: "/rewards", label: "Rewards" },
  { to: "/profile", label: "Profile" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { location } = useRouterState();

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 shadow-soft md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-xl tracking-tight">Maison Olive</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active =
                l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition hover:bg-primary hover:text-primary-foreground"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm md:hidden">
          <div className="absolute right-4 top-4 w-[88vw] max-w-sm rounded-3xl bg-card p-6 shadow-elegant">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl">Menu</span>
              <button
                className="grid h-9 w-9 place-items-center rounded-full bg-secondary"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/track"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base hover:bg-secondary"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
