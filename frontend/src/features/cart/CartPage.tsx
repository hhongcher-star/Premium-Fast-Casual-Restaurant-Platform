import { Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Lock, Minus, Plus, ShieldCheck, Tag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/lib/cart-store";
import { dishes } from "@/lib/data";
import hero from "@/assets/dish-burger.jpg";
import fries from "@/assets/burger.jpg";

export function CartPage() {
  const { items, setQty, remove, subtotal, add } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const discount = applied ? subtotal * 0.1 : 0;
  const delivery = items.length > 0 ? 3.5 : 0;
  const total = subtotal - discount + delivery;
  const suggestions = [
    { name: "Truffle Fries", price: 9, image: fries },
    { dish: dishes[0], name: "Creamy Pasta", price: 18, image: dishes[0].image },
    { dish: dishes[5], name: "Lava Cake", price: 8, image: dishes[5].image },
  ];

  return (
    <Layout>
      <section className="-mb-24 bg-[#0d0a08] pb-12 text-white">
        <div
          className="relative px-5 py-9 md:px-8 md:py-16"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(13,10,8,0.98), rgba(13,10,8,0.72), rgba(13,10,8,0.18)), url(${hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto max-w-7xl">
            <h1 className="font-display text-4xl md:text-7xl">
              Your <span className="text-[#f52323]">cart</span>
            </h1>
            <div className="mt-4 h-1 w-12 bg-[#f5a623]" />
            <p className="mt-4 text-base text-white/62 md:text-lg">
              {items.length === 0
                ? "Your cart is feeling light. Let's fix that."
                : `${items.length} ${items.length === 1 ? "item" : "items"} ready for checkout.`}
            </p>
          </div>
        </div>

        <div className="mx-auto -mt-8 grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-[#171210] p-12 text-center shadow-elegant lg:col-span-2">
              <p className="text-white/65">Nothing here yet.</p>
              <Link to="/menu" className="mt-6 inline-flex rounded-full bg-[#f52323] px-6 py-3 text-sm font-bold text-white">
                Explore the menu
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                {items.map(({ dish, qty, size }) => (
                  <div
                    key={size ? `${dish.id}:${size}` : dish.id}
                    className="overflow-hidden rounded-[22px] border border-[#f52323]/25 bg-[#171210] shadow-elegant md:rounded-[28px]"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-3 md:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-display text-lg leading-tight text-[#f04b3f] md:text-2xl">{dish.name}</h2>
                        <div className="whitespace-nowrap font-display text-base text-[#f5a623] md:text-xl">
                          ${dish.price}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-white/55 md:text-sm">
                        {size ? `${size} size` : "each"}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-white/15 bg-white/[0.03] p-1">
                          <button onClick={() => setQty(dish.id, qty - 1, size)} className="grid h-8 w-8 place-items-center rounded-full">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center font-bold">{qty}</span>
                          <button onClick={() => setQty(dish.id, qty + 1, size)} className="grid h-8 w-8 place-items-center rounded-full bg-[#f52323]">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-bold">${(dish.price * qty).toFixed(2)}</div>
                        <button onClick={() => remove(dish.id, size)} className="text-white/50 hover:text-[#f52323]">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#171210] p-5">
                  <h2 className="font-display text-2xl">You might also like</h2>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {suggestions.map((s) => (
                      <div key={s.name} className="grid grid-cols-[92px_1fr_auto] items-center gap-3 rounded-[18px] bg-white/[0.04] p-3">
                        <img
                          src={s.image}
                          alt={s.name}
                          loading="lazy"
                          decoding="async"
                          className="h-20 w-[92px] rounded-[12px] object-cover"
                        />
                        <div>
                          <p className="font-display text-lg">{s.name}</p>
                          <p className="text-sm text-[#f5a623]">${s.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => s.dish && add(s.dish)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-[#f52323]"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 rounded-[24px] border border-white/10 bg-[#171210] p-5 md:grid-cols-3">
                  <Trust icon={ShieldCheck} title="Secure checkout" desc="Your information is safe." />
                  <Trust icon={Truck} title="Fast delivery" desc="Quick and reliable delivery." />
                  <Trust icon={Headphones} title="Need help?" desc="+60 12-345 6789" />
                </div>
              </div>

              <aside className="h-fit space-y-5 lg:sticky lg:top-28">
                <div className="rounded-[24px] border border-white/10 bg-[#171210] p-6 shadow-elegant">
                  <h2 className="font-display text-3xl">Promo code</h2>
                  <div className="mt-5 flex rounded-full border border-white/15 bg-white/[0.04] p-1">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#f5a623]" />
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Enter code"
                        className="w-full bg-transparent py-3 pl-11 pr-3 text-sm outline-none placeholder:text-white/40"
                      />
                    </div>
                    <button onClick={() => setApplied(promo.trim().length > 0)} className="rounded-full bg-[#f52323] px-6 text-sm font-bold">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#6d932b]/35 bg-[#193016] p-6 shadow-elegant">
                  <h2 className="font-display text-3xl">Order summary</h2>
                  <dl className="mt-6 space-y-3 text-white/72">
                    <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
                    {applied && <Row k="Discount" v={`-$${discount.toFixed(2)}`} />}
                    <Row k="Delivery" v={`$${delivery.toFixed(2)}`} />
                  </dl>
                  <div className="mt-6 flex items-baseline justify-between border-t border-white/15 pt-5">
                    <span className="font-bold">Total</span>
                    <span className="font-display text-4xl text-[#f52323]">${total.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[#f52323] py-4 text-sm font-bold text-white">
                    Continue to checkout <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <p className="flex items-center justify-center gap-2 text-sm text-white/45">
                  <Lock className="h-4 w-4" /> 100% secure payments
                </p>
              </aside>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

function Trust({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f52323]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-white/62">{desc}</p>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt>{k}</dt>
      <dd className="font-bold text-white">{v}</dd>
    </div>
  );
}
