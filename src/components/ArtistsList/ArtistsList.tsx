import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../utils/constants";
import { MaskText } from "../AnimatedText/MaskText";
import Button from "../Button/Button";
import styles from "./artistslist.module.css";
import useLanguage from "../../hooks/useLanguage";
import { Badge } from "../ui/badge";
import { MapPin, Music2 } from "lucide-react";
import youtubeIcon from "../../assets/icons/youtube_icon.png";
import spotifyIcon from "../../assets/icons/spotify_icon.png";
import soundcloudIcon from "../../assets/icons/soundcloud_icon.png";

type Props = {
  artistList: {
    id: number;
    photo: string | any;
    name: string;
    genre: string;
    variants: string[];
  }[];
  artist: any[];
  onGenreClick: (genre: string) => void;
};

export const toTitleCase = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function ArtistsList({ artistList, artist, onGenreClick }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const language = useLanguage();

  const toggleShowMoreBtn = () => {
    setShowAll(!showAll);
  };

  const visibleArtists = showAll ? artistList : artistList.slice(0, 6);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      setShowAll(true);
    }
  }, []);

  return (
    <div className="max-w-[888px] mx-auto my-[48px] px-[16px] w-full">
      <ul className={styles.list}>
        {artist.map((artist, index) => (
          <div
            key={artist?.id}
            onClick={() => router.push(`${ROUTES.artists}/${artist?.id}`)}
            className="group bg-card overflow-hidden shadow-lg border border-border/50 flex flex-col w-full sm:max-w-[280px] h-[100%] mx-auto cursor-pointer"
          >
            {/* Image Section - Square */}
            <div className="relative aspect-square overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted ${
                  imageLoaded ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={artist.profile_image || "/placeholder.svg"}
                alt={`${
                  language.includes("ar")
                    ? artist.stage_name_ar
                    : artist.stage_name
                } - Artist`}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <button className="absolute top-[8px] right-[8px] flex flex-col gap-1 items-end">
                {artist?.genre?.slice(0, 3).map((g: string, idx: number) => (
                  <Badge
                    key={idx}
                    className="bg-primary text-primary-foreground font-bold px-[8px] py-[4px] text-[12px] leading-[15px] hover:bg-primary/80 rounded-full transition-all duration-200 mb-3.5 sm:mb-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onGenreClick(g?.toLowerCase());
                    }}
                  >
                    {g.replace(/_/g, " ").toUpperCase()}
                  </Badge>
                ))}
              </button>

              {/* Artist Info on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-[18px] leading-tight text-white mb-2">
                  {language.includes("ar")
                    ? artist.stage_name_ar
                    : artist.stage_name}
                </h3>
                {/* Performance Formats */}
                <div className="flex flex-wrap gap-1">
                  {artist?.performance_formats &&
                    artist.performance_formats
                      .split(",")
                      .map((f: string) => f.trim())
                      .slice(0, 2)
                      .map((format: string, idx: number) => (
                        <div
                          className="py-[2px] px-[6px] bg-white/20 text-[10px] font-semibold rounded-full leading-normal hover:bg-primary/80 transition-all duration-200 cursor-auto"
                          key={idx}
                        >
                          {format}
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-[12px] space-y-[8px] flex-1 flex flex-col">
              {/* Past Venues */}
              {artist.performed_at && artist?.performed_at?.length > 0 && (
                <div>
                  <div className="flex items-center gap-[4px] mb-[4px]">
                    <MapPin className="w-[12px] h-[12px] text-primary" />
                    <span className="text-[10px] font-semibold text-muted-foreground leading-none">
                      PERFORMED AT
                    </span>
                  </div>
                  {/* <div className="[scrollbar-width:none] max-h-[32px] overflow-y-auto"> */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {!language.includes("ar")
                        ? artist?.performed_at?.map(
                            (venue: string, idx: number) => (
                              <div
                                key={idx}
                                className="text-[10px] text-muted-foreground whitespace-nowrap leading-[15px]"
                              >
                                {venue}
                                {idx < artist?.performed_at?.length - 1
                                  ? " • "
                                  : ""}
                              </div>
                            ),
                          )
                        : artist?.performed_at_ar?.map(
                            (venue: string, idx: number) => (
                              <div
                                key={idx}
                                className="text-[10px] text-muted-foreground whitespace-nowrap leading-[15px]"
                              >
                                {venue}
                                {idx < artist?.performed_at_ar?.length - 1
                                  ? " • "
                                  : ""}
                              </div>
                            ),
                          )}
                    </div>
                  </div>
                </div>
              )}

              {/* Suitable For */}
              {artist.perfect_for && artist.perfect_for.length > 0 && (
                <div>
                  <div className="flex items-center gap-[4px] mb-[4px]">
                    <Music2 className="w-[12px] h-[12px] text-primary" />
                    <span className="text-[10px] font-semibold text-muted-foreground leading-none">
                      PERFECT FOR
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-[4px]">
                    {(() => {
                      const currLangPerfectFor = language.startsWith("ar")
                        ? artist?.perfect_for_ar || artist?.perfect_for
                        : artist?.perfect_for;

                      if (
                        !currLangPerfectFor ||
                        currLangPerfectFor.length === 0
                      ) {
                        return null;
                      }

                      const invalidValues = [
                        "Corporate Private Events",
                        "Bars Nightclubs",
                        "TV Films",
                        "Advertising",
                      ];

                      return currLangPerfectFor
                        .filter((cur: string) => !invalidValues.includes(cur))
                        .map((event: string, idx: number) => (
                          <Link
                            key={idx}
                            href={`/experiences/${event
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="leading-none"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Badge
                              variant="outline"
                              className="text-[10px] px-[6px] py-[2px] leading-[15px] cursor-pointer hover:bg-primary/20 transition-colors font-semibold rounded-full"
                            >
                              {event}
                            </Badge>
                          </Link>
                        ));
                    })()}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {Object.keys(artist?.listen_links)?.length > 0 && (
                <div className="pt-[8px] mt-[8px] border-t border-border/50">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      LISTEN:
                    </span>
                    <div className="flex gap-[6px]">
                      {artist?.listen_links?.youtube && (
                        <a
                          href={artist.listen_links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-[28px] h-[28px] rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center"
                        >
                          <img
                            src={youtubeIcon}
                            alt="Youtube"
                            className="w-[14px] h-[14px]"
                          />
                        </a>
                      )}
                      {artist?.listen_links?.spotify && (
                        <a
                          href={artist.listen_links.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-[28px] h-[28px] rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center"
                        >
                          <img
                            src={spotifyIcon}
                            alt="Spotify"
                            className="w-[14px] h-[14px]"
                          />
                        </a>
                      )}
                      {artist?.listen_links?.soundcloud && (
                        <a
                          href={artist.listen_links.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-[28px] h-[28px] rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center"
                        >
                          <img
                            src={soundcloudIcon}
                            alt="SoundCloud"
                            className="w-[14px] h-[14px]"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </ul>
      {!showAll && artistList.length > 6 && (
        <div className="flex justify-center mt-[20px] [&_button]:text-[14px]">
          <Button
            className="mx-auto"
            text="Show more"
            onClick={toggleShowMoreBtn}
          />
        </div>
      )}
    </div>
  );
}

export default ArtistsList;
