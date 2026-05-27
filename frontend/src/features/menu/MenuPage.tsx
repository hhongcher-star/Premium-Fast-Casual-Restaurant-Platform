import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import DishCard from "@/components/common/DishCard";
import { dishes, categories } from "@/lib/data";

const allTags = Array.from(new Set(dishes.flatMap((dish) => dish.tags)));
const maxDishPrice = Math.max(...dishes.map((dish) => dish.price));

export function MenuPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tag, setTag] = useState("All");
  const [maxPrice, setMaxPrice] = useState(maxDishPrice);
  const [sort, setSort] = useState("featured");
  const filtered = dishes
    .filter(
      (d) =>
        (cat === "All" || d.category === cat) &&
        (tag === "All" || d.tags.includes(tag)) &&
        d.price <= maxPrice &&
        (q === "" ||
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.description.toLowerCase().includes(q.toLowerCase())),
    )
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return dishes.findIndex((dish) => dish.id === a.id) - dishes.findIndex((dish) => dish.id === b.id);
    });
  const hasActiveFilters = tag !== "All" || maxPrice !== maxDishPrice || sort !== "featured";

  return (
    <Layout>
      <section className="-mb-24 bg-[#0d0a08] px-5 pb-14 pt-10 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5a623]">
            Our kitchen
          </span>
          <h1 className="font-display text-5xl tracking-tight text-[#f04b3f] md:text-6xl">The Menu</h1>
          <p className="max-w-xl text-white/62">
            Curated daily by Chef Inês Almeida. Seasonal ingredients, considered plates.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-full border border-[#f52323]/20 bg-[#171210] py-3 pl-11 pr-4 text-sm text-white shadow-soft placeholder:text-white/45 focus:border-[#f52323] focus:outline-none"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm shadow-soft transition ${
                filtersOpen || hasActiveFilters
                  ? "bg-[#f52323] text-white"
                  : "bg-[#171210] text-white"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>

            {filtersOpen && (
              <div className="absolute right-0 z-20 mt-3 w-[min(22rem,calc(100vw-3rem))] rounded-[22px] border border-white/10 bg-[#211c1a] p-5 text-white shadow-elegant">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5a623]">
                    Sort by
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      ["featured", "Featured"],
                      ["rating", "Top rated"],
                      ["price-low", "Price low"],
                      ["price-high", "Price high"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSort(value)}
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          sort === value
                            ? "bg-[#f52323] text-white"
                            : "bg-white text-[#211c1a] hover:bg-[#f52323] hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5a623]">
                    Tags
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["All", ...allTags].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTag(value)}
                        className={`rounded-full px-3 py-2 text-sm transition ${
                          tag === value
                            ? "bg-[#f52323] text-white"
                            : "bg-white text-[#211c1a] hover:bg-[#f52323] hover:text-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="mt-5 block">
                  <span className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.24em] text-[#f5a623]">
                    Max price
                    <span>${maxPrice}</span>
                  </span>
                  <input
                    type="range"
                    min="10"
                    max={maxDishPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="mt-3 w-full accent-[#f52323]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setTag("All");
                    setMaxPrice(maxDishPrice);
                    setSort("featured");
                  }}
                  className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                cat === c
                  ? "bg-[#f52323] text-white shadow-soft"
                  : "border border-white/10 bg-[#171210] text-white/72 hover:border-[#f52323]/45 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <DishCard key={d.id} dish={d} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No dishes match your search.</p>
        )}
        </div>
      </section>
    </Layout>
  );
}
