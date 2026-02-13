// Images
import DecorStar from "../../assets/icons/decor-star.svg";
import { useDirection } from "../../context/DirectionContext";
import useLanguage from "../../hooks/useLanguage";
// Utils
import { ANCHORS, BOOKING } from "../../utils/constants";
import { MaskText } from "../AnimatedText/MaskText";
// Styles
import styles from "./booking.module.css";

function Booking({ cmsInfo }) {
  const language = useLanguage();
  console.log("cms", cmsInfo);
  const aboutUsSectionmainHeading =
    cmsInfo?.aboutUsSection?.mainHeading?.[language]
      ?.split(",/")
      .map((part) => part) || [];
  return (
    <div className={styles.container} id={ANCHORS.howItWorks.id}>
      <div className={styles.wrapper}>
        <MaskText stagger={1}>
          <h2 className={styles.title}>
            {/* <span className={styles.titleGreen}>Booking </span>
            shouldn't take 27 emails */}
            <span className={styles.titleGreen}>
              {aboutUsSectionmainHeading[0]}
            </span>
            {aboutUsSectionmainHeading[1]}
          </h2>
        </MaskText>
        <MaskText stagger={2}>
          <p className={styles.subTitle}>
            {cmsInfo?.aboutUsSection?.body?.[language]}
            {/* We've taken everything you hate about booking, the back-and-forth,
            the confusion, the endless emails, and made it simple. */}
          </p>
        </MaskText>

        <ul className={styles.list}>
          <MaskText>
            <li className={styles.item}>
              <div className={styles.iconContainer}>
                <DecorStar className={styles.icon} />
                <span className={styles.index}>1</span>
              </div>
              <p className={styles.stepTitle}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepA?.name?.[language]}
              </p>
              <p className={styles.stepDescription}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepA?.body?.[language]}
              </p>
            </li>
          </MaskText>
          <MaskText>
            <li className={styles.item}>
              <div className={styles.iconContainer}>
                <DecorStar className={styles.icon} />
                <span className={styles.index}>2</span>
              </div>
              <p className={styles.stepTitle}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepB?.name?.[language]}
              </p>
              <p className={styles.stepDescription}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepB?.body?.[language]}
              </p>
            </li>
          </MaskText>{" "}
          <MaskText>
            <li className={styles.item}>
              <div className={styles.iconContainer}>
                <DecorStar className={styles.icon} />
                <span className={styles.index}>3</span>
              </div>
              <p className={styles.stepTitle}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepC?.name?.[language]}
              </p>
              <p className={styles.stepDescription}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepC?.body?.[language]}
              </p>
            </li>
          </MaskText>{" "}
          <MaskText>
            <li className={styles.item}>
              <div className={styles.iconContainer}>
                <DecorStar className={styles.icon} />
                <span className={styles.index}>4</span>
              </div>
              <p className={styles.stepTitle}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepD?.name?.[language]}
              </p>
              <p className={styles.stepDescription}>
                {cmsInfo?.aboutUsSection?.bookingSteps?.stepD?.body?.[language]}
              </p>
            </li>
          </MaskText>{" "}
          {/* {BOOKING.map((step, index) => (
            <MaskText stagger={index} key={step.id}>
              <li className={styles.item}>
                <div className={styles.iconContainer}>
                  <DecorStar className={styles.icon} />
                  <span className={styles.index}>{index + 1}</span>
                </div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </li>
            </MaskText>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

export default Booking;
