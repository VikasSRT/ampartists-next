import { useState } from "react";
// Components
import ButtonWithIcon from "../Button/ButtonWithIcon";
import PopupArtistRegistration from "../Popups/PopupArtistRegistration";
import CustomModal from "../CustomModal/CustomModal";
import { MaskText } from "../AnimatedText/MaskText";

// Styles
import styles from "./missions.module.css";
import useLanguage from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

function Missions({ cmsInfo }) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const language = useLanguage();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const ourMissionSectionSubHeading =
    cmsInfo?.ourMissionSection?.subHeading?.[language]
      .split(",/")
      .map((part) => part) || [];
  const ourMissionSectionbody2 =
    cmsInfo?.ourMissionSection?.body2?.[language]
      .split(",/")
      .map((part) => part) || [];

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          <MaskText
            text={
              cmsInfo?.ourMissionSection?.mainHeading?.[language] ||
              "Our Mission"
            }
            stagger={1}
          />
        </h2>
        <div className={styles.subTitle}>
          <MaskText
            text={
              cmsInfo?.ourMissionSection?.body1?.[language] ||
              " Amp is the revolutionary music artist booking hub connecting top talent with venues in one seamless flow."
            }
            stagger={2}
          />
        </div>
        <div className={styles.subTitleGreen}>
          <MaskText stagger={3}>
            {/* Get booked.<br className={styles.mobileDeviderShow}></br> Get seen.
            Get paid. */}
            {/* {cmsInfo?.ourMissionSection?.subHeading?.[language]} */}
            {ourMissionSectionSubHeading[0]}
            <br className={styles.mobileDeviderShow}></br>
            {ourMissionSectionSubHeading[1]}
            {ourMissionSectionSubHeading[2]}
          </MaskText>
        </div>
        <div className={styles.description}>
          <MaskText stagger={4}>
            {/* {cmsInfo?.ourMissionSection?.body2?.[language]} */}
            {/* We're here to amplify MENA's Talent.
            <br className={styles.mobileDevider} />
            This isn't just about gigs. It's about growth.
            <br className={styles.mobileDevider} />
            We give artists visibility, clarity, and control. */}
            {ourMissionSectionbody2[0]} <br className={styles.mobileDevider} />
            {ourMissionSectionbody2[1]} <br className={styles.mobileDevider} />
            {ourMissionSectionbody2[2]}
          </MaskText>
        </div>
        <a href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/artist-signup`}>
          <ButtonWithIcon text={t("signup")} />
        </a>
      </div>
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />

      <CustomModal open={false} onClose={togglePopup}>
        <PopupArtistRegistration onClose={togglePopup} />
      </CustomModal>
    </div>
  );
}

export default Missions;
