import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import styles from "./bouncingBal.module.css";

export default function BouncingBall() {
  const { ref: svgRef, inView } = useInView({
    triggerOnce: false,
    threshold: [0.5],
  });

  return (
    <svg
      viewBox="0 0 316 475"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles.bouncing, inView && styles.animate)}
      ref={svgRef}
    >
      <circle
        className={styles.ball}
        cx="158.1"
        cy="158.096"
        r="158.1"
        fill="#8181D5"
      />
      <path
        d="M316.2 316.775C316.2 358.706 299.543 398.919 269.894 428.569C240.244 458.218 200.031 474.875 158.1 474.875C116.169 474.875 75.9559 458.218 46.3064 428.569C16.6569 398.919 6.33137e-06 358.706 0 316.775L158.1 316.775H316.2Z"
        fill="#2F4ACB"
      />
    </svg>
  );
}
