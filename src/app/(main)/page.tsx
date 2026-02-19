import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
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

async function getCmsData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/cms/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch CMS data:", res.status, res.statusText);
      return {};
    }
    const data = await res.json();
    return data?.data || data || {};
  } catch (error) {
    console.error("Error fetching CMS data:", error);
    return {};
  }
}

export default async function Page() {
  const cmsInfo = await getCmsData();
  return <Home initialCmsInfo={cmsInfo} />;
}
