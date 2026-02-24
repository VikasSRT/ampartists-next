import Artist from "@/views/Artist/Artist";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Artists - AMP Artists Live",
  description: "Browse and book from our curated list of artists.",
};

export const revalidate = 300;

async function getArtists() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}customer/artists-list/`,
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

  return (
    <Suspense fallback={null}>
      <Artist initialArtists={artists} />
    </Suspense>
  );
}
