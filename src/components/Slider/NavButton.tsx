import { Swiper } from "swiper";
import type { RefObject } from "react";
// Images
import Arrow from "../../assets/icons/arrowCustom.svg";
// Styles
import s from "./slider.module.css";

type Props = {
  swiper: RefObject<Swiper | null>;
};

export const NavBtnPrev = ({ swiper }: Props) => {
  return (
    <button
      type="button"
      className={s.btnPrev}
      onClick={() => swiper.current?.slidePrev()}
    >
      <Arrow className={s.arrow} />
    </button>
  );
};

export const NavBtnNext = ({ swiper }: Props) => {
  return (
    <button
      type="button"
      className={s.btnNext}
      onClick={() => swiper.current?.slideNext()}
    >
      <Arrow className={s.arrow} />
    </button>
  );
};
