"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// Components
import BouncingBallFooter from "../BouncingBall/BouncingBallFooter";
import TriangleAnimation from "../TriangleAnimation/TriangleAnimation";
//Images
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
//Utils
import { ANCHORS, ROUTES } from "../../utils/constants";
//Styles
import styles from "./footer.module.css";
import { useTranslation } from "react-i18next";
import CustomModal from "../CustomModal/CustomModal";
import PopupContacts from "../Popups/PopupContacts";
import { useState } from "react";

function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const handleAnchorClick = (hash: string) => {
    if (pathname === "/") {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${hash}`);
    }
  };
  return (
    <footer className={styles.footer}>
      <Link href={ROUTES.home} className={styles.logoContainer}>
        <AnimatedLogo />
      </Link>
      <BouncingBallFooter />
      <nav className={styles.navPanel}>
        <ul className={styles.list}>
          {/* <li className={styles.item}>
            <button onClick={() => handleAnchorClick(ANCHORS.artists.anchor)}>
              Artists
            </button>
          </li> */}
          <li className={styles.item}>
            <button
              onClick={() => handleAnchorClick(ANCHORS.howItWorks.anchor)}
            >
              {t("howItWorks")}
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={togglePopup}>Contact</button>
          </li>
        </ul>
      </nav>
      <ul className={styles.links}>
        <li className={styles.item}>
          <Link href="#">{t("terms")}</Link>
        </li>
        <li className={styles.item}>
          <Link href="#">{t("privacy")}</Link>
        </li>
        {/* <li className={styles.item}>
          <Link href="#">Cookies</Link>
        </li> */}
      </ul>
      <div className={styles.triangle}>
        <TriangleAnimation />
      </div>
      <CustomModal open={isPopupOpen} onClose={togglePopup}>
        <PopupContacts onClose={togglePopup} />
      </CustomModal>
    </footer>
  );
}

export default Footer;
