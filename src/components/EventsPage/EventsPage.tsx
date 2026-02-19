"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Music,
  Zap,
  Search,
  CheckCircle,
} from "lucide-react";
import youtubeIcon from "../../assets/images/youtube-icon.png";
import spotifyIcon from "../../assets/images/spotify-icon.png";
import soundcloudIcon from "../../assets/images/soundcloud-icon.png";
import corporateHero from "../../assets/images/corporate-hero.jpg";
import beachClubHero from "../../assets/images/BeachClubs.png";
import weddingHero from "../../assets/images/weddings.png";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useArtists } from "../../hooks/useArtists";
import { FeaturedArtistCard } from "../Artists/FeaturedArtistCard";
import { VenueSlider } from "../VenueSlider/VenueSlider";
import { FacetDrawer } from "../Artists/FacetDrawer";
import { ConsultationDialog } from "../ui/ConsultationDialog";
import { BookingDialog } from "../ui/BookingDialog";

const eventTypes = {
  weddings: {
    title: "Weddings with AMP",
    subtitle: "Perfect performers for your special day",
    description:
      "Transform your wedding into an unforgettable celebration with our curated selection of talented artists who specialize in creating magical moments.",
    venues: [
      "Four Seasons Resort",
      "Atlantis The Palm",
      "Burj Al Arab",
      "Emirates Palace",
    ],
    benefits: [
      {
        icon: Music,
        title: "Diverse Repertoire",
        description: "From romantic ballads to energetic dance music",
      },
      {
        icon: Star,
        title: "Premium Quality",
        description: "Verified artists with 5-star ratings",
      },
      {
        icon: Calendar,
        title: "Flexible Scheduling",
        description: "Available for ceremonies and receptions",
      },
      {
        icon: Users,
        title: "Guest Engagement",
        description: "Interactive performances that captivate audiences",
      },
    ],
    heroImage: weddingHero,
    heroGradient: "from-black/60 via-black/40 to-transparent",
  },
  corporate: {
    title: "Corporate Event Artists",
    subtitle: "Professional entertainment for business events",
    description:
      "Elevate your corporate gatherings with sophisticated performers who understand the art of professional entertainment.",
    venues: ["DIFC", "World Trade Centre", "Emirates Towers", "Conrad Dubai"],
    benefits: [
      {
        icon: Zap,
        title: "Professional Excellence",
        description: "Polished performances for discerning audiences",
      },
      {
        icon: Star,
        title: "Brand Enhancement",
        description: "Artists who align with your company values",
      },
      {
        icon: Calendar,
        title: "Punctual Service",
        description: "Reliable timing for business schedules",
      },
      {
        icon: Users,
        title: "Networking Boost",
        description: "Entertainment that facilitates connections",
      },
    ],
    heroImage: corporateHero,
    heroGradient: "from-black/60 via-black/40 to-transparent",
  },
  "beach-clubs": {
    title: "Beach Club Artists",
    subtitle: "Vibrant performers for coastal venues",
    description:
      "Create the perfect beach atmosphere with artists who bring energy and style to waterfront celebrations.",
    venues: ["Zero Gravity", "Nikki Beach", "Barasti Beach", "Club Vista Mare"],
    benefits: [
      {
        icon: Music,
        title: "Beach Vibes",
        description: "Tropical and upbeat musical selections",
      },
      {
        icon: Star,
        title: "Weather Ready",
        description: "Experienced in outdoor performances",
      },
      {
        icon: MapPin,
        title: "Coastal Expertise",
        description: "Specialized in waterfront entertainment",
      },
      {
        icon: Users,
        title: "Crowd Energizers",
        description: "Artists who create infectious energy",
      },
    ],
    heroImage: beachClubHero,
    heroGradient: "from-black/60 via-black/40 to-transparent",
  },
  advertising: {
    title: "Advertising Artists",
    subtitle: "Creative talent for brand campaigns",
    description:
      "Amplify your brand message with talented artists who specialize in advertising, product launches, and promotional events.",
    venues: ["Dubai Mall", "Mall of Emirates", "City Walk", "La Mer"],
    benefits: [
      {
        icon: Zap,
        title: "Brand Awareness",
        description: "Artists who make your message memorable",
      },
      {
        icon: Star,
        title: "Professional Image",
        description: "Polished performers for brand representation",
      },
      {
        icon: Music,
        title: "Custom Content",
        description: "Tailored performances for your campaign",
      },
      {
        icon: Users,
        title: "Audience Engagement",
        description: "Connect with your target demographics",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop",
    heroGradient: "from-black/70 via-black/50 to-transparent",
  },
  "tv-film": {
    title: "TV & Film Artists",
    subtitle: "Professional talent for screen productions",
    description:
      "Discover exceptional artists perfect for television and film productions, bringing authenticity and talent to your visual storytelling.",
    venues: [
      "Dubai Studio City",
      "ImageNation",
      "Pinewood Studios",
      "Dubai Media City",
    ],
    benefits: [
      {
        icon: Star,
        title: "Screen Ready",
        description: "Experienced in television and film work",
      },
      {
        icon: Zap,
        title: "Versatile Talent",
        description: "Adaptable to various production needs",
      },
      {
        icon: Music,
        title: "Authentic Performance",
        description: "Natural on-camera presence",
      },
      {
        icon: Users,
        title: "Professional Crew",
        description: "Reliable talent for productions",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop",
    heroGradient: "from-black/70 via-black/50 to-transparent",
  },
  concerts: {
    title: "Concert Artists",
    subtitle: "Headliners for unforgettable shows",
    description:
      "Book world-class artists for concerts and music festivals that create unforgettable experiences for music lovers.",
    venues: [
      "Dubai Opera",
      "Coca-Cola Arena",
      "Autism Rocks Arena",
      "Dubai Festival City",
    ],
    benefits: [
      {
        icon: Music,
        title: "Chart-Toppers",
        description: "Popular artists with proven track records",
      },
      {
        icon: Star,
        title: "Stadium Ready",
        description: "Experienced in large venue performances",
      },
      {
        icon: Zap,
        title: "High Energy",
        description: "Artists who command the stage",
      },
      {
        icon: Users,
        title: "Fan Favorites",
        description: "Artists with dedicated followings",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop",
    heroGradient: "from-black/70 via-black/50 to-transparent",
  },
  "bars-nightclubs": {
    title: "Bars & Nightclub Artists",
    subtitle: "Electrifying performers for nightlife venues",
    description:
      "Transform your venue into the hottest destination with artists who know how to keep the energy high all night long.",
    venues: ["White Dubai", "Zero Gravity", "Soho Garden", "Base Dubai"],
    benefits: [
      {
        icon: Music,
        title: "Nightlife Specialists",
        description: "Artists who understand club dynamics",
      },
      {
        icon: Star,
        title: "Crowd Control",
        description: "Masters at reading and energizing rooms",
      },
      {
        icon: Zap,
        title: "Late Night Energy",
        description: "High-energy performances until dawn",
      },
      {
        icon: Users,
        title: "Party Atmosphere",
        description: "Creates unforgettable nightlife experiences",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop",
    heroGradient: "from-purple-900/70 via-blue-900/50 to-transparent",
  },
  "corporate-private-events": {
    title: "Corporate & Private Event Artists",
    subtitle: "Sophisticated entertainment for exclusive gatherings",
    description:
      "Elevate your corporate functions and private celebrations with refined artists who deliver memorable performances for discerning audiences.",
    venues: [
      "Burj Al Arab",
      "Emirates Palace",
      "Address Downtown",
      "One&Only The Palm",
    ],
    benefits: [
      {
        icon: Star,
        title: "Exclusive Talent",
        description: "Premium artists for high-end events",
      },
      {
        icon: Zap,
        title: "Sophisticated Style",
        description: "Refined performances for elite gatherings",
      },
      {
        icon: Music,
        title: "Versatile Repertoire",
        description: "Adaptable to various event styles",
      },
      {
        icon: Users,
        title: "VIP Treatment",
        description: "White-glove service and professionalism",
      },
    ],
    heroImage: corporateHero,
    heroGradient: "from-black/70 via-black/50 to-transparent",
  },
};

const EventType = () => {
  const params = useParams();
  const eventType = params?.eventType as string;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingDialog, setBookingDialog] = useState<{
    isOpen: boolean;
    artistName: string;
  }>({
    isOpen: false,
    artistName: "",
  });
  const [consultationDialog, setConsultationDialog] = useState({
    isOpen: false,
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 50000],
    dateRange: null,
    eventTypes: [eventType || ""],
    genres: [],
  });
  const config =
    eventTypes[eventType as keyof typeof eventTypes] || eventTypes.weddings;
  const { data: allArtists, isLoading } = useArtists({
    searchQuery,
    filters: {
      ...filters,
      eventTypes: [eventType || ""],
    },
    sortBy: "relevance",
  });

  // Mock extended data for featured artists (in real app, this would come from API)
  const featuredArtists =
    allArtists?.slice(0, 6).map((artist) => ({
      ...artist,
      availability: "available" as const,
      // Convert to the expected format
      pastVenues:
        eventType === "weddings"
          ? ["Four Seasons Resort", "Atlantis The Palm", "Emirates Palace"]
          : eventType === "corporate"
            ? [
                "DIFC Conference Centre",
                "World Trade Centre",
                "Emirates Towers",
              ]
            : ["Zero Gravity", "Nikki Beach", "Barasti Beach"],
      largestEventSize: Math.floor(Math.random() * 2000) + 500,
      musicStyles:
        eventType === "weddings"
          ? ["Romantic Ballads", "Jazz", "Pop Covers", "First Dance"]
          : eventType === "corporate"
            ? ["Jazz", "Ambient", "Corporate Pop", "Instrumental"]
            : ["Beach House", "Deep House", "Tropical", "Upbeat Pop"],
      videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      // Mock YouTube URL
      spotifyUrl: `https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`,
      // Mock Spotify URL
      soundcloudUrl: `https://soundcloud.com/artist/track`,
      // Mock SoundCloud URL
      totalPerformances: Math.floor(Math.random() * 200) + 50,
    })) || [];
  // const clearFilter = (filterKey: string, value: any = null) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [filterKey]:
  //       filterKey === "eventTypes"
  //         ? prev.eventTypes.filter((t) => t !== value)
  //         : filterKey === "genres"
  //         ? prev.genres.filter((g) => g !== value)
  //         : filterKey === "location"
  //         ? ""
  //         : filterKey === "priceRange"
  //         ? [0, 50000]
  //         : null,
  //   }));
  // };
  // const clearAllFilters = () => {
  //   setFilters({
  //     location: "",
  //     priceRange: [0, 50000],
  //     dateRange: null,
  //     eventTypes: [eventType || ""],
  //     genres: [],
  //   });
  //   setSearchQuery("");
  // };

  const openBookingDialog = (artistName: string) => {
    setBookingDialog({ isOpen: true, artistName });
  };

  const closeBookingDialog = () => {
    setBookingDialog({ isOpen: false, artistName: "" });
  };

  const openConsultationDialog = () => {
    setConsultationDialog({ isOpen: true });
  };

  const closeConsultationDialog = () => {
    setConsultationDialog({ isOpen: false });
  };

  useEffect(() => {
    const html = document.querySelector("html");

    html?.classList.add("event-page");

    return () => {
      html?.classList.remove("event-page");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-muted/10">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={config.heroImage}
            alt={`${config.title} background`}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${config.heroGradient}`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6 drop-shadow-lg leading-tight">
              {config.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-md px-4">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      {/* Venue Slider Section - Hide for beach-clubs */}
      {eventType !== "beach-clubs" && <VenueSlider />}

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Why Choose AMP?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto px-4 mb-4">
              AMP is your trusted online platform that seamlessly connects
              artists with bookers and venues. We handle the entire booking
              process from start to finish, taking care of all technical and
              hospitality requirements so you can focus on what matters most -
              enjoying exceptional live performances without any headaches.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Experience excellence with our curated selection of premium
              performers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {config?.benefits?.map((benefit, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="mb-4 sm:mb-6 hey">
                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {isLoading ? (
          <div className="space-y-12">
            {eventType === "weddings" ? (
              // Loading state for wedding categories
              Array.from({ length: 3 }).map((_, sectionIndex) => (
                <div key={sectionIndex} className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
                    <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-muted rounded-2xl aspect-[4/3] mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-16 bg-muted rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Loading state for other event types
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {Array.from({ length: 6 })?.map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-2xl aspect-[4/3] mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-16 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : eventType === "weddings" ? (
          // Wedding categories
          <div className="space-y-16">
            {/* Live Wedding Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Live Wedding Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Professional live bands specializing in wedding ceremonies and
                  receptions, creating the perfect soundtrack for your special
                  day
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(0, 2)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* Cover Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Cover Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Talented cover bands that bring your favorite hits to life,
                  ensuring every guest finds something they love on the dance
                  floor
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(2, 4)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* Book your favorite artists from back home */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Book Your Favorite Artists from Back Home
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Connect with artists from your home country or culture to add
                  a personal touch that reflects your heritage and traditions
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(4, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "advertising" ? (
          // Advertising categories
          <div className="space-y-16">
            {/* Appearances */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Appearances
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Professional artists for brand appearances, product launches,
                  and promotional events that create memorable advertising
                  moments
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* Jingles */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Jingles</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Expert musicians and composers who create catchy jingles and
                  commercial music that make brands unforgettable
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(3, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "tv-film" ? (
          // TV & Film categories
          <div className="space-y-16">
            {/* TV */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">TV</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Talented artists perfect for television productions, talk
                  shows, and broadcast entertainment with camera-ready
                  performances
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* Film */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Film</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Professional musicians and performers for movie soundtracks,
                  film scores, and cinematic productions
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(3, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "concerts" ? (
          // Concert categories
          <div className="space-y-16">
            {/* Live Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Live Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Electrifying live bands that deliver powerful concert
                  experiences with exceptional stage presence and crowd
                  engagement
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* DJs */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">DJs</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  World-class DJs who create unforgettable concert experiences
                  with seamless mixing and crowd-moving beats
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(3, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "bars-nightclubs" ? (
          // Bars & Nightclubs categories
          <div className="space-y-16">
            {/* Live Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Live Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Dynamic live bands that bring energy to bars and nightclubs
                  with interactive performances and party atmosphere
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* DJs */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">DJs</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Professional DJs who keep the nightlife alive with perfect
                  track selection and infectious energy all night long
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(3, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "corporate-private-events" ? (
          // Corporate & Private Events categories
          <div className="space-y-16">
            {/* Live Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Live Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Professional live bands perfect for corporate functions,
                  private parties, and special occasions with versatile
                  repertoires
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>

            {/* DJs */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">DJs</h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Sophisticated DJs who provide the perfect soundtrack for
                  corporate events and private celebrations with professional
                  service
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.slice(3, 6)?.map((artist) => (
                  <FeaturedArtistCard
                    key={artist?.id}
                    artist={artist}
                    onBookNowClick={() => openBookingDialog("Jam Rebel")}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : eventType === "beach-clubs" ? (
          // Beach Clubs categories
          <div className="space-y-16">
            {/* Live Bands */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Live Bands
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Dynamic live bands that bring energy and tropical vibes
                  perfect for beach club atmospheres and seaside entertainment
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Jam Rebel */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/7b68913d-2446-4c0e-9d1c-db8ba157c059.png"
                      alt="Jam Rebel"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Reggae
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://www.youtube.com/@jamrebelband"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={youtubeIcon}
                            alt="YouTube"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Jam Rebel</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Fusing reggae, rock, and funk into an electrifying sound
                        that moves your soul.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Reggae", "Upbeat", "Dance", "High Energy"].map(
                          (style) => (
                            <Badge
                              key={style}
                              variant="outline"
                              className="!text-[12px]"
                            >
                              {style}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Sunset Reggae at The Fridge Warehouse, Alserkal Avenue,
                        Dubai.
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Jam Rebel")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* The Bossa Project */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/7ec8225a-ea09-4565-babe-2448f52523ae.png"
                      alt="The Bossa Project"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Bossa Nova
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://www.instagram.com/reel/C_sxQHFsZAy/?locale=(URL%3AKTT.bet)%F0%9F%8E%81Interesting%2Bforest%2Bentertainment%2Bplatform%2Bofficial%2Bwebsite.cpme&hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={youtubeIcon}
                            alt="YouTube"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        The Bossa Project
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        The Bossa Project blends Brazilian rhythms with jazz and
                        pop, creating a sophisticated and soulful sound.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Bossa Nova",
                          "Brazilian",
                          "Latin Jazz",
                          "Smooth",
                          "Lounge",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Brazilian Music Night at Zero Gravity, Dubai Marina.
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("The Bossa Project")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Omire Music Duo */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/b185ef90-97cd-4fa3-a488-005975aa6ce7.png"
                      alt="Omire Music Duo"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Soul
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://www.youtube.com/@OmireDuo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={youtubeIcon}
                            alt="YouTube"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Omire Music Duo
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Omire Music Duo crafts an enchanting soundscape, weaving
                        together diverse genres with soulful vocals and
                        intricate instrumentals for a truly captivating
                        experience.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Live Duo",
                          "Versatile",
                          "Covers",
                          "Soul",
                          "Acoustic",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Artist Residency at Burj Al Arab 2024 & 2025
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Omire Music Duo")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Larry Arrarat */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/6d7a97ac-9e87-49e0-a45d-594d283fdb02.png"
                      alt="Larry Arrarat"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Marimba
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://open.spotify.com/artist/62r7xwyHgJ8knZRTe7LIys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={spotifyIcon}
                            alt="Spotify"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Larry Arrarat
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Larry Ararat is a Colombian electronic musician known
                        for producing contagious dance beats. He often
                        collaborates, creating vibrant and rhythmic tracks.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Marimba", "Latin", "Vibrant Beats", "Dance"].map(
                          (style) => (
                            <Badge
                              key={style}
                              variant="outline"
                              className="text-xs"
                            >
                              {style}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Seoul Latin Festival 2024
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Larry Arrarat")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 4TheMusic */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/0f0fb197-76b9-4d29-b3b5-f51f22e76784.png"
                      alt="4TheMusic"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Pop
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://open.spotify.com/artist/4oCTZqAcBsb9I407TEkLJG?si=d2qaTJuAQJO1CWwpFXOJtg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={spotifyIcon}
                            alt="Spotify"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">4TheMusic</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        4 The Music is a dynamic South African trio dazzling
                        Dubai and the Middle East with their versatile mix of
                        current hits, R&B, pop, and timeless classics, ensuring
                        an unforgettable live show.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Pop",
                          "R&B",
                          "Soul",
                          "Funk",
                          "Covers",
                          "Classic Hits",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Taste of Dubai & Abu Dhabi, Dubai Jazz Festival , opened
                        for Lionel Richie, HSBC Golf Championship
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("4TheMusic")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* El Saxo De Luis */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/62283778-5aca-413c-8f91-a27ae5522532.png"
                      alt="El Saxo De Luis"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Latin Jazz
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        El Saxo De Luis
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        El Saxo De Luis is a Colombian saxophonist and composer
                        based in Dubai. With over 20 years of experience, he
                        masterfully blends Latin music, electro, house, jazz,
                        and R&B.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Saxophonist",
                          "Lounge Sax",
                          "Latin Jazz",
                          "Jazz",
                          "R&B",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Played with Grammy-Winning International Bands,
                        Nominated for Latin Grammy
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("El Saxo De Luis")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dirty Backseat */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/f5e47f1b-1aa9-4bde-815e-049e154f2ae4.png"
                      alt="Dirty Backseat"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Lo-Fi
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Dirty Backseat
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Dirty Backseat, a Cairo-based project led by Moe Hani,
                        delivers electrifying lo-fi garage rock infused with
                        indie, post-punk, and electronic sounds, blending
                        English and Arabic lyrics.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Band-DJ duo",
                          "synth pop",
                          "Lo-Fi",
                          "Garage Rock",
                          "Indie",
                          "Gritty Sound",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Cairo Jazz Club, Casa Cook - El Gouna, SecenNoise
                        Events, On the Up Events
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Dirty Backseat")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Glass Onion */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/75bfa4a5-80dc-4b74-844c-ce72034bbb2b.png"
                      alt="Glass Onion"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Live Fusion Sets
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Glass Onion
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        The Glass Onion is Egypt's premier cover band,
                        passionately delivering electrifying Beatles classics
                        alongside rock, pop, and blues hits with energetic,
                        authentic sound.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Beatles Tribute",
                          "Classic Rock Covers",
                          "High-Energy",
                          "Sing-Along",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Cairo Opera House, Cairo Jazz Club, The British Embassy,
                        Biblioteca Alexandina Art Center, The Tap East
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Glass Onion")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chinua Hawk */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/5898cae6-d11c-459a-9b0b-3cd8f4aa674f.png"
                      alt="Chinua Hawk"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Jazz & Soul
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Chinua Hawk
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        A musical force. His raw talent and compelling artistry
                        shine through every performance. Ready to elevate your
                        event.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Jazz & Soul", "Hip Hop", "R&B"].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Performed with Celine Dion at Madison Square Garden,
                        Worked with Kanye West, Regular Performances at 1920
                        Dubai, The Nice Guy Dubai, and Netsu Dubai
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Chinua Hawk")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ABRI & The Soul Chefs */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/5983e2e0-bb7b-4e0e-8c66-f8fff584cb61.png"
                      alt="ABRI & The Soul Chefs"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Jazz & Soul
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        ABRI & The Soul Chefs
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Abri & The Soul Chefs deliver electrifying live
                        performances, blending soulful vocals with tight
                        grooves. Their dynamic sound promises an unforgettable
                        experience, igniting every stage they grace.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Jazz", "Soul", "Funk R&B", "Hip Hop"].map(
                          (style) => (
                            <Badge
                              key={style}
                              variant="outline"
                              className="text-xs"
                            >
                              {style}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Performed alongside legends like Ziggy Marley, Sade,
                        Sting & Quincy Jones, won Musivv Award's Emirati Artist
                        of the year in 2022
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() =>
                            openBookingDialog("ABRI & The Soul Chefs")
                          }
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daneel Sayegh */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/38538464-2e3a-478e-b377-bd890d55b16e.png"
                      alt="Daneel Sayegh"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Percussion
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Daneel Sayegh
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Daneel Sayegh crafts captivating soundscapes that
                        transcend genres. A masterful artist, their performances
                        are an immersive journey, leaving audiences spellbound
                        and craving more.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["High Energy Percussionist"].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        The Palazzo Versace Hotel Dubai '22, Independent Global
                        Art Festival '20, Performed with Cosmic Gate, James
                        Blunt, Majida El Roumy and Tiesto
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Daneel Sayegh")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hawazin */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/f865d3fe-a874-4916-bd45-70dd4dd22422.png"
                      alt="Hawazin"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Tribal House
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Hawazin</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Hawazin delivers a captivating fusion of traditional
                        melodies and contemporary sounds. Their vibrant
                        performances transport audiences, creating an
                        unforgettable musical journey.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Ethnic Organic Tribal House Music (Oud + Vocals + DJ)",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Fridge Concert Series Oct '23, Qatar World Cup '22,
                        Chanel Event '23, Louis Vuitton Event '22
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Hawazin")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kdun Albaz */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/7408d686-bf69-4c04-9aa5-fddc18d4dd2e.png"
                      alt="Kdun Albaz"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Fusion House
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Kdun Albaz</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Egypt's dynamic DJ and producer. He blends deep, melodic
                        house with organic influences, creating captivating,
                        transformative soundscapes. Book him for an
                        unforgettable journey!
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Lounge", "Soulful", "Fusion House"].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Live Concert in Klaipėda, Lithuania '22. Live Lounge set
                        Virgin Izakaya Dubai '22, The Ritz-Carlton Berlin '24
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Kdun Albaz")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Electronic Music */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Electronic Music
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Electronic music artists and DJs who create the perfect beach
                  club soundtrack with house, techno, and chill vibes
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* DJ Sara G */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/a7917120-4639-4100-9a62-689827945be8.png"
                      alt="DJ Sara G"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Hip Hop
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">DJ Sara G</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        DJ Sara G is an international open-format DJ. Based in
                        Dubai, she ignites global dancefloors with dynamic mixes
                        of Top 40, Hip Hop, R&B, and Deep House.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Hip-Hop",
                          "RnB",
                          "House",
                          "High Energy",
                          "Festival",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Burj Khalifa NYE Fireworks Show, Azimuth Festival '22 &
                        '24, Louvre Abu Dhabi Gala Dinner, Abu Dhabi Grand Prix,
                        All Africa Festival, Afrikaburn
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("DJ Sara G")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DJ Akmaral */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/2a2644e1-c6f6-4408-9e12-df5794b628ef.png"
                      alt="DJ Akmaral"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Live Mix
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Listen section moved here - horizontal layout */}
                    <div className="mb-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-muted-foreground font-medium">
                          Listen:
                        </span>
                        <a
                          href="https://soundcloud.com/united-ants/akmaral-ants-next-gen-2025"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={soundcloudIcon}
                            alt="SoundCloud"
                            className="w-6 h-6"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">DJ Akmaral</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        DJ Akmaral is an international open-format DJ with
                        residencies at luxurious UAE venues. She captivates
                        global audiences by seamlessly blending electronic,
                        house, techno, and popular tracks.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Open Format",
                          "Desert Grooves",
                          "Live Mix",
                          "Lounge",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Formula 1 Grand Prix Abu Dhabi, Mubadala Abu Dhabi Open,
                        Residencies at 5-star hotels
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("DJ Akmaral")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DJ Liutik */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/21db8238-4717-4f79-9a8c-6485c9738d9c.png"
                      alt="DJ Liutik"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Hip Hop
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">DJ Liutik</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        DJ Liutik, a Dubai-based DJ and producer, captivates
                        audiences with versatile sets. She blends Hip Hop, R&B,
                        and House, creating dynamic and energizing performances.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Hip-Hop",
                          "Groovy Beats",
                          "Melodic",
                          "Afro House",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Wireless Festival Middle East '23, Abu Dhabi Red Bull
                        Air Race, Opened for Metro Boomin, Post Malone, Travis
                        Scott, and Freek
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("DJ Liutik")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chiati */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/85e5a1a1-1e45-43c7-8f05-dafbe6eb8018.png"
                      alt="Chiati"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Ibiza Sound
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Chiati</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Chiati, a Cairo-based electronic musician, crafts
                        captivating live sets. He blends melodic and Afro house
                        with soulful vocals, expertly performing on keys and
                        guitar.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Live producer",
                          "Instrumentalist",
                          "Ibiza Sound",
                          "Uplifting Beats",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Ibiza's Chinois '24, D bay, Pyramid of Djoser - Saqqara
                        Egypt, The Garage, The Basement - Soma Bay, The
                        Warehouse in Cairo & El Gouna
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Chiati")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tata */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/adedeff8-56b9-4ca7-a794-a0ac7634c5c6.png"
                      alt="Tata"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Cairo EDM
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Tata</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Egyptian DJ Tata electrifies crowds with his dynamic
                        Electronic Dance Music. His sets are a journey through
                        pulsating beats and captivating rhythms, igniting
                        dancefloors across the region.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Cairo EDM",
                          "Party Starter",
                          "Global Grooves",
                          "Afro House",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Mirra X Vibrant Vibez Present Colorpop, Cairo Jazz Club
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Tata")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jess */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/39ab573b-e16a-40a5-b957-263ce9e82c9c.png"
                      alt="Jess"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Live Fusion Sets
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">Jess</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Cairo, Egypt</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Egyptian DJ Jess, based in Cairo, captivates audiences
                        with her dynamic blend of upbeat genres. She's known for
                        her versatile style, performing at top festivals and
                        venues across Egypt, the region, and Europe.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Festival DJ",
                          "High-Energy",
                          "Groovy Electronic",
                          "Cairo Nights",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Aegis Festival '25, Fusion Fesitval '25, Cairo Jazz
                        Club, Nacelle
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Jess")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DJ Kataleena */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/4aa4c138-0091-4efc-a381-2292e011a903.png"
                      alt="DJ Kataleena"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        NuDisco
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        DJ Kataleena
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Doha, Qatar</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        DJ Kataleena is a sonic architect from Qatar with two
                        decades of experience. She delivers electrifying sets of
                        Open Format, House, Nu Disco, and Tech House.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["NuDisco", "House", "Afro", "Jazzy", "Retro"].map(
                          (style) => (
                            <Badge
                              key={style}
                              variant="outline"
                              className="text-xs"
                            >
                              {style}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Performs regularly at LaVista 55 InterContinental Doha
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("DJ Kataleena")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lobito Brigante */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/7711f044-9054-4e1c-8293-1b8b16706d72.png"
                      alt="Lobito Brigante"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        Arabic Funk
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Lobito Brigante
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Lobito Brigante is a dynamic force, blending global
                        rhythms with infectious beats. Experience his unique
                        sound, guaranteed to fill your dance floor.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Arabic Funk",
                          "Latin",
                          "Soul",
                          "Afrobeat",
                          "B-boy Breaks",
                        ].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Electric Pawn Shop (Dubai) '22, Breakout DXB 2020,
                        Opened for Snoop Dogg, Fatboy Slim, Stevie Wonder and
                        Sean Paul
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Lobito Brigante")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DJ Pinkfish */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/ed349b1f-f6d1-433d-8337-fc5c787dd4fa.png"
                      alt="DJ Pinkfish"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        House
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        DJ Pinkfish
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Dubai, UAE</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        DJ Pinkfish crafts vibrant soundscapes, mixing pulsating
                        beats with unexpected grooves. Get ready for an
                        exhilarating journey that will transform your event and
                        keep the energy high all night.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["House", "Dance", "Festival"].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        Abu Dhabi F1, Club Social Festival Abu Dhabi, Headliner
                        at Expo 2020 Dubai, Resident DJ on Ibiza Radio
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("DJ Pinkfish")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jenn Getz & Alfie */}
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="/lovable-uploads/e26bd58e-b88c-490c-a3d1-d22584cadce5.png"
                      alt="Jenn Getz & Alfie"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        House
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <CardTitle className="text-xl mb-2">
                        Jenn Getz & Alfie
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">London, UK</span>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        Jenn Getz & Alfie deliver an infectious, high-energy
                        fusion. This dynamic duo blends captivating beats and
                        vibrant sounds, guaranteeing an unforgettable
                        performance that keeps crowds moving.
                      </CardDescription>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Music Styles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["House", "Commercial", "Tech House"].map((style) => (
                          <Badge
                            key={style}
                            variant="outline"
                            className="text-xs"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        Performed At:
                      </p>
                      <div className="text-sm text-foreground">
                        ABODE x Kaluki Sundays at Eden Ibiza '24, LoveJuice Pool
                        Party at Ibiza Rocks Hotel '24, Ministry Of Sound
                        London's Siesta The Summer Party and Toolroom Takeover
                        '24
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border mt-auto">
                      <div className="flex justify-center">
                        <Button
                          size="sm"
                          className="px-6"
                          onClick={() => openBookingDialog("Jenn Getz & Alfie")}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // Other event types - keep original layout
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredArtists?.map((artist) => (
              <FeaturedArtistCard key={artist?.id} artist={artist} />
            ))}
          </div>
        )}

        {/* Search All Artists Button - Hide for beach-clubs */}
        {eventType !== "beach-clubs" && (
          <div className="text-center mt-12 sm:mt-16">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
            >
              <Search className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Search All Artists
            </Button>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base px-4">
              Browse our complete catalog of {allArtists?.length || 0}+ verified
              artists
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && featuredArtists.length === 0 && (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎵</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              No featured artists available
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg">
              We're currently curating the best {eventType} artists for you
            </p>
            <Button
              onClick={() => navigate("/")}
              className="text-primary hover:underline font-bold text-base sm:text-lg w-full sm:w-auto"
            >
              Browse All Artists
            </Button>
          </div>
        )}
      </main>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Ready to Book Premium Artists?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Join hundreds of venues who trust us to deliver exceptional
            entertainment experiences.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              onClick={openConsultationDialog}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Drawer - Hidden for featured artists page */}
      <FacetDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Booking Dialog */}
      <BookingDialog
        isOpen={bookingDialog.isOpen}
        onClose={closeBookingDialog}
        artistName={bookingDialog.artistName}
      />

      {/* Consultation Dialog */}
      <ConsultationDialog
        isOpen={consultationDialog.isOpen}
        onClose={closeConsultationDialog}
      />
    </div>
  );
};
export default EventType;
