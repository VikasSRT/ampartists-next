import { TESTIMONIALS } from "../../../utils/constants";
import { MaskText } from "../../AnimatedText/MaskText";
import Slider from "../../Slider/Slider";
import Title from "../Title/Title";
import styles from "./testimonials.module.css";

function Testimonials() {
  return (
    <div className={styles.container}>
      <MaskText>
        <Title>Testimonials</Title>
      </MaskText>
      <Slider testimonials={TESTIMONIALS} />
    </div>
  );
}

export default Testimonials;
