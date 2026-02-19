// Components
import { MaskText } from "../../AnimatedText/MaskText";
import Tours from "../Tours/Tours";
// Images
import Circle from "../../../assets/icons/ball.svg";
import PlayYoutube from "../../../assets/icons/play-youtube.svg";
import Spotify from "../../../assets/icons/spotify.svg";
import Star from "../../../assets/icons/star.svg";
// Styles
import styles from "./listen.module.css";
import YouTubeEmbed from "./YouTubeEmbed";
import { useTranslation } from "react-i18next";
import DeviderAnimated from "../../Devider/DeviderAnimated";
import Link from "next/link";

const ListenSpotify = ({ playlistLink }) => {
  const url = (playlistLink || "").split("?")[0];
  const embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/");

  return (
    <div style={{ padding: "1rem" }}>
      <iframe
        style={{ borderRadius: "12px" }}
        src={`${embedUrl}?utm_source=generator`}
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen
        title="Spotify Playlist"
      ></iframe>
    </div>
  );
};

function Listen({ artistInfo }) {
  const youtubeLink = artistInfo?.youtube?.split(",");
  const { t } = useTranslation();

  if (
    !artistInfo!?.spotify &&
    !artistInfo?.youtube &&
    (!artistInfo?.tour_dates || !artistInfo?.tour_dates?.length)
  ) {
    return;
  }

  return (
    <>
      <DeviderAnimated className="logo" />

      <div className={styles.container}>
        <div className={styles.listen}>
          {artistInfo?.spotify && (
            <>
              <MaskText stagger={0.1}>
                <p className={styles.titleListen}> {t("listenWatch")}</p>
              </MaskText>
              <div className={styles.spotiFyContainer}>
                <MaskText stagger={1}>
                  <div className={styles.spotiFyTitle}>
                    <Spotify
                      className={styles.spotiFyTitle}
                    />
                    <p> {t("listenSpotify")}</p>
                  </div>
                </MaskText>
                <ListenSpotify playlistLink={artistInfo?.spotify} />
              </div>
            </>
          )}

          {artistInfo?.youtube && (
            <div className={styles.youtubeContainer}>
              <MaskText stagger={3}>
                <div className={styles.spotiFyTitle}>
                  <PlayYoutube className={styles.spotiFyTitle} />
                  <p>{t("watchYoutube")}</p>
                </div>
              </MaskText>
              <ul className={styles.youtubeList}>
                {youtubeLink.map((url, index) => (
                  <MaskText stagger={index} key={index}>
                    <YouTubeEmbed key={index} urlOrId={url} />
                  </MaskText>
                ))}
                {/* {youtubeArray.map((item, index) => (
                  <MaskText stagger={index} key={item.id}>
                    <li className={styles.youtubeItem}>
                      <img
                        src={item.preview}
                        alt={`Youtube Preview ${index + 1}`}
                        className={styles.youtubePreview}
                      />
                      <Link href={item.url}>
                        <PlayYoutubeBtn className={styles.playYoutubeBtn} />
                      </Link>
                    </li>
                  </MaskText>
                ))} */}
              </ul>
            </div>
          )}
        </div>

        <Tours artistInfo={artistInfo} />
        <div className={styles.decorRight}>
          <Star className={styles.decorIcon} />
        </div>
        <div className={styles.decorLeft}>
          <Circle className={styles.decorIconCircle} />
        </div>
      </div>
    </>
  );
}

export default Listen;
