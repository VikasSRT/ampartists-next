import styles from "./floatingButton.module.css";
import Calendar from "../../assets/icons/calendarBtn.svg";
import clsx from "clsx";

type Props = {
  onClick: () => void;
  showButton: boolean;
};

function FloatingButton({ onClick, showButton }: Props) {
  return (
    <button
      type="button"
      className={clsx(styles.container, showButton && styles.show)}
      onClick={onClick}
    >
      <Calendar className={styles.icon} />
    </button>
  );
}

export default FloatingButton;
