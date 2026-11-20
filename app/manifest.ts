import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EstatePro",
    short_name: "EstatePro",
    description:
      "Frontend real estate demo for property discovery across Pakistan markets.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#14243a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
