import { SwiperSlide } from "swiper/react";
import styles from "./slider.module.css";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

function SliderItem({ children }: Props) {
  return <SwiperSlide className={styles.sliderItem}>{children}</SwiperSlide>;
}

export default SliderItem;
