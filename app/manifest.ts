import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daily Wordle",
    short_name: "Wordle",
    description: "A local daily five-letter word puzzle.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f7f2",
    theme_color: "#3f7d52",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
