"use client";

// Components
import { MaskText } from "../../AnimatedText/MaskText";
import Title from "../Title/Title";
// Images
import Instagram from "../../../assets/icons/socials/Instagram.svg";
import Tiktok from "../../../assets/icons/socials/Tiktok.svg";
import Facebook from "../../../assets/icons/socials/Facebook.svg";
// Styles
import styles from "./follow.module.css";
import useLanguage from "../../../hooks/useLanguage";

function Foloow({ artistInfo }) {
  const language = useLanguage();

  const socials = [
    {
      name: "Instagram",
      link: "@Sahahjognsonmusic",
      icon: Instagram,
      value: artistInfo?.instagram,
    },
    // {
    //   name: "Tiktok",
    //   link: "@Sahahjognsonmusic",
    //   icon: Tiktok,
    //   value: artistInfo?.twitter,
    // },
    {
      name: "Facebook",
      link: "@Sahahjognsonmusic",
      icon: Facebook,
      value: artistInfo?.facebook,
    },
  ];
  return (
    <div
      className={styles.container}
      style={{
        direction: "ltr",
      }}
    >
      <MaskText>
        <Title>
          Follow{" "}
          {artistInfo?.[language === "en" ? "stage_name" : "stage_name_ar"]} on
          social networks
        </Title>
      </MaskText>
      <ul className={styles.list}>
        {socials.map((item, index) => {
          const Icon = item.icon;
          if (!item?.value) return "";

          return (
            <MaskText stagger={index + 1} key={item.name}>
              <li
                className={styles.item}
                style={{
                  direction: "ltr",
                }}
              >
                <a href={item?.value} target="_blank">
                  <Icon className={styles.icon} />
                  <span
                    className={styles.text}
                    style={{
                      direction: "ltr",
                    }}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            </MaskText>
          );
        })}
      </ul>
    </div>
  );
}

export default Foloow;
