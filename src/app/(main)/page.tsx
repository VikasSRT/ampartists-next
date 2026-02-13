import Home from "@/pages/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AMP Artists Live",
  description:
    "Discover and book artists effortlessly with AMP, the first artist-driven music booking platform.",
  keywords: "artist booking, music booking, artist platform",
};

export default function HomePage() {
  return <Home />;
}
