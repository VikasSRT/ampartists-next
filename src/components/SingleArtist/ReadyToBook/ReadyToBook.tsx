"use client";

import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
// Components
import { MaskText } from "../../AnimatedText/MaskText";
import Button from "../../Button/Button";
import CustomModal from "../../CustomModal/CustomModal";
import PopupBooking from "../../Popups/PopupBooking";
// Styles
import styles from "./readytobook.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  artistInfo: any;
};

function ReadyToBook({ artistInfo }: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;

  const { ref: triangleRef, inView: inView } = useInView({
    triggerOnce: true,
    threshold: [0.4],
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 295 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(styles.triangleFirst, inView && styles.animate)}
        ref={triangleRef}
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

      <MaskText stagger={1}>
        <h2 className={styles.title}>
          {t("readyTo")}
          <span className={styles.titleBlue}> {t("book")}</span>
        </h2>
      </MaskText>
      <MaskText stagger={2}>
        <p className={styles.description}>{t("customExperience")}</p>
      </MaskText>
      <Button
        text={t("bookNow")}
        className="artistPageBlack"
        onClick={togglePopup}
      />
      <div className={styles.decorStar} />

      <CustomModal open={isPopupOpen} onClose={togglePopup}>
        <PopupBooking onClose={togglePopup} id={id} artistInfo={artistInfo} />
      </CustomModal>
    </div>
  );
}

export default ReadyToBook;
