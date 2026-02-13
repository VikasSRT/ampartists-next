import { motion, type Variants } from "motion/react";
import { splitStringByWord } from "../../utils/splitStringByWord";
import type { JSX } from "react";
import s from "./styles.module.css";

type Props = {
  text: string;
  сlassName?: string;
  tag: keyof JSX.IntrinsicElements;
};

const chartVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  reveal: { opacity: 1, x: 0 },
};

function AnimatedText({ text, tag, сlassName }: Props) {
  const subTitle = splitStringByWord(text);
  const MotionTag = motion(tag);
  return (
    <MotionTag
      className={сlassName}
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {subTitle.map((item, index) => (
        <motion.span
          key={`${index}-${item}`}
          transition={{ duration: 0.1, ease: "easeOut" }}
          variants={chartVariants}
          className={s.inlineBlock}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default AnimatedText;
