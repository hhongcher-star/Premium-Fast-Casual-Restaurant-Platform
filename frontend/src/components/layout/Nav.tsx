import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
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
      <header className="sticky top-0 z-50 w-full bg-[#f5a623] shadow-md">
        <motion.nav
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-5 md:px-8"
        >
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#b33a2f] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-xl tracking-tight">
  <span className="text-[#f52323]">Maison</span>{" "}
  <span className="text-[#344c26]">Olive</span>
</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {links.map((l) => {
              const active =
                l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);

              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-[#f5a623] text-[#211c1a]" : "text-white/70 hover:text-white"
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
              className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#f5a623] hover:text-[#211c1a]"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#f5a623] text-[10px] font-semibold text-[#211c1a]">
                  {count}
                </span>
              )}
            </Link>

            <button
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </motion.nav>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute right-4 top-4 w-[88vw] max-w-sm rounded-3xl bg-[#211c1a] p-6 text-white shadow-elegant"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl">Menu</span>
              <button
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {links.map((l) => {
                const active =
                  l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);

                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base transition-colors ${
                      active
                        ? "bg-[#f5a623] text-[#211c1a]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}

              <Link
                to="/track"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-white/80 hover:bg-white/10 hover:text-white"
              >
                Track Order
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
