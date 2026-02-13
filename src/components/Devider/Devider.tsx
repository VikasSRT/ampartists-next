import clsx from "clsx";
import styles from "./devider.module.css";

type Props = {
  variant: "default" | "purple" | "logo";
  visible?: "mobile" | "desktop";
};

export default function Devider({ variant, visible }: Props) {
  return (
    <div
      className={clsx(
        variant === "default" && styles.default,
        variant === "purple" && styles.purple,
        variant === "logo" && styles.logo,
        visible === "mobile" && styles.mobile,
        visible === "desktop" && styles.desktop
      )}
    />
  );
}
