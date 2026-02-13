import Link from "next/link";
// Images
import podcast from "../../assets/images/podcast.png";
import SpotifyText from "../../assets/icons/spotify-logo-text.svg";
import Backward from "../../assets/icons/backward.svg";
import Forward from "../../assets/icons/forward.svg";
import Dots from "../../assets/icons/tripleDots.svg";
import PlayButton from "../../assets/icons/play-button.svg";
// Styles
import styles from "./spotifyItem.module.css";

type Props = {};

function SpotifyItem({ playlistLink }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={podcast} alt="Podcast" className={styles.image} />
        <div className={styles.wrapper}>
          <p className={styles.title}>Episode Title</p>
          <p className={styles.title}>Podcast Name</p>
        </div>
        <SpotifyText className={styles.spotifyIcon} />
      </div>
      <div className={styles.controls}>
        <Backward className={styles.icon} />
        <div className={styles.line}></div>
        <Forward className={styles.icon} />
        {/* <div className={styles.time}>00:00</div> */}
        <Dots className={styles.icon} />
        <Link href="#" className={styles.playButton}>
          <PlayButton />
        </Link>
      </div>
    </div>
  );
}

export default SpotifyItem;
