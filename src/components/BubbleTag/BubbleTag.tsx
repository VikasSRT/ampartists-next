import styles from "./bubbleTag.module.css";

type Props = {
  label: string;
  color?: string;
};

const getBubbleCount = (length: number): number => {
  if (length <= 3) return 3;
  if (length <= 6) return 3;
  if (length <= 9) return 4;
  return Math.ceil(length / 1.8);
};

export default function BubbleTag({ label, color = "#8181D5" }: Props) {
  const bubbles = getBubbleCount(label.length);
  const bubblesArray = Array.from({ length: bubbles });

  return (
    <div className={styles.wrapper}>
      <div className={styles.bubbles}>
        {bubblesArray.map((_, i) => (
          <div
            key={i}
            className={styles.bubble}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
