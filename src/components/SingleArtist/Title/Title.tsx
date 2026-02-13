import type { ReactNode } from "react";
import styles from "./title.module.css";

type Props = { children: ReactNode };

export default function Title({ children }: Props) {
  return <p className={styles.title}>{children}</p>;
}
