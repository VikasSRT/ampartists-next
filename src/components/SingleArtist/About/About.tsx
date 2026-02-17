import { useTranslation } from "react-i18next";
import useLanguage from "../../../hooks/useLanguage";
import { MaskText } from "../../AnimatedText/MaskText";
import BouncingBall from "../../BouncingBall/BouncingBall";
import styles from "./about.module.css";
import type { ArtistType } from "../../Gallery/Gallery";

type Props = {
  artistInfo: ArtistType & {
    biography_ar?: string;
  };
};

export default function About({ artistInfo }: Props) {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <MaskText stagger={0.1}>
            {t("about")}
            <br></br>
          </MaskText>
          <MaskText stagger={1}>
            <span className={styles.titleGreen}> {t("theArtist")}</span>
          </MaskText>
        </div>
        <MaskText stagger={2}>
          <p className={styles.description1}>
            {artistInfo?.[language === "en" ? "biography" : "biography_ar"]}
          </p>
        </MaskText>
        <MaskText stagger={3}>
          {/* <p className={styles.description2}>
            Sarah specializes in creating intimate musical experiences perfect
            for corporate events, weddings, and private gatherings
          </p> */}
        </MaskText>
      </div>
      <div className={styles.right}>
        <BouncingBall />
      </div>
    </div>
  );
}
