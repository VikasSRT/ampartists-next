import { useState } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
// Components
import ButtonWithIcon from "../Button/ButtonWithIcon";
import PopupBooking from "../Popups/PopupBooking";
import { MaskText } from "../AnimatedText/MaskText";
import CustomModal from "../CustomModal/CustomModal";
// Styles
import styles from "./bookinggreen.module.css";
import useLanguage from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BookingGreen({ cmsInfo }: { cmsInfo: any }) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();

  const { ref: triangleRef1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: [0.4],
  });
  const { ref: triangleRef2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: [0.4],
  });

  const togglePopup = () => {
    // setIsPopupOpen(!isPopupOpen);
    router.push("/artists");
  };

  const language = useLanguage();

  const mainHeadingParts =
    cmsInfo?.bottomSection?.mainHeading?.[language]
      ?.split(",/")
      .map((part: string) => part.trim()) || [];
  return (
    <>
      <div className={styles.container}>
        <svg
          viewBox="0 0 295 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(styles.triangleFirst, inView1 && styles.animate)}
          ref={triangleRef1}
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
        <div className={styles.wrapper}>
          <MaskText stagger={1}>
            <h2 className={styles.title}>
              {/* {cmsInfo?.bottomSection?.mainHeading?.[language]} */}
              {mainHeadingParts[0]}
              <br></br>
              <span className={styles.titleBlue}>{mainHeadingParts[1]}</span>
              {/* It's booking, <br></br>
              <span className={styles.titleBlue}>made better </span> */}
            </h2>
          </MaskText>
          <MaskText stagger={2}>
            <p className={styles.description}>
              {cmsInfo?.bottomSection?.subHeading?.[language]}
              {/* First in the region. Built for the culture. */}
            </p>
          </MaskText>
          <MaskText stagger={2}>
            <p className={styles.subTitle}>
              {cmsInfo?.bottomSection?.body?.[language]}
              {/* We know the regional music scene inside out, because we live it.
              This platform was built to support the next wave of creativity in
              the Middle East, North Africa and beyond. Fast. Fair. */}
              {/* Future-ready. */}
            </p>
          </MaskText>

          {/* <ButtonWithIcon
            text={t("bookNowBtn")}
            onClick={togglePopup}
            className="black"
          /> */}

          <ButtonWithIcon
            text={t("getStarted")}
            onClick={togglePopup}
            className="black"
          />
        </div>

        <svg
          viewBox="0 0 295 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(styles.triangleSecond, inView2 && styles.animate)}
          ref={triangleRef2}
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
        <div className={styles.decorStar} />
      </div>
      <CustomModal open={isPopupOpen} onClose={togglePopup}>
        <PopupBooking onClose={togglePopup} />
      </CustomModal>
    </>
  );
}

export default BookingGreen;
