import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Filter,
  GripVertical,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import burgerImage from "@/assets/dish-burger.jpg";
import dessertImage from "@/assets/dish-dessert.jpg";
import pizzaImage from "@/assets/dish-pizza.jpg";
import saladImage from "@/assets/dish-salad.jpg";
import pastaImage from "@/assets/pizza.jpg";
import sauceImage from "@/assets/burger.jpg";

const tabs = ["All Items", "Burgers", "Pizza", "Pasta", "Salads", "Desserts", "Drinks", "Sides", "Sauces"];

const menuItems = [
  {
    name: "Wagyu Smash Burger",
    tag: "Bestseller",
    description: "A5 wagyu patty, smoked gruyere, caramelised shallot jam, aioli, brioche bun.",
    category: "Burgers",
    price: "$24.00",
    status: "Active",
    popularity: "4.8 (1203)",
    image: burgerImage,
  },
  {
    name: "Truffle Pasta",
    description: "Fresh tagliatelle, black truffle, parmesan, cream sauce.",
    category: "Pasta",
    price: "$18.00",
    status: "Active",
    popularity: "4.7 (856)",
    image: pastaImage,
  },
  {
    name: "Margherita Pizza",
    description: "San marzano tomato sauce, fior di latte, fresh basil, extra virgin olive oil.",
    category: "Pizza",
    price: "$16.00",
    status: "Active",
    popularity: "4.6 (742)",
    image: pizzaImage,
  },
  {
    name: "Quinoa Salad",
    description: "Quinoa, cherry tomatoes, cucumber, avocado, lemon vinaigrette.",
    category: "Salads",
    price: "$14.00",
    status: "Active",
    popularity: "4.5 (512)",
    image: saladImage,
  },
  {
    name: "Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream.",
    category: "Desserts",
    price: "$8.00",
    status: "Active",
    popularity: "4.9 (921)",
    image: dessertImage,
  },
  {
    name: "Fresh Lemonade",
    description: "House-made lemonade with mint.",
    category: "Drinks",
    price: "$4.50",
    status: "Active",
    popularity: "4.4 (320)",
    image: sauceImage,
  },
  {
    name: "Spicy Aioli",
    description: "Maison Olive signature spicy aioli sauce.",
    category: "Sauces",
    price: "$1.50",
    status: "Inactive",
    popularity: "4.2 (112)",
    image: sauceImage,
  },
];

export function MenuManagerPage() {
  return (
    <div id="menu" className="space-y-7">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-7 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="font-display text-[32px] font-semibold leading-tight tracking-normal text-white">
            Menu Manager
          </h1>
          <p className="mt-2 text-sm text-[#c6bbae]">Manage your restaurant menu, items, and categories.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="admin-toolbar-button">
            <Download size={17} />
            <span>Import</span>
          </button>
          <button className="admin-primary-button">
            <Plus size={18} />
            <span>Add Menu Item</span>
          </button>
        </div>
      </header>

      <section className="grid gap-3 xl:grid-cols-[1fr_222px_202px_118px]">
        <label className="menu-search">
          <Search size={20} />
          <input type="search" placeholder="Search menu items..." />
          <Search size={19} />
        </label>
        <FilterButton label="All Categories" />
        <FilterButton label="All Status" />
        <button className="menu-filter-button">
          <Filter size={17} />
          <span>Filter</span>
        </button>
      </section>

      <section className="menu-table-card">
        <div className="flex items-center justify-between overflow-x-auto border-b border-white/10 px-4">
          <div className="flex min-w-max gap-6">
            {tabs.map((tab, index) => (
              <button key={tab} className={index === 0 ? "menu-tab menu-tab-active" : "menu-tab"}>
                {tab}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 pl-6 text-xs text-[#b9b0a4] lg:flex">
            <span>Drag to reorder</span>
            <SlidersHorizontal size={14} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="border-b border-white/8 text-xs font-medium text-[#c0b5a8]">
              <tr>
                <th className="w-[42%] px-5 py-4 font-medium">Item</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Popularity</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {menuItems.map((item) => (
                <tr key={item.name} className="transition hover:bg-white/[0.025]">
                  <td className="px-5 py-3">
                    <div className="grid grid-cols-[22px_82px_1fr] items-center gap-4">
                      <GripVertical size={18} className="text-[#6f685e]" />
                      <img src={item.image} alt={item.name} className="h-[76px] w-[82px] rounded-lg object-cover" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-semibold text-white">{item.name}</h2>
                          {item.tag && <span className="menu-tag">{item.tag}</span>}
                        </div>
                        <p className="mt-1 max-w-[390px] text-sm leading-5 text-[#c4baae]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#d7cfc4]">{item.category}</td>
                  <td className="px-4 py-3 font-medium text-white">{item.price}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[#d7cfc4]">
                      <Star size={15} className="fill-[#f2a51d] text-[#f2a51d]" />
                      {item.popularity}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <IconButton label="Edit">
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton label="Duplicate">
                        <Copy size={16} />
                      </IconButton>
                      <IconButton label="More">
                        <MoreVertical size={16} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/8 px-5 py-3 text-sm text-[#c4baae] sm:flex-row sm:items-center sm:justify-between">
          <span>Showing 1 to 7 of 24 items</span>
          <div className="flex items-center gap-2">
            <PaginationButton>
              <ChevronLeft size={16} />
            </PaginationButton>
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>
            <span className="px-2">...</span>
            <PaginationButton>6</PaginationButton>
            <PaginationButton>
              <ChevronRight size={16} />
            </PaginationButton>
          </div>
        </footer>
      </section>
    </div>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="menu-select-button">
      <span>{label}</span>
      <ChevronDown size={16} />
    </button>
  );
}

function StatusPill({ status }: { status: string }) {
  const active = status === "Active";

  return (
    <span className={active ? "status-pill status-active" : "status-pill status-inactive"}>
      <span />
      {status}
    </span>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button className="menu-icon-button" aria-label={label} title={label}>
      {children}
    </button>
  );
}

function PaginationButton({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <button className={active ? "pagination-button pagination-active" : "pagination-button"}>{children}</button>;
}
