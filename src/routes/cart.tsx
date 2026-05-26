import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/site/Layout";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  component: Cart,
  head: () => ({ meta: [{ title: "Cart — Maison Olive" }] }),
});

function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const discount = applied ? subtotal * 0.1 : 0;
  const delivery = items.length > 0 ? 3.5 : 0;
  const total = subtotal - discount + delivery;

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 pt-10 md:px-8">
        <h1 className="font-display text-5xl tracking-tight md:text-6xl">Your cart</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length === 0
            ? "Your cart is feeling light. Let's fix that."
            : `${items.length} ${items.length === 1 ? "item" : "items"} ready for checkout.`}
        </p>

        {items.length === 0 ? (
          <div className="mt-16 rounded-3xl bg-card p-16 text-center shadow-soft">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-4 text-muted-foreground">Nothing here yet.</p>
            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Explore the menu
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="space-y-3">
              {items.map(({ dish, qty }) => (
                <div
                  key={dish.id}
                  className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-20 w-20 rounded-2xl object-cover md:h-24 md:w-24"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-lg">{dish.name}</h3>
                    <p className="text-sm text-muted-foreground">${dish.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                    <button
                      onClick={() => setQty(dish.id, qty - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-card"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(dish.id, qty + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="hidden w-20 text-right font-display text-lg md:block">
                    ${(dish.price * qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() => remove(dish.id)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <aside className="h-fit space-y-4">
              <div className="rounded-3xl bg-card p-6 shadow-soft">
                <h3 className="font-display text-2xl">Promo code</h3>
                <div className="mt-3 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Enter code"
                      className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setApplied(promo.trim().length > 0)}
                    className="rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                  >
                    Apply
                  </button>
                </div>
                {applied && (
                  <p className="mt-2 text-xs text-primary">10% off applied — thank you!</p>
                )}
              </div>

              <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-elegant">
                <h3 className="font-display text-2xl">Order summary</h3>
                <dl className="mt-5 space-y-2 text-sm">
                  <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
                  {applied && <Row k="Discount" v={`-$${discount.toFixed(2)}`} />}
                  <Row k="Delivery" v={`$${delivery.toFixed(2)}`} />
                </dl>
                <div className="mt-5 flex items-baseline justify-between border-t border-primary-foreground/20 pt-4">
                  <span className="text-sm opacity-80">Total</span>
                  <span className="font-display text-3xl">${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 block rounded-full bg-card py-3.5 text-center text-sm font-medium text-foreground shadow-float hover:scale-[1.01]"
                >
                  Continue to checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="opacity-80">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
