import SingleArtistPage from "@/pages/singleArtist/SingleArtistPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getArtist(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}customer/artist/${id}/`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error(
        "Failed to fetch artist data:",
        res.status,
        res.statusText,
        `${process.env.NEXT_PUBLIC_API_URL}customer/artist/${id}/`,
      );
      return null;
    }
    const data = await res.json();
    return data?.data || data || null;
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artist = await getArtist(id);

  if (!artist) {
    return {
      title: "Artist Not Found - AMP Artists Live",
      description: "The requested artist could not be found.",
    };
  }

  return {
    title: `${artist.stage_name} - AMP Artists Live`,
    description:
      artist.biography?.substring(0, 160) ||
      `Book ${artist.stage_name} for your next event.`,
    openGraph: {
      title: `${artist.stage_name} - AMP Artists Live`,
      description:
        artist.biography?.substring(0, 160) ||
        `Book ${artist.stage_name} for your next event.`,
      images: artist.profile_image ? [artist.profile_image] : [],
    },
  };
}

export default async function SingleArtistRoute({ params }: Props) {
  const { id } = await params;
  const artistInfo = await getArtist(id);

  return <SingleArtistPage initialArtistInfo={artistInfo} />;
}
