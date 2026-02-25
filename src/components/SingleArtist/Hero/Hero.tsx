import Button from "../../Button/Button";
import BubbleTag from "../../BubbleTag/BubbleTag";
import { MaskText } from "../../AnimatedText/MaskText";
// Images
import bg from "../../../assets/images/artists/bg.png";
import DecorStar from "../../../assets/icons/starDecor.svg";
import type { ArtistType } from "../../Gallery/Gallery";
import Image from "next/image";

// ArtistType from Gallery lacks some localized/optional fields used here.
type ExtendedArtist = ArtistType & {
  stage_name_ar?: string;
  one_liner?: string;
  one_liner_ar?: string;
  location_ar?: string;
  genre?: string[] | string;
  genre_ar?: string[] | string;
  cover_image_mobile?: string | null;
};
// Styles
import styles from "./hero.module.css";
import { toTitleCase } from "../../ArtistsList/ArtistsList";
import useLanguage from "../../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

interface Props {
  togglePopup: () => void;
  artistInfo?: ExtendedArtist;
}
const GENRES = [
  { name: "Jazz", color: "#8181D5" },
  { name: "Soul", color: "#2F4ACB" },
  { name: "R&B", color: "#F94819" },
];
const color = ["#8181D5", "#2F4ACB", "#F94819"];

function Hero({ togglePopup, artistInfo }: Props) {
  const { t } = useTranslation();

  const language = useLanguage();

  const stageName =
    artistInfo?.[language === "en" ? "stage_name" : "stage_name_ar"]?.split(
      " ",
    );

  const desktopImage = artistInfo?.cover_image || bg;
  const mobileImage =
    artistInfo?.cover_image_mobile || artistInfo?.cover_image || bg;
  const fullStageName = stageName?.join(" ");

  return (
    <div className={styles.container}>
      <Image
        src={desktopImage}
        alt={
          fullStageName ? `${fullStageName} cover image` : "Artist cover image"
        }
        fill
        priority
        sizes="(min-width: 768px) 100vw, 0vw"
        className={styles.desktopBg}
      />
      <Image
        src={mobileImage}
        alt={
          fullStageName
            ? `${fullStageName} mobile cover image`
            : "Artist mobile cover image"
        }
        fill
        sizes="100vw"
        className={styles.mobileBg}
      />
      <div className={styles.info}>
        <MaskText stagger={0.1}>
          <h1 className={styles.name}>
            {/* Sarah <br></br>Johnson */}
            {stageName?.[0]}
            <br></br>
            {stageName?.slice(1).join(" ")}
          </h1>
        </MaskText>
        <MaskText stagger={0.2}>
          <p className={styles.direction}>
            {artistInfo?.[language === "en" ? "one_liner" : "one_liner_ar"] ||
              ""}
            {/* Soulful jazz vocalist and pianist */}
          </p>
        </MaskText>
        <div className={styles.wrapper}>
          <div className={styles.location}>
            <DecorStar className={styles.locationIcon} />
            <span>
              {artistInfo?.[language === "en" ? "location" : "location_ar"]}
            </span>
          </div>

          <ul className={styles.list}>
            {/* <li className={styles.item}>
              <BubbleTag
                label={
                  toTitleCase(
                    artistInfo?.[language === "en" ? "genre" : "genre_ar"] || ""
                  ) || ""
                }
                color="#F94819"
              />
            </li> */}

            {(() => {
              const rawGenre =
                artistInfo?.[language === "en" ? "genre" : "genre_ar"];
              const genreArray = Array.isArray(rawGenre)
                ? rawGenre
                : typeof rawGenre === "string"
                  ? [rawGenre]
                  : [];
              return genreArray.map((label, index) => (
                <li className={styles.item} key={`${label}-${index}`}>
                  <BubbleTag
                    label={toTitleCase(label || "") || ""}
                    color={color?.[index]}
                  />
                </li>
              ));
            })()}

            {/* {GENRES.map((genre) => (
              <li key={genre.name} className={styles.item}>
                <BubbleTag label={genre?.name} color={genre.color} />
              </li>
            ))} */}
          </ul>
        </div>
        <Button
          text={t("bookNow")}
          className="artistPage"
          onClick={togglePopup}
        />
      </div>
    </div>
  );
}

export default Hero;
