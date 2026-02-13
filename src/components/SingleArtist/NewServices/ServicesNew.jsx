import React from "react";
import styles from "./NewServices.module.css";
import { MaskText } from "../../AnimatedText/MaskText";
import clsx from "clsx";
import DecorStar from "../../../assets/icons/decor-star.svg?react";
// import DecorStar from "../../assets/icons/decor-star.svg?react";
function ServicesNew({ services, otherArrangement }) {
  console.log("servicesssss", services);
  const referThis = {
    Duo: "Solo piano and vocal acts",
    Other: "Custom song request",
    Quartet: " Quartet arrangement",
    Solo: "Solo piano and vocal acts",
    Trio: "Jazz trio arrangement",
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MaskText stagger={1}>
          <h2 className={styles.title}>
            <span className={styles.titleGreen}>Services</span>
          </h2>
        </MaskText>
        <MaskText stagger={2}>
          <p className={styles.subTitle}>
            {/* We've taken everything you hate about booking, the back-and-forth,
          the confusion, the endless emails, and made it simple. */}
          </p>
        </MaskText>

        <ul className={styles.list}>
          {Object.entries(services)
            .filter(([key, value]) => value)
            .map(([key], i) => (
              <MaskText>
                <li className={styles.item}>
                  <div className={styles.iconContainer}>
                    <DecorStar className={styles.icon} />
                    <span className={styles.index}>{i + 1}</span>
                  </div>
                  <p className={styles.stepTitle}>
                    {(() => {
                      const text =
                        key === "Other"
                          ? otherArrangement
                            ? otherArrangement
                            : "Other"
                          : key;
                      return text.slice(0, 40);
                      {
                        /* const words = text.split(" ");
                      return (
                        words.slice(0, 5).join(" ") +
                        (words.length > 5 ? "..." : "")
                      ); */
                      }
                    })()}
                    {/* {key === "Other"
                      ? otherArrangement
                        ? otherArrangement
                        : "Other"
                      : key} */}
                  </p>
                  {/* <p className={styles.stepTitle}>{referThis[key]}</p> */}
                  {/* <p className={styles.stepDescription}>{key}</p> */}
                </li>
              </MaskText>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ServicesNew;
