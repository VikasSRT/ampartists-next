import { useTranslation } from "react-i18next";
import styles from "./artisttile.module.css";

type Props = {};

function ArtistTitle({}: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("discoverArtists")}</h1>
      <p className={styles.subTitle}>{t("findTalent")}</p>
    </div>
  );
}

export default ArtistTitle;
