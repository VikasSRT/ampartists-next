import clsx from "clsx";

// Images
import AMPLogo from "../../assets/icons/devider/AMPLogo.svg";
import Purple from "../../assets/icons/devider/purpleElement.svg";

import AnimatedPurple from "../../assets/icons/devider/download.svg";
// Styles
import styles from "./devider.module.css";

type Props = {
  className: "green" | "transparent" | "logo" | "transparentGreen";
};

export default function DeviderAnimated({ className }: Props) {
  return (
    <ul
      className={clsx(
        styles.list,
        className === "green" && styles.green,
        className === "transparent" && styles.transparent,
        className === "logo" && styles.logoList,
        className === "transparentGreen" && styles.transparentGreen
      )}
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <li
          key={i}
          className={clsx(styles.item, className === "logo" && styles.itemLogo)}
        >
          {className === "logo" && <AMPLogo className={styles.iconLogo} />}
          {className === "transparent" && (
            <AnimatedPurple className={styles.iconFull} />
          )}
          {className === "green" && <Purple className={styles.icon} />}
          {className === "transparentGreen" && (
            <AnimatedPurple className={styles.iconFullGreen} />
          )}
        </li>
      ))}
    </ul>
  );
}
