"use client";
import React from "react";
import styles from "./soundwaves.module.css";

interface SoundWavesProps {
  green?: boolean;
}

const SoundWaves: React.FC<SoundWavesProps> = ({ green }) => {
  // Use deterministic values based on index to prevent hydration mismatch
  const generateDelay = (index: number) => ((index * 37) % 200) / 100;

  const createBars = (count: number) => {
    const heights = [
      8, 12, 6, 16, 10, 14, 8, 18, 12, 20, 10, 16, 8, 24, 12, 20, 8, 16, 10, 14,
      18, 10, 22, 14, 8, 12, 20, 10, 16, 8,
    ];
    const animations = [
      styles.animateWave1,
      styles.animateWave2,
      styles.animateWave3,
      styles.animateWave4,
      styles.animateWave5,
    ];

    return Array.from({ length: count }, (_, i) => {
      const height = heights[i % heights.length];
      const animation = animations[i % animations.length];

      return (
        <div
          key={i}
          className={`${styles.bar} ${animation} ${green && styles.green}`}
          style={{
            height: `${height}px`,
            animationDelay: `${generateDelay(i)}s`,
          }}
        />
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.soundWaves} ${styles.mobile}`}>
        {createBars(50)}
      </div>
      <div className={`${styles.soundWaves} ${styles.tablet}`}>
        {createBars(80)}
      </div>
      <div className={`${styles.soundWaves} ${styles.desktop}`}>
        {createBars(130)}
      </div>
    </div>
  );
};

export default SoundWaves;
