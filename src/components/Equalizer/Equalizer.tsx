import "./equalizer.css";

export default function Equalizer() {
  const bars = [
    { x: 0.9375, y: 23.625, height: 7.3125 },
    { x: 30.1875, y: 14.0625, height: 16.875 },
    { x: 15.5625, y: 0, height: 44.4375 },
    { x: 44.8125, y: 0, height: 30.9375 },
  ];

  const animationClasses = [
    "eq-style-0",
    "eq-style-1",
    "eq-style-2",
    "eq-style-3",
    "eq-style-4",
  ];

  const randomClasses = bars.map(() => {
    const randomIndex = Math.floor(Math.random() * animationClasses.length);
    return animationClasses[randomIndex];
  });

  return (
    <svg viewBox="0 0 53 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      {bars.map((bar, i) => (
        <rect
          key={i}
          className={`eq-bar ${randomClasses[i]}`}
          x={bar.x}
          y={bar.y}
          width="7.3125"
          height={bar.height}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
