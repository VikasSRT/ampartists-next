import clsx from "clsx";
import {
  DIRECTION_TO_LANGUAGE,
  LANGUAGE_TO_DIRECTION,
  LANGUEGES,
  type LanguageKey,
} from "../../utils/constants";
import { useDirection } from "../../context/DirectionContext";
import styles from "./langSwitcher.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { direction, setDirection } = useDirection();

  const { i18n } = useTranslation();

  const currentLang = DIRECTION_TO_LANGUAGE[direction];

  const handleChange = (langKey: LanguageKey) => {
    setDirection(LANGUAGE_TO_DIRECTION[langKey]);
    document.documentElement.style.setProperty("--dir", direction);
    i18n.changeLanguage(langKey);
    localStorage.setItem("i18nextLng", langKey);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--dir", direction);
  }, [direction]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={clsx(styles.button, currentLang === "en" && styles.active)}
        onClick={() => handleChange("en")}
      >
        {LANGUEGES.en}
      </button>
      <div className={styles.devider} />
      <button
        type="button"
        className={clsx(styles.button, currentLang === "ar" && styles.active)}
        onClick={() => handleChange("ar")}
      >
        {LANGUEGES.ar}
      </button>
    </div>
  );
}
