import type { ChangeEvent, ReactNode } from "react";
import clsx from "clsx";
import styles from "./input.module.css";
import Info from "../../assets/icons/info.svg";
import { useDirection } from "../../context/DirectionContext";

type Props = {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "textarea";
  icon?: ReactNode;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  rows?: number;
  infoBtn?: boolean;
};

export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  className,
  classNameLabel,
  classNameInput,
  rows = 2,
  infoBtn,
}: Props) {
  const { direction } = useDirection();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    onChange(value, name);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <label htmlFor={name} className={clsx(styles.label, classNameLabel)}>
        {label}
        {infoBtn && (
          <div className={styles.tooltipWrapper}>
            <Info className={styles.infoIcon} />
            <p
              className={clsx(
                styles.tooltipText,
                direction === "rtl" && styles.right
              )}
            >
              AMP will provide the necessary Hospitality requirements for
              the artist to perform at your event, and this will be included as
              part of the budget.
            </p>
          </div>
        )}
      </label>

      <div className={styles.inputContainer}>
        {icon && <div className={styles.icon}>{icon}</div>}

        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={clsx(styles.input, classNameInput)}
            rows={rows}
          />
        ) : (
          <input
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={clsx(styles.input, classNameInput)}
            type={type}
          />
        )}
      </div>
    </div>
  );
}
