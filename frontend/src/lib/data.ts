import burger from "@/assets/dish-burger.jpg";
import salad from "@/assets/dish-salad.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import salmon from "@/assets/dish-salmon.jpg";
import pasta from "@/assets/hero-dish.jpg";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  calories: number;
  prepTime: string;
  tags: string[];
  sizes?: {
    name: string;
    price: number;
  }[];
};

export const dishes: Dish[] = [
  {
    id: "truffle-pasta",
    name: "Black Truffle Tagliolini",
    description:
      "Hand-cut tagliolini tossed in aged parmesan butter and finished with shaved black winter truffle from Alba.",
    price: 32,
    image: pasta,
    category: "Mains",
    rating: 4.9,
    reviews: 842,
    calories: 720,
    prepTime: "18 min",
    tags: ["Signature", "Vegetarian"],
  },
  {
    id: "wagyu-burger",
    name: "Wagyu Smash Burger",
    description:
      "A5 wagyu patty, smoked gruyère, bone-marrow aioli and caramelised shallot jam on a brioche bun.",
    price: 24,
    image: burger,
    category: "Mains",
    rating: 4.8,
    reviews: 1203,
    calories: 880,
    prepTime: "14 min",
    tags: ["Bestseller"],
    sizes: [
      { name: "Regular", price: 24 },
      { name: "Large", price: 28 },
      { name: "Family", price: 42 },
    ],
  },
  {
    id: "harvest-bowl",
    name: "Harvest Garden Bowl",
    description:
      "Charred heirloom vegetables, sprouted grains, miso vinaigrette and a soft-poached farm egg.",
    price: 18,
    image: salad,
    category: "Bowls",
    rating: 4.7,
    reviews: 612,
    calories: 540,
    prepTime: "10 min",
    tags: ["Vegan", "Gluten-free"],
  },
  {
    id: "wood-pizza",
    name: "Wood-Fired Margherita",
    description: "72-hour fermented dough, San Marzano tomato, fior di latte and Genovese basil.",
    price: 21,
    image: pizza,
    category: "Pizza",
    rating: 4.8,
    reviews: 974,
    calories: 690,
    prepTime: "12 min",
    tags: ["Vegetarian"],
    sizes: [
      { name: "Regular", price: 21 },
      { name: "Large", price: 26 },
      { name: "Family", price: 38 },
    ],
  },
  {
    id: "salmon",
    name: "Cedar-Plank Salmon",
    description: "Sustainably sourced salmon, miso-honey glaze, herb oil and seasonal greens.",
    price: 28,
    image: salmon,
    category: "Mains",
    rating: 4.9,
    reviews: 521,
    calories: 610,
    prepTime: "16 min",
    tags: ["Gluten-free"],
  },
  {
    id: "lava-cake",
    name: "Molten Valrhona Cake",
    description: "Warm 70% chocolate fondant, gold leaf, smoked vanilla cream and wild berries.",
    price: 14,
    image: dessert,
    category: "Desserts",
    rating: 5.0,
    reviews: 1488,
    calories: 480,
    prepTime: "9 min",
    tags: ["Signature"],
  },
];

export const categories = ["All", "Mains", "Bowls", "Pizza", "Desserts"];
