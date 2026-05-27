import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/features/menu/MenuPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu/")({
  component: MenuPage,
  head: () =>
    seo({
      title: "Menu",
      description:
        "Browse Maison Olive's menu of truffle pasta, wagyu burgers, wood-fired pizza, garden bowls, salmon, and desserts.",
      path: "/menu",
    }),
});
