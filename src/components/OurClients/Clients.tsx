import React from "react";
import Marquee from "react-fast-marquee";
import Devider from "../Devider/Devider";
import Partner1 from "../../assets/images/partners logos-01.png";
import Partner2 from "../../assets/images/partners logos-02.png";
import Partner3 from "../../assets/images/partners logos-03.png";
import Partner4 from "../../assets/images/partners logos-04.png";
import Partner5 from "../../assets/images/partners logos-05.png";
import Partner6 from "../../assets/images/partners logos-06.png";
import Partner7 from "../../assets/images/partners logos-07.png";
import Partner8 from "../../assets/images/partners logos-08.png";
import styles from "../Missions/missions.module.css";

const logos = [
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
  Partner7,
  Partner8,
];

const Clients: React.FC = () => {
  return (
    <section className="bg-black text-white overflow-hidden">
      <Devider variant="default" />
      <div className="w-full flex justify-center px-4 my-14 sm:my-12">
        <h3 className={styles.title}>Our Clients</h3>
      </div>

      <div className="relative mb-10">
        <Marquee
          gradient={true}
          gradientColor="#000000"
          gradientWidth={100}
          speed={80}
          pauseOnHover={true}
          autoFill={true}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 flex items-center justify-center cursor-pointer transition-all duration-300 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={logo.src}
                alt={`Client ${index}`}
                className="max-h-[152px] min-w-[150px] w-auto object-contain mx-[15px] block"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Clients;
