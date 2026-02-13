import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
// Utils
import { splitStringByWord } from "../../utils/splitStringByWord";
// Styles
import s from "./styles.module.css";

interface Props {
  children: string;
  accentColor?: boolean;
  inview?: string;
}

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLinkInview = ({ children }: Props) => {
  const subTitle = splitStringByWord(children);
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {
    once: true,
    margin: `0px 0px -20% 0px`,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("hovered");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      className={s.initialDiv}
    >
      <div>
        {subTitle.map((l, i) => (
          <motion.span
            key={`initial-${i}`}
            variants={{
              initial: { y: 0, opacity: 1 },
              hovered: { y: "-100%", opacity: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className={s.inlineBlock}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>

      <div aria-hidden className={s.coverAbsolute}>
        {subTitle.map((l, i) => (
          <motion.span
            key={`hovered-${i}`}
            variants={{
              initial: { y: "100%", opacity: 0 },
              hovered: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className={s.inlineBlock}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
