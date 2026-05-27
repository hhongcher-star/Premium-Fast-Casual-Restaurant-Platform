import { createFileRoute } from "@tanstack/react-router";
import { MenuDetailPage } from "@/features/menu/MenuDetailPage";
import { dishes } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu/$id")({
  component: MenuDetailRoute,
  head: ({ params }) => {
    const dish = dishes.find((item) => item.id === params.id);

    return seo({
      title: dish ? dish.name : "Menu Item",
      description: dish
        ? `${dish.description} Order ${dish.name} from Maison Olive.`
        : "View Maison Olive menu item details, pricing, preparation time, and reviews.",
      path: `/menu/${params.id}`,
      image: dish?.image,
    });
  },
});

function MenuDetailRoute() {
  const { id } = Route.useParams();

  return <MenuDetailPage id={id} />;
}
