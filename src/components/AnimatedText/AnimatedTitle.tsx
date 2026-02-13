import clsx from "clsx";
import s from "./styles.module.css";
import { FlipLinkInview } from "./FlipLinkInview";

type Props = { text: string; accentColor?: boolean; whiteText?: string };

function Title({ text, accentColor, whiteText }: Props) {
  return (
    <div className={clsx(s.title, accentColor && s.accentColor)}>
      <p className={s.whiteText}>{whiteText}</p>
      <FlipLinkInview accentColor={accentColor ? accentColor : false}>
        {text}
      </FlipLinkInview>
    </div>
  );
}

export default Title;
