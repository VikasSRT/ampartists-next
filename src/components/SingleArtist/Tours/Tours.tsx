import Button from "../../Button/Button";
import Title from "../Title/Title";
// Utils
import { TOURS } from "../../../utils/constants";
// Styles
import styles from "./tours.module.css";
import { useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import PopupBooking from "../../Popups/PopupBooking";
import { MaskText } from "../../AnimatedText/MaskText";
import Slider from "../../Slider/Slider";
import useLanguage from "../../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

function Tours({ artistInfo }) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const language = useLanguage();
  const { t } = useTranslation();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (!artistInfo?.tour_dates || !artistInfo?.tour_dates?.length) {
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <MaskText stagger={0.1}>
          <Title>{t("tourDates")}</Title>
        </MaskText>
        <ul className={styles.list}>
          {artistInfo?.tour_dates?.map((tour, index) => (
            <MaskText stagger={index} key={tour.id} className={styles.itemMask}>
              <li className={styles.item}>
                <img
                  src={tour?.event_image}
                  alt={tour?.location}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <p className={styles.place}>
                    {tour?.[language === "en" ? "venue" : "venue_ar"]}
                  </p>
                  <p className={styles.date}>{tour?.date}</p>
                  <p className={styles.location}>
                    {tour?.[language === "en" ? "location" : "location_ar"]}
                  </p>
                </div>
                <Button
                  text={t("viewDetails")}
                  className="tours"
                  onClick={togglePopup}
                />
              </li>
            </MaskText>
          ))}
        </ul>
        <Slider tours={TOURS} onClick={togglePopup} />
      </div>
      <CustomModal open={isPopupOpen} onClose={togglePopup}>
        <PopupBooking onClose={togglePopup} />
      </CustomModal>
    </>
  );
}

export default Tours;
