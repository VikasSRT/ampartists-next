"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent, useState } from "react";
import clsx from "clsx";
import { useDirection } from "../../context/DirectionContext";
// Components
import ButtonWithIcon from "../Button/ButtonWithIcon";
import Button from "../Button/Button";
import { MaskText } from "../AnimatedText/MaskText";
// Images
import Star from "../../assets/icons/star.svg";
// Utils
import { ANCHORS, ROUTES } from "../../utils/constants";
// ARTISTS_LIST excluded contains mock data
// Styles
import styles from "./talents.module.css";
import useApiHook from "../../hooks/useApiHook";
import useLanguage from "../../hooks/useLanguage";

interface Artist {
  id: number | string;
  profile_image: string;
  stage_name: string;
  // Add other fields if needed
}

function Talents({ cmsInfo }) {
  const language = useLanguage();

  const parallaxRef = useRef<HTMLDivElement>(null);
  const starRight = useRef<HTMLDivElement>(null);
  const starLeft = useRef<HTMLDivElement>(null);
  const { direction } = useDirection();
  const { api } = useApiHook();
  const [displayArtists, setDisplayArtists] = useState<Artist[]>([]);

  const featuredArtistsSectionMainHeading =
    cmsInfo?.featuredArtistsSection?.mainHeading?.[language]
      ?.split(",/")
      .map((part: string) => part) || [];

  const handleMouseMove = (e: MouseEvent) => {
    const container = parallaxRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    starRight.current?.setAttribute(
      "style",
      `transform: translate(${x / 30}px, ${
        y / 30
      }px); transition: transform 1s ease-out;`,
    );

    starLeft.current?.setAttribute(
      "style",
      `transform: translate(${-x / 20}px, ${
        -y / 40
      }px); transition: transform 1.2s ease-out;`,
    );
  };

  const fetchArtists = async () => {
    try {
      const { success, error, data } = await api({
        method: "GET",
        endPoint: `customer/artists-list/`,
        needLoader: true,
        loaderName: "customer-artist-list",
        showErrorToast: false,
        attachAccessToken: false,
        params: { featured_artist: true },
      });

      if (success) {
        setDisplayArtists(
          [...data].sort(() => 0.5 - Math.random()).slice(0, 4),
        );
      }
    } catch (err) {
      console.error("Error generating support ticket:", err);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const resetTransform = () => {
    starRight.current?.setAttribute(
      "style",
      "transform: translate(0, 0); transition: transform 0.3s ease;",
    );

    starLeft.current?.setAttribute(
      "style",
      "transform: translate(0, 0); transition: transform 0.3s ease;",
    );
  };

  return (
    <div
      className={styles.container}
      id={ANCHORS.artists.id}
      ref={parallaxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          <MaskText stagger={1}>
            {/* Curated
            <span className={styles.titleGreen}> talent</span>
            <br></br> Zero conpromises */}
            {/* {cmsInfo?.featuredArtistsSection?.mainHeading?.[language]} */}
            {featuredArtistsSectionMainHeading[0]}{" "}
            <span className={styles.titleGreen}>
              {featuredArtistsSectionMainHeading[1]}
            </span>
            <br></br>
            {featuredArtistsSectionMainHeading[2]}
          </MaskText>
        </h2>
        <div className={styles.subTitle}>
          <MaskText stagger={2}>
            {/* Only the best make it to Amp. Here are a few of our most booked
            acts: */}
            {cmsInfo?.featuredArtistsSection?.body?.[language]}
          </MaskText>
        </div>
        <ul className={styles.list}>
          {/* {artistData?.slice(0, 4).map((artist, index) => ( */}
          {displayArtists.map((artist, index) => (
            <li className={styles.item} key={artist.id}>
              <MaskText stagger={index} className={styles.itemMask}>
                <div className={styles.imageWrapper}>
                  <img
                    src={artist.profile_image}
                    alt={artist.stage_name}
                    className={styles.photo}
                  />
                  <p
                    className={clsx(
                      styles.name,
                      direction === "rtl" && styles.rtl,
                    )}
                  >
                    {artist.stage_name}
                  </p>
                </div>
                <Link
                  href={`${ROUTES.artists}/${artist.id}`}
                  className={styles.navLink}
                >
                  <Button text="See more details" className="artists" />
                </Link>
              </MaskText>
            </li>
          ))}
        </ul>

        <ButtonWithIcon text="view all artists" href={ROUTES.artists} />

        <div ref={starLeft} className={styles.decorLeft}>
          <Star className={styles.decorIcon} />
        </div>
        <div ref={starRight} className={styles.decorRight}>
          <Star className={styles.decorIcon} />
        </div>
      </div>
    </div>
  );
}

export default Talents;
