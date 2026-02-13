import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./modal.module.css";

type Props = {
  onClose: () => void;
  showModal: boolean;
  children?: ReactNode;
  className?: string;
};

export default function Modal({
  onClose,
  showModal,
  children,
  className,
}: Props) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal"));
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add(styles.overvlow);
      return;
    }
    document.body.classList.remove(styles.overvlow);
  }, [showModal]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={clsx(
        styles.modalBackDrop,
        showModal && styles.opacity,
        className && styles[className]
      )}
      onClick={() => onClose()}
    >
      {children}
    </div>,
    modalRoot
  );
}
