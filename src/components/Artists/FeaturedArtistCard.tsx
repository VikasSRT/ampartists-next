import React, { useState } from "react";
import { MapPin, Users, Music, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface FeaturedArtist {
  id: string;
  stageName: string;
  primaryGenre: string;
  performanceFormats: string[];
  city: string;
  country: string;
  startingFeeAED: number;
  rating: number;
  reviewCount: number;
  availability: "available" | "busy" | "unavailable";
  verified: boolean;
  heroImageUrl: string;
  bioTeaser: string;
  // Extended fields for featured artists
  pastVenues: string[];
  largestEventSize: number;
  musicStyles: string[];
  videoUrl?: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  totalPerformances: number;
}

interface FeaturedArtistCardProps {
  artist: FeaturedArtist;
  index?: number;
  onBookNowClick?: (artist: FeaturedArtist) => void;
}

export const FeaturedArtistCard = ({
  artist,
  index,
  onBookNowClick,
}: FeaturedArtistCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeEmbed, setActiveEmbed] = useState<
    "none" | "youtube" | "spotify" | "soundcloud"
  >("none");

  // Check if this is the second artist (The Bossa Project) - index 1
  const isBossaProject = index === 1;

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return "";
    const trackId = url.match(/(?:spotify\.com\/track\/)([^&\n?#]+)/)?.[1];
    return trackId ? `https://open.spotify.com/embed/track/${trackId}` : "";
  };

  const getSoundCloudEmbedUrl = (url: string) => {
    if (!url) return "";
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      url,
    )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  };

  const renderEmbed = () => {
    switch (activeEmbed) {
      case "youtube":
        return artist.videoUrl ? (
          <iframe
            src={getYouTubeEmbedUrl(artist.videoUrl)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null;
      case "spotify":
        return artist.spotifyUrl ? (
          <iframe
            src={getSpotifyEmbedUrl(artist.spotifyUrl)}
            className="w-full h-full"
            allow="encrypted-media"
          />
        ) : null;
      case "soundcloud":
        return artist.soundcloudUrl ? (
          <iframe
            src={getSoundCloudEmbedUrl(artist.soundcloudUrl)}
            className="w-full h-full"
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Artist Image/Embed Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {activeEmbed !== "none" ? (
          renderEmbed()
        ) : (
          <>
            <img
              src={
                isBossaProject
                  ? "/lovable-uploads/7ec8225a-ea09-4565-babe-2448f52523ae.png"
                  : "/lovable-uploads/7b68913d-2446-4c0e-9d1c-db8ba157c059.png"
              }
              alt={isBossaProject ? "The Bossa Project" : artist.stageName}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {artist.verified && (
            <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground"
          >
            {isBossaProject ? "Bossa Nova" : "Reggae"}
          </Badge>
        </div>

        {/* Close embed button */}
        {activeEmbed !== "none" && (
          <button
            onClick={() => setActiveEmbed("none")}
            className="absolute top-4 right-4 w-8 h-8 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-black z-10"
          >
            ×
          </button>
        )}
      </div>

      <CardContent className="p-[24px]">
        {/* Artist Info */}
        <div className="mb-4">
          <CardTitle className="text-xl mb-2">
            {isBossaProject ? "The Bossa Project" : "Jam Rebel"}
          </CardTitle>

          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {artist.city}, {artist.country}
            </span>
          </div>

          <CardDescription className="text-sm leading-relaxed">
            {isBossaProject
              ? "The Bossa Project blends Brazilian rhythms with jazz and pop, creating a sophisticated and soulful sound."
              : "Fusing reggae, rock, and funk into an electrifying sound that moves your soul."}
          </CardDescription>
        </div>

        {/* Music Styles */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Music Styles:
          </p>
          <div className="flex flex-wrap gap-1">
            {(isBossaProject
              ? ["Bossa Nova", "Brazilian", "Latin Jazz", "Smooth", "Lounge"]
              : ["Reggae", "Upbeat", "Dance", "High Energy"]
            )?.map((style) => (
              <Badge key={style} variant="outline" className="text-xs">
                {style}
              </Badge>
            ))}
          </div>
        </div>

        {/* Past Venues */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Performed At:
          </p>
          <div className="text-sm text-foreground">
            {isBossaProject
              ? "Brazilian Music Night at Zero Gravity, Dubai Marina."
              : "Sunset Reggae at The Fridge Warehouse, Alserkal Avenue, Dubai."}
          </div>
        </div>

        {/* Music Links */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">Listen:</span>
            <div className="flex gap-1">
              {artist?.videoUrl && (
                <a
                  href={artist?.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-6 h-6 rounded hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/youtube-icon.png"
                    alt="YouTube"
                    className="w-full h-full object-contain"
                  />
                </a>
              )}
              {artist.spotifyUrl && (
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Spotify"
                  className="w-6 h-6 rounded hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/spotify-icon.png"
                    alt="Spotify"
                    className="w-full h-full object-contain"
                  />
                </a>
              )}
              {artist.soundcloudUrl && (
                <a
                  href={artist.soundcloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="SoundCloud"
                  className="w-6 h-6 rounded hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/soundcloud-icon.png"
                    alt="SoundCloud"
                    className="w-full h-full object-contain"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Centered Book Now Button */}
          <div className="flex justify-center">
            <Button
              size="sm"
              className="px-6"
              onClick={() => onBookNowClick?.(artist)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
