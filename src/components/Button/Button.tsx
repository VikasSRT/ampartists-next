import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./button.module.css";

type Props = {
  text: string;
  padding?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children?: ReactNode;
  fullWidth?: boolean;
  fullWidthAll?: boolean;
  onlyMobile?: boolean;
  fontSize?: string;
};

function Button({
  text,
  padding,
  onClick,
  type = "button",
  className,
  children,
  fullWidth,
  fullWidthAll,
  onlyMobile,
  fontSize,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ padding: padding, fontSize: fontSize }}
      className={clsx(
        styles.button,
        className && styles[className],
        fullWidth && styles.fullWidth,
        fullWidthAll && styles.fullWidthAll,
        onlyMobile && styles.onlyMobile
      )}
    >
      <span>{text}</span>
      {children}
    </button>
  );
}

export default Button;
