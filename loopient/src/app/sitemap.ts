import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/megoldasok", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/rolunk", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/kapcsolat", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/adatvedelem", priority: 0.2, changeFrequency: "yearly" as const },
  ].map(({ path, ...rest }) => ({ url: `${site.url}${path === "/" ? "" : path}`, lastModified, ...rest }));
}
