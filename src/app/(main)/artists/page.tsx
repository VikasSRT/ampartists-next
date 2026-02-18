import Artist from "@/pages/Artist/Artist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists - AMP Artists Live",
  description: "Browse and book from our curated list of artists.",
};

async function getArtists() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}customer/artists-list/`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error(
        "Failed to fetch artists data:",
        res.status,
        res.statusText,
      );
      return [];
    }
    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    }

    return data?.data || [];
  } catch (error) {
    console.error("Error fetching artists data:", error);
    return [];
  }
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return <Artist initialArtists={artists} />;
}
