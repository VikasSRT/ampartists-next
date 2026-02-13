import clsx from "clsx";
import Icon from "../../assets/icons/triangle.svg";
import styles from "./button.module.css";

type Props = {
  text: string;
  padding?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  href?: string;
  isExternal?: boolean;
};

function ButtonWithIcon({
  text,
  padding,
  onClick,
  type = "button",
  className,
  href,
  isExternal = false,
}: Props) {
  const commonProps = {
    style: { padding },
    className: clsx(styles.buttonIcon, className && styles[className]),
  };

  if (href) {
    return (
      <a
        href={href}
        {...commonProps}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <span>{text}</span>
        <Icon className={styles.icon} />
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} {...commonProps}>
      <span>{text}</span>
      <Icon className={styles.icon} />
    </button>
  );
}

export default ButtonWithIcon;
