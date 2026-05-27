type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  robots?: string;
};

const siteName = "Maison Olive";
const siteUrl = "https://maisonolive.com";
const defaultImage = "/assets/restaurant-C3Fpgp81.jpg";

export function seo({ title, description, path = "/", image = defaultImage, robots }: SeoInput) {
  const canonical = `${siteUrl}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      ...(robots ? [{ name: "robots", content: robots }] : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
