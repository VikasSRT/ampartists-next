import { useState } from "react";
import clsx from "clsx";
import { useDirection } from "../../../context/DirectionContext";
// Components
import { MaskText } from "../../AnimatedText/MaskText";
import Title from "../Title/Title";
import Button from "../../Button/Button";
import CustomModal from "../../CustomModal/CustomModal";
import PopupBooking from "../../Popups/PopupBooking";
// Utils
import { SERVICES } from "../../../utils/constants";
// Images
import DecorStar from "../../../assets/icons/decor-star.svg";
// Styles
import styles from "./services.module.css";
import { useTranslation } from "react-i18next";
import useLanguage from "../../../hooks/useLanguage";

export default function Services({ artistInfo }) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { direction } = useDirection();
  const { t } = useTranslation();
  const language = useLanguage();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (
    !artistInfo?.[language === "en" ? "arrangements" : "arrangements_ar"] ||
    !artistInfo?.[language === "en" ? "arrangements" : "arrangements_ar"]
      ?.length ||
    !artistInfo?.[
      language === "en" ? "arrangements" : "arrangements_ar"
    ]?.every((item) => item)
  ) {
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <MaskText>
          <Title>{t("services")}</Title>
        </MaskText>
        <ul className={styles.list}>
          {SERVICES.map((step, index) => {
            const value =
              artistInfo?.[
                language === "en" ? "arrangements" : "arrangements_ar"
              ]?.[index];
            return (
              <MaskText stagger={index} key={step.id}>
                <li className={styles.item}>
                  <div className={styles.iconContainer}>
                    <DecorStar className={styles.icon} />
                    <span className={styles.index}>{index + 1}</span>
                  </div>
                  <p
                    className={clsx(
                      styles.stepDescription,
                      direction === "rtl" && styles.rtl
                    )}
                  >
                    {value}
                  </p>
                </li>
              </MaskText>
            );
          })}
        </ul>
        <Button
          text={t("bookNow")}
          className="artistPage"
          onClick={togglePopup}
        />
      </div>
      <CustomModal open={isPopupOpen} onClose={togglePopup}>
        <PopupBooking onClose={togglePopup} />
      </CustomModal>
    </>
  );
}
