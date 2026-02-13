"use client";
import { useState, useRef, useEffect, type ReactNode } from "react";
import clsx from "clsx";
// Components
import CustomCheckBox from "../CustomCheckbox/CustomCheckBox";
// Types
import type { ICheckbox } from "../../types/types";
// Styles
import styles from "./customSelect.module.css";

type Props = {
  label: string;
  name: string;
  value: ICheckbox[];
  onChange: (value: ICheckbox[], name: string) => void;
  placeholder?: string;
  options: string[];
  className?: string;
  classNameLabel?: string;
  classNameSelect?: string;
  icon?: ReactNode;
};

export default function CustomSelectWithCheckbox({
  label,
  name,
  value,
  onChange,
  placeholder = "Select...",
  options,
  className,
  classNameLabel,
  classNameSelect,
  icon,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const valueNames = value
    .filter((item) => item.checked === true)
    .map((item) => item.name);

  const handleSelect = (option: string) => {
    const updated = value.map((item) =>
      item.name === option ? { ...item, checked: !item.checked } : item
    );

    onChange(updated, name);
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
          {
            [styles.open]: isOpen,
          },
          classNameSelect
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <p className={clsx(styles.selected)}>
          {valueNames.join(", ") || placeholder}
        </p>
        <span className={styles.arrow} />
      </div>

      {isOpen && (
        <div className={styles.dropDownContainer}>
          <ul className={styles.dropdown}>
            {options.map((opt) => {
              const item = value.find((v) => v.name === opt);
              const isChecked = item?.checked || false;

              return (
                <li key={opt} className={clsx(styles.option)}>
                  <CustomCheckBox
                    checked={isChecked}
                    text={opt}
                    onToggle={() => handleSelect(opt)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
