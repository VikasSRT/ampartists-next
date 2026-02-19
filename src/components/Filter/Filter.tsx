import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useDirection } from "../../context/DirectionContext";
// Componetns
import CustomSelectWithCheckbox from "../CustomSelect/CustomSelectWithCheckbox";
import RangeSlider from "../Range/Range";
import Button from "../Button/Button";
// Images
import FilterIcon from "../../assets/icons/filter.svg";
import Location from "../../assets/icons/location.svg";
import Genre from "../../assets/icons/genre.svg";
// Utils
import type { ICheckbox } from "../../types/types";
// Styles
import styles from "./filter.module.css";

type Props = {
  formData: {
    location: ICheckbox[];
    budget: { from: string; to: string };
    genre: ICheckbox[];
  };
  handleFilterChange: (value: string | ICheckbox[], name: string) => void;
  optionsLocation: string[];
  optionsGenre: string[];
  clear: () => void;
  submit: () => void;
};

function Filter({
  formData,
  handleFilterChange,
  optionsLocation,
  optionsGenre,
  clear,
  submit,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { direction } = useDirection();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      popupRef.current &&
      !popupRef.current.contains(target) &&
      wrapperRef.current &&
      !wrapperRef.current.contains(target)
    ) {
      setIsOpen(false);
    }
  };

  const handleRangeChange = (val: {
    from: number | string;
    to: number | string;
  }) => {
    handleFilterChange(String(val.from), "budget.from");
    handleFilterChange(String(val.to), "budget.to");
  };

  const handleSubmit = () => {
    togglePopup();
    submit();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={wrapperRef} onClick={togglePopup}>
        <FilterIcon viewBox="0 0 18 20" className={styles.icon} />
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          className={clsx(
            styles.dropDownContainer,
            direction === "rtl" && styles.rtl,
          )}
        >
          <CustomSelectWithCheckbox
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleFilterChange}
            options={optionsLocation}
            icon={<Location className={styles.icon} />}
            className={styles.fullWidth}
            classNameSelect={styles.fullWidth}
          />
          <RangeSlider
            min={0}
            max={20000}
            // step={100}
            value={{
              from: Number(formData.budget.from) || 0,
              to: Number(formData.budget.to) || 0,
            }}
            onChange={handleRangeChange}
            direction={direction}
          />
          <CustomSelectWithCheckbox
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleFilterChange}
            options={optionsGenre}
            icon={<Genre className={styles.icon} />}
            className={styles.fullWidth}
            classNameSelect={styles.fullWidth}
          />
          <div className={styles.buttonContainer}>
            <Button
              text="Clear all"
              fullWidthAll
              className="white"
              onClick={clear}
            />
            {/* <Button
              text="Apply"
              fullWidthAll
              onClick={handleSubmit}
              className="green"
            /> */}
          </div>
          <Button
            text="Search"
            fullWidthAll
            onClick={handleSubmit}
            onlyMobile
          />
        </div>
      )}
    </div>
  );
}

export default Filter;
