import Artist from "@/pages/Artist/Artist";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists - AMP Artists Live",
  description: "Browse and book from our curated list of artists.",
};

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Artist />
    </Suspense>
  );
}
