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

function buildArtistDescription(artist: any) {
  const base =
    artist?.biography ||
    `Book ${artist?.stage_name} for your next event with AMP Artists Live.`;

  if (base?.length <= 160) return base;

  const truncated = base?.slice(0, 157);
  const lastSpaceIndex = truncated?.lastIndexOf(" ");

  return (
    (lastSpaceIndex > 0 ? truncated?.slice(0, lastSpaceIndex) : truncated) +
    "..."
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artist = await getArtist(id);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.ampartists.com";
  const artistUrl = `${siteUrl}/artists/${id}`;

  if (!artist) {
    return {
      title: "Artist Not Found - AMP Artists Live",
      description: "The requested artist could not be found.",
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: artistUrl,
      },
    };
  }

  const title = `${artist?.stage_name} - AMP Artists Live`;
  const description = buildArtistDescription(artist);

  const profileImageUrl = artist.profile_image
    ? artist?.profile_image?.startsWith("http")
      ? artist?.profile_image
      : `${siteUrl}${artist?.profile_image}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: artistUrl,
    },
    openGraph: {
      title,
      description,
      url: artistUrl,
      siteName: "AMP Artists Live",
      type: "profile",
      images: profileImageUrl
        ? [
            {
              url: profileImageUrl,
              alt: `${artist?.stage_name} profile photo`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: profileImageUrl ? [profileImageUrl] : [],
    },
  };
}

export default async function SingleArtistRoute({ params }: Props) {
  const { id } = await params;
  const artistInfo = await getArtist(id);

  return <SingleArtistPage initialArtistInfo={artistInfo} />;
}
