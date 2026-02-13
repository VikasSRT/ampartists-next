import ButtonWithIcon from "../Button/ButtonWithIcon";
import { MaskText } from "../AnimatedText/MaskText";
// Utils
import { ANCHORS } from "../../utils/constants";
// Styles
import styles from "./hero.module.css";
import useLanguage from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";

function Hero({ cmsInfo }) {
  // const mainHeadingParts =
  //   cmsInfo?.heroSection?.mainHeading?.[language]
  //     ?.split(/[,/]/)
  //     .map((part) => part) || [];

  // const bodyParts =
  //   cmsInfo?.heroSection?.body?.[language]?.split(/[,/]/).map((part) => part) ||
  //   [];

  const language = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const mainHeadingParts =
    cmsInfo?.heroSection?.mainHeading?.[language]
      ?.split(",/")
      .map((part) => part.trim()) || [];

  const bodyParts =
    cmsInfo?.heroSection?.body?.[language]
      ?.split(",/")
      .map((part) => part.trim()) || [];

  const handleAnchorClick = (hash: string) => {
    if (pathname === "/") {
      console.log("called");
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${hash}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <MaskText stagger={0.1}>
            {/* The <span>Artist-Owned</span> Booking Platform */}
            {mainHeadingParts[0]} <span>{mainHeadingParts[1]}</span>{" "}
            {mainHeadingParts[2]}
          </MaskText>
        </div>

        <div className={styles.subTitle}>
          <MaskText stagger={1}>
            {/* Book artists. Drop stress. Raise the volume. */}
            {cmsInfo?.heroSection?.subHeading?.[language]}
            {/* {subHeadingParts} */}
          </MaskText>
        </div>
        <div className={styles.description}>
          <MaskText stagger={1}>
            {bodyParts[0]}{" "}
            {/* The region's first all-in-one music artist booking platform.{" "} */}
            <br></br>
            {/* Built to simplify everystep, from discovery to deal. */}
            {bodyParts[1]}
          </MaskText>
        </div>

        {/* <a href=ANCHORS.booking.anchor> */}
        <ButtonWithIcon
          text={t("howItWorks")}
          onClick={() => handleAnchorClick("#howItWorks")}
        />
        {/* </a> */}
      </div>
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
    </div>
  );
}

export default Hero;
