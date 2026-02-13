import { splitStringByWord } from "../../utils/splitStringByWord";
import { motion } from "framer-motion";
import s from "./styles.module.css";
import { textRevealMotion } from "../../utils/textRevealMotion";

type PropsTitleByWord = { text: string };

export function TitleByWord({ text }: PropsTitleByWord) {
  const subTitle = splitStringByWord(text);
  return (
    <div className={s.subTitle}>
      {subTitle.map((l, i) => (
        <motion.span
          initial="initial"
          animate="animate"
          variants={textRevealMotion(0.1, i)}
          className={s.inlineBlock}
          key={i}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
  );
}
