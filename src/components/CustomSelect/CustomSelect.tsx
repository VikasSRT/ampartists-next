"use client";
import { useState, useRef, useEffect, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./customSelect.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  options: string[];
  className?: string;
  classNameLabel?: string;
  classNameSelect?: string;
  classNameOption?: string;
  icon?: ReactNode;
};

export default function CustomSelect({
  label,
  name,
  value,
  onChange,
  placeholder = "Select...",
  options,
  className,
  classNameLabel,
  classNameSelect,
  classNameOption,
  icon,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option, name);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx(styles.wrapper, className)} ref={ref}>
      {label && (
        <label htmlFor={name} className={clsx(styles.label, classNameLabel)}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.selectBox,
          !icon && styles.selectBoxWOIcon,
          {
            [styles.open]: isOpen,
          },
          classNameSelect
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <p className={clsx(styles.selected)}>{value || placeholder}</p>
        <span className={styles.arrow} />
      </div>

      {isOpen && (
        <div className={styles.dropDownContainer}>
          <ul className={styles.dropdown}>
            {options?.map((opt) => (
              <li
                key={opt}
                className={clsx(
                  styles.option,
                  {
                    [styles.selectedOption]: opt === value,
                  },
                  classNameOption && classNameOption
                )}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
