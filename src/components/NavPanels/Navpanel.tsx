"use client";

import { usePathname, useRouter } from "next/navigation";
import { ANCHORS } from "../../utils/constants";
import styles from "./navpanel.module.css";
import { useTranslation } from "react-i18next";

function Navpanel() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const router = useRouter();

  const handleAnchorClick = (hash: string) => {
    if (pathname === "/") {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${hash}`);
    }
  };
  return (
    <nav>
      <ul className={styles.list}>
        {/* <li className={styles.item}>
          <button onClick={() => handleAnchorClick(ANCHORS.artists.anchor)}>
            Artists
          </button>
        </li> */}
        <li className={`${styles.item} flex gap-5`}>
          <button
            onClick={() => handleAnchorClick(ANCHORS.howItWorks.anchor)}
            className="!text-[16px]"
          >
            {t("howItWorks")}
          </button>
          <button
            onClick={() => handleAnchorClick(ANCHORS.findYourArtist.anchor)}
            className="!text-[16px]"
          >
            {t("findYourArtist")}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navpanel;
