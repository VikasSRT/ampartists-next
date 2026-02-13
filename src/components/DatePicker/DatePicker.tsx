import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../CustomSelect/customSelect.module.css";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  classNameSelect?: string;
  icon?: ReactNode;
  blockedDates?: string[];
};

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default function DatePicker({
  label,
  name,
  value,
  onChange,
  placeholder = "Select date...",
  className,
  classNameLabel,
  classNameSelect,
  icon,
  blockedDates,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const disabledDates = blockedDates?.map((d) => new Date(d)) || [];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString(), name);
    setIsOpen(false);
  };

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
        <p className={clsx(styles.selected)}>
          {selectedDate ? format(selectedDate, "dd.MM.yyyy") : placeholder}
        </p>
        <span className={styles.arrow} />
      </div>

      {isOpen && (
        <div className={styles.dropDownContainer}>
          <Calendar
            onChange={(date) => handleDateChange(date as Date)}
            value={selectedDate || new Date()}
            locale="en-US"
            minDate={new Date()}
            tileDisabled={({ date }) =>
              disabledDates.some((d) => isSameDay(d, date))
            }
            tileClassName={({ date, view }) => {
              if (view === "month") {
                if (disabledDates.some((d) => isSameDay(d, date))) {
                  return styles.blockedDate;
                }
              }
              return null;
            }}
          />
        </div>
      )}
    </div>
  );
}
