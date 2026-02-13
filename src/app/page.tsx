import Home from "@/pages/Home/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AMP - Artist-Owned Booking Platform",
  description:
    "Discover and book artists effortlessly with AMP, the first artist-driven music booking platform. Simplify entertainment from discovery to deal.",
  keywords:
    "artist booking, music booking, artist platform, entertainment booking, AMP booking",
  openGraph: {
    title: "AMP - Artist-Owned Booking Platform",
    description:
      "Discover and book artists effortlessly with AMP, the first artist-driven music booking platform. Simplify entertainment from discovery to deal.",
    type: "website",
    url: "https://ampartists.live/",
  },
  robots: "index, follow",
};

export default function Page() {
  return <Home />;
}
