import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strivio Tech" },
      { name: "description", content: "Strivio Tech builds focused SaaS products that solve real industry problems. Based in Bengaluru, India." },
      { property: "og:title", content: "Strivio Tech" },
      { property: "og:description", content: "Focused SaaS products built for real problems. Made in India." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f5c518'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' dominant-baseline='middle' font-family='Space Grotesk, sans-serif' font-weight='700' font-size='20' fill='%23000'%3ES%3C/text%3E%3C/svg%3E",
      },
    ],
  }),
  component: LandingPage,
});
