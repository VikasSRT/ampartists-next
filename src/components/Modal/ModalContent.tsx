import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./modal.module.css";

type Props = { className?: string; showModal?: boolean; children: ReactNode };

function ModalContent({ className, showModal, children }: Props) {
  return (
    <div
      className={clsx(
        styles.content,
        showModal && styles.opacity,
        className && styles[className]
      )}
    >
      {children}
    </div>
  );
}

export default ModalContent;
