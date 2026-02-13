import clsx from "clsx";
import styles from "./customcheckbox.module.css";

type Props = { checked: boolean; text: string; onToggle: () => void };

function CustomCheckBox({ checked, text, onToggle }: Props) {
  return (
    <label className={styles.checkBoxLabel}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        name="checked"
        checked={checked}
        onChange={onToggle}
      />
      <p
        className={clsx(styles.customCheckbox, checked && styles.checkedBg)}
      ></p>
      <span className={styles.text}>{text}</span>
    </label>
  );
}

export default CustomCheckBox;
