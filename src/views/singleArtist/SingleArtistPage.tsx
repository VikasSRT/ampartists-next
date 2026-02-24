"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CustomModal from "../../components/CustomModal/CustomModal";
import DeviderAnimated from "../../components/Devider/DeviderAnimated";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Gallery, { type ArtistType } from "../../components/Gallery/Gallery";
import PopupBooking from "../../components/Popups/PopupBooking";
import About from "../../components/SingleArtist/About/About";
import Experience from "../../components/SingleArtist/Experience/Experience";
import Foloow from "../../components/SingleArtist/Follow/Foloow";
import Hero from "../../components/SingleArtist/Hero/Hero";
import Listen from "../../components/SingleArtist/Listen/Listen";
import ReadyToBook from "../../components/SingleArtist/ReadyToBook/ReadyToBook";
import Services from "../../components/SingleArtist/Services/Services";
import ServicesNew from "../../components/SingleArtist/NewServices/ServicesNew";
import SoundWaves from "../../components/SoundWaves/SoundWaves";
import useApiHook from "../../hooks/useApiHook";
import styles from "./singleArtist.module.css";
import useLanguage from "../../hooks/useLanguage";

export default function SingleArtistPage({
  initialArtistInfo,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialArtistInfo?: any;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { id } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [artistInfo, setArtistInfo] = useState<ArtistType | undefined>(
    initialArtistInfo,
  );
  const router = useRouter();
  const language = useLanguage();

  const { api } = useApiHook();

  useEffect(() => {
    // Skip fetch if we have initial data (SSR)
    if (initialArtistInfo) {
      setArtistInfo(initialArtistInfo);
      return;
    }

    const getCms = async () => {
      const response = await api({
        endPoint: `/customer/artist/${id}/`,
      });
      if (response?.success) {
        setArtistInfo(response?.data);
      } else {
        router.push("/");
      }
    };
    if (id) {
      getCms();
    }
  }, [id, initialArtistInfo]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowButton(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("artistinfooooo", artistInfo);
  // const hasServices = artistInfo?.arrangements;
  // console.log(hasServices, "hasssss");

  const showServices =
    (artistInfo as any)?.[
      language === "en" ? "arrangements" : "arrangements_ar"
    ] &&
    (artistInfo as any)?.[
      language === "en" ? "arrangements" : "arrangements_ar"
    ]?.length &&
    (artistInfo as any)?.[
      language === "en" ? "arrangements" : "arrangements_ar"
    ]?.every((item: any) => item);

  const showExperience =
    (artistInfo as any)?.[
      language === "en" ? "experiences" : "experiences_ar"
    ] &&
    (artistInfo as any)?.[language === "en" ? "experiences" : "experiences_ar"]
      ?.length &&
    (artistInfo as any)?.[
      language === "en" ? "experiences" : "experiences_ar"
    ]?.every((item: any) => item);

  const stageName = artistInfo?.stage_name || "Artist";
  const realName = artistInfo?.real_name || "";
  const location = artistInfo?.location || "International";
  const genres =
    Array.isArray(artistInfo?.genre) && artistInfo.genre.length > 0
      ? artistInfo.genre.join(", ")
      : "Music";
  const bio = artistInfo?.biography
    ? artistInfo.biography.substring(0, 155) +
      (artistInfo.biography.length > 155 ? "..." : "")
    : `Discover ${stageName}, a talented artist from ${location}. Book performances for events.`;

  const artistTags = Array.isArray(artistInfo?.tags)
    ? artistInfo.tags
        .map((t) => t.tag)
        .filter((tag) => tag)
        .join(", ")
    : "";

  const keywords = [
    stageName,
    realName,
    `${stageName} music`,
    `${stageName} artist`,
    `${stageName} booking`,
    `${stageName} performance`,
    genres,
    location,
    "AMP artist",
    "music booking",
    "live music",
    "artist profile",
    artistTags,
  ]
    .filter(Boolean)
    .join(", ");
  const hasAnyTrue =
    artistInfo?.arrangements &&
    Object.values(artistInfo?.arrangements).some(Boolean);

  return (
    <section className={styles.section}>
      <Hero togglePopup={togglePopup} artistInfo={artistInfo} />
      <SoundWaves />
      <About artistInfo={artistInfo} />
      <Listen artistInfo={artistInfo} />
      <DeviderAnimated className="logo" />
      {showExperience ? (
        <>
          <Experience artistInfo={artistInfo} />
          <SoundWaves />
        </>
      ) : (
        ""
      )}

      {/* <div>
          {hasAnyTrue && (
            <ServicesNew
              services={artistInfo?.arrangements}
              otherArrangement={artistInfo?.other_arrangement}
            />
          )}
          {artistInfo?.arrangements && <Services artistInfo={artistInfo} />} // this was already commented
        </div> */}

      {/* {showServices ? (
        <>
          <Services artistInfo={artistInfo} />
          <SoundWaves green />
        </>
      ) : (
        "vbhfghfgh"
      )} */}
      {artistInfo && <Gallery artistInfo={artistInfo} />}
      <SoundWaves />
      {/* <Testimonials /> */}

      <ReadyToBook artistInfo={artistInfo} />
      <Foloow artistInfo={artistInfo} />
      <FloatingButton onClick={togglePopup} showButton={showButton} />
      <CustomModal
        open={isPopupOpen}
        onClose={togglePopup}
        shouldCloseOnOverlayClick={false}
      >
        <PopupBooking
          onClose={togglePopup}
          id={id as string}
          artistInfo={artistInfo}
        />
      </CustomModal>
    </section>
  );
}
