import { cubicBezier } from "framer-motion";

export const textRevealMotion = (delay: number, i: number) => {
  return {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay * i,
        duration: 0.8,
        ease: cubicBezier(0.25, 0.1, 0.5, 1),
      },
    },
  };
};
