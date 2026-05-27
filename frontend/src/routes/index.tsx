import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home/HomePage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    seo({
      title: "Order, Reserve, Indulge",
      description:
        "Discover Maison Olive's chef-led menu, reserve a table, order ahead, and join rewards for modern fast-casual dining.",
      path: "/",
    }),
});
