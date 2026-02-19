import { useInView } from "react-intersection-observer";
// COmponents
import Title from "../Title/Title";
// Utils
import { EXPERIENCE } from "../../../utils/constants";
// Styles
import styles from "./experience.module.css";
import clsx from "clsx";
import { MaskText } from "../../AnimatedText/MaskText";
import { useTranslation } from "react-i18next";
import useLanguage from "../../../hooks/useLanguage";

import type { ArtistType } from "../../Gallery/Gallery";

type Props = {
  artistInfo?:
    | (ArtistType & {
        experiences?: string[];
        experiences_ar?: string[];
        experience_image?: string;
      })
    | null;
};

export default function Experience({ artistInfo }: Props) {
  const { t } = useTranslation();
  const language = useLanguage();
  console.log("🚀 ~ Experience ~ language:", language);

  const { ref: svgRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  if (
    !artistInfo?.[language === "en" ? "experiences" : "experiences_ar"] ||
    !artistInfo?.[language === "en" ? "experiences" : "experiences_ar"]
      ?.length ||
    !artistInfo?.[language === "en" ? "experiences" : "experiences_ar"]?.every(
      (item: string) => item,
    )
  ) {
    return;
  }

  return (
    <div className={styles.container}>
      <MaskText stagger={0.1}>
        <Title>{t("experiences")}</Title>
      </MaskText>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {EXPERIENCE.map(
            (item: (typeof EXPERIENCE)[number], index: number) => {
              const Icon = item.icon;
              const value =
                artistInfo?.[
                  language === "en" ? "experiences" : "experiences_ar"
                ]?.[index];
              return (
                <MaskText stagger={index} key={item.id}>
                  <li className={styles.item}>
                    <Icon
                      className={styles.icon}
                      style={{ color: item.color }}
                    />
                    <p className={styles.text}>{value}</p>
                  </li>
                </MaskText>
              );
            },
          )}
        </ul>
        <div className={styles.imageContainer}>
          {artistInfo?.experience_image && (
            <img
              src={artistInfo.experience_image}
              alt="Image symbolizing the artist's growth, stage presence, and professional experience."
              className={styles.image}
            />
          )}
          <div className={styles.animations}>
            <svg
              viewBox="0 0 295 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(styles.decor, inView && styles.animate)}
              ref={svgRef}
            >
              <path
                className={clsx(styles.triangle, styles.triangle1)}
                d="M98.1759 95.0478L6.9062e-06 3.4809e-05L7.62939e-06 191.085L98.1759 95.0478Z"
                fill="currentColor"
              />
              <path
                className={clsx(styles.triangle, styles.triangle2)}
                d="M196.223 95.0478L98.0469 3.4809e-05L98.0469 191.085L196.223 95.0478Z"
                fill="currentColor"
              />
              <path
                className={clsx(styles.triangle, styles.triangle3)}
                d="M294.223 95.0478L196.047 3.4809e-05L196.047 191.085L294.223 95.0478Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
