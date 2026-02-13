import { useEffect, useState } from "react";
import Budget from "../../assets/icons/budget.svg";
import styles from "./range.module.css";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: { from: number | string; to: number | string };
  onChange: (value: { from: number | string; to: number | string }) => void;
  direction?: "ltr" | "rtl";
};

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  direction,
}: Props) {
  const [from, setFrom] = useState<number | string>(value.from);
  const [to, setTo] = useState<number | string>(value.to);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setFrom(value.from);
    setTo(value.to);
  }, [value]);

  useEffect(() => {
    const fromNum = Number(from);
    const toNum = Number(to);

    if (from !== "" && to !== "" && fromNum > toNum) {
      setError("The start value cannot be higher than the end value of the budget");
    } else {
      setError("");
    }
  }, [from, to]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFrom("");
      onChange({ from: "", to });
      return;
    }
    const val = +e.target.value;
    setFrom(val);
    onChange({ from: val, to });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTo("");
      onChange({ from, to: "" });
      return;
    }
    const val = +e.target.value;
    setTo(val);
    onChange({ from, to: val });
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const val = +e.target.value;

    if (type === "from") {
      setFrom(val);
      onChange({ from: val, to });
    } else {
      setTo(val);
      onChange({ from, to: val });
    }
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const fromNum = Number(from);
  const toNum = Number(to);

  const fromForBar = isNaN(fromNum) ? min : clamp(fromNum, min, max);
  const toForBar = isNaN(toNum) ? max : clamp(toNum, min, max);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        <div className={styles.label}>Budget</div>
        <div className={styles.container}>
          <div className={styles.wrapperInput}>
            <div className={styles.inputContainer}>
              <div className={styles.icon}>
                <Budget />
              </div>
              <input
                value={from || ""}
                onChange={handleFromChange}
                placeholder="0"
                className={styles.input}
                type="number"
                min={min}
              />
            </div>
          </div>
          <div className={styles.line} />
          <div className={styles.wrapperInput}>
            <div className={styles.inputContainer}>
              <div className={styles.icon}>
                <Budget />
              </div>
              <input
                value={to || ""}
                onChange={handleToChange}
                placeholder="20000"
                className={styles.input}
                type="number"
                max={max}
              />
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 text-[14px] mt-2 pl-2 leading-[20px]">{error}</div>}
      </div>

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={from}
          onChange={(e) => handleRangeChange(e, "from")}
          className={styles.thumbLeft}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={to}
          onChange={(e) => handleRangeChange(e, "to")}
          className={styles.thumbRight}
        />
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderRange}
            style={
              direction === "rtl"
                ? {
                    right: `${((fromForBar - min) / (max - min)) * 100}%`,
                    width: `${((toForBar - fromForBar) / (max - min)) * 100}%`,
                    left: "unset",
                  }
                : {
                    left: `${((fromForBar - min) / (max - min)) * 100}%`,
                    width: `${((toForBar - fromForBar) / (max - min)) * 100}%`,
                    right: "unset",
                  }
            }
          />
        </div>
      </div>
    </div>
  );
}
