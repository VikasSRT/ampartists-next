import { MaskText } from "../AnimatedText/MaskText";
import Title from "../SingleArtist/Title/Title";
import Slider from "../Slider/Slider";
import styles from "./gallery.module.css";
import galleriImg1 from "../../assets/images/gallery/1.png";
import galleriImg2 from "../../assets/images/gallery/2.png";
import galleriImg3 from "../../assets/images/gallery/3.png";
import { useTranslation } from "react-i18next";

export type ArtistType = {
  id: number;
  stage_name: string;
  real_name: string;
  location: string;
  instagram: string;
  facebook: string;
  twitter: string;
  website: string;
  spotify: string;
  soundcloud: string;
  youtube: string;
  contact_number: string;
  genre: string;
  performance_formats: string | null;
  record_label_name: string;
  average_booking_rate: string;
  is_independent: boolean;
  display_event_calendar: boolean;
  email: string;
  biography: string;
  approval_status: "approved" | "pending" | "rejected"; // adjust as per actual values
  submitted_at: string;
  cover_image: string | null;
  profile_image: string | null;
  crew_members: any[]; // Replace `any` with actual type if known
  marketing_images: any[];
  tags: any[];
  is_verified: boolean;
  is_promoted: boolean;
  is_international: boolean;
  blocked_dates: any[];
  tour_dates: any[];
  gallery_images: any[];
};

type Props = { artistInfo: ArtistType };

function Gallery({ artistInfo }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <MaskText>
        <Title>{t("gallery")}</Title>
      </MaskText>
      <Slider
        galleryList={artistInfo?.marketing_images?.map(({ image }) => image)}
      />
    </div>
  );
}

export default Gallery;
