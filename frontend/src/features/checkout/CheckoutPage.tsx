import { useNavigate } from "@tanstack/react-router";
import { CreditCard, MapPin, Truck, Store, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/lib/cart-store";

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const delivery = method === "delivery" ? 3.5 : 0;
  const total = subtotal + delivery;

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-6 pt-10 md:px-8">
        <button
          onClick={() => nav({ to: "/cart" })}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to cart
        </button>
        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">Checkout</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Card title="Order method">
              <div className="grid grid-cols-2 gap-3">
                <MethodBtn
                  active={method === "delivery"}
                  onClick={() => setMethod("delivery")}
                  icon={Truck}
                  label="Delivery"
                  sub="25–35 min"
                />
                <MethodBtn
                  active={method === "pickup"}
                  onClick={() => setMethod("pickup")}
                  icon={Store}
                  label="Pickup"
                  sub="Ready in 15 min"
                />
              </div>
            </Card>

            <Card title="Contact & address">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Full name" placeholder="Sofia Andersen" />
                <Field label="Phone" placeholder="+351 ..." />
                <Field label="Email" placeholder="you@email.com" className="md:col-span-2" />
                {method === "delivery" && (
                  <Field
                    label="Delivery address"
                    placeholder="Rua das Flores 24, Lisboa"
                    icon={MapPin}
                    className="md:col-span-2"
                  />
                )}
              </div>
            </Card>

            <Card title="Payment">
              <div className="grid gap-3">
                <Field label="Card number" placeholder="0000 0000 0000 0000" icon={CreditCard} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" placeholder="MM / YY" />
                  <Field label="CVC" placeholder="123" />
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded accent-primary" defaultChecked />
                Save card for next time
              </label>
            </Card>
          </div>

          <aside className="h-fit rounded-3xl bg-primary p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-2xl">Your order</h3>
            <ul className="mt-4 space-y-3 border-b border-primary-foreground/15 pb-4 text-sm">
              {items.length === 0 && <li className="opacity-70">Cart is empty</li>}
              {items.map(({ dish, qty }) => (
                <li key={dish.id} className="flex justify-between gap-3">
                  <span className="opacity-90">
                    {qty}× {dish.name}
                  </span>
                  <span>${(dish.price * qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
              <Row
                k={method === "delivery" ? "Delivery" : "Pickup"}
                v={`$${delivery.toFixed(2)}`}
              />
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-primary-foreground/20 pt-4">
              <span className="text-sm opacity-80">Total</span>
              <span className="font-display text-3xl">${total.toFixed(2)}</span>
            </div>
            <button
              disabled={items.length === 0}
              onClick={() => {
                clear();
                nav({ to: "/track" });
              }}
              className="mt-6 block w-full rounded-full bg-card py-3.5 text-sm font-medium text-foreground shadow-float disabled:opacity-50 hover:scale-[1.01]"
            >
              Place order · ${total.toFixed(2)}
            </button>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
      <h3 className="font-display text-2xl">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon: Icon,
  className = "",
}: {
  label: string;
  placeholder: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="relative mt-1.5">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-border bg-background py-3 ${
            Icon ? "pl-9" : "pl-4"
          } pr-4 text-sm focus:border-primary focus:outline-none`}
        />
      </div>
    </label>
  );
}

function MethodBtn({
  active,
  onClick,
  icon: Icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-secondary"
      }`}
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          active ? "bg-primary-foreground/15" : "bg-secondary"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-medium">{label}</div>
        <div className={`text-xs ${active ? "opacity-80" : "text-muted-foreground"}`}>{sub}</div>
      </div>
    </button>
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
