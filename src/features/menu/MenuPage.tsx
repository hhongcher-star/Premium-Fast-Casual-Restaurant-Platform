import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/site/Layout";
import DishCard from "@/components/site/DishCard";
import { dishes, categories } from "@/lib/data";

export const Route = createFileRoute("/menu/")({
  component: Menu,
  head: () => ({ meta: [{ title: "Menu — Maison Olive" }] }),
});

function Menu() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = dishes.filter(
    (d) =>
      (cat === "All" || d.category === cat) &&
      (q === "" || d.name.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pt-10 md:px-8">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Our kitchen
          </span>
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">The Menu</h1>
          <p className="max-w-xl text-muted-foreground">
            Curated daily by Chef Inês Almeida. Seasonal ingredients, considered plates.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-soft focus:border-primary focus:outline-none"
            />
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm shadow-soft">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                cat === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-foreground/70 hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <DishCard key={d.id} dish={d} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No dishes match your search.</p>
        )}
      </section>
    </Layout>
  );
}
