import { createFileRoute } from "@tanstack/react-router";
import { RewardsPage } from "@/features/rewards/RewardsPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/rewards")({
  component: RewardsPage,
  head: () =>
    seo({
      title: "Rewards",
      description: "Join Maison Olive rewards to earn dining perks, member offers, and exclusive seasonal benefits.",
      path: "/rewards",
    }),
});
