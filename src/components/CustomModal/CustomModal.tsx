import { useEffect, type ReactNode } from "react";
import clsx from "clsx";
import Modal from "react-modal";
import { useDirection } from "../../context/DirectionContext";
import styles from "./custommodal.module.css";

type Props = { children: ReactNode; open: boolean; onClose: () => void, shouldCloseOnOverlayClick?: boolean };

function CustomModal({ children, open, onClose, shouldCloseOnOverlayClick = true }: Props) {
  const { direction } = useDirection();
  const customStyles = {
    content: {
      top: "20px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: direction === "rtl" ? "0" : "-50%",
      transform: "translate(-50%, 0)",
      background: "transparent",
      border: "none",
      padding: "0",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(8px)",
    },
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add(styles.overvlow);
      return;
    }
    document.body.classList.remove(styles.overvlow);
  }, [open]);
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Modal"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(styles.closeIcon, direction === "rtl" && styles.left)}
        onClick={onClose}
      >
        <g clipPath="url(#clip0_106_1043)">
          <path
            d="M18 6L6 18"
            stroke="#6E7684"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#6E7684"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_106_1043">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {children}
    </Modal>
  );
}

export default CustomModal;
