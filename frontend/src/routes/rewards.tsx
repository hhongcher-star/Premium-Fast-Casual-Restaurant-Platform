import { createFileRoute } from "@tanstack/react-router";
import { RewardsPage } from "@/features/rewards/RewardsPage";

export const Route = createFileRoute("/rewards")({
  component: RewardsPage,
  head: () => ({ meta: [{ title: "Rewards — Maison Olive" }] }),
});
