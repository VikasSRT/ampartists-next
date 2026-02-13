import Input from "../Input/Input";
// Utils
import type { ICheckbox } from "../../types/types";
// Images
import Search from "../../assets/icons/search.svg";
// Styles
import styles from "./artistsearch.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type Props = {
  search: (value: string) => void;
  value: string;
  formData: {
    location: ICheckbox[];
    budget: { from: string; to: string };
    genre: ICheckbox[];
  };
  handleFilterChange: (value: string | ICheckbox[], name: string) => void;
  optionsLocation: string[];
  optionsGenre: string[];
  clear: () => void;
  submit: () => void;
};

function ArtistSearch({ search, value }: Props) {
  const { t } = useTranslation();
  const phrases: string[] = [
    `Search "female vocalists"`,
    `Try "Arabic DJs"`,
    `Find artists in "Dubai"`,
    `Explore "jazz fusion"`,
    `Looking for a "wedding performer"?`,
    `Search by "genre, name, or vibe"`,
  ];
  const [placeholder, setPlaceholder] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  useEffect(() => {
    const currentPhrase = phrases[textIndex % phrases.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentPhrase.length) {
          setIsDeleting(true);
          setSpeed(1000);
        } else {
          setSpeed(100);
        }
      } else {
        setPlaceholder(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % phrases.length);
          setSpeed(300);
        } else {
          setSpeed(50);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, speed, textIndex, phrases]);

  return (
    <Input
      label={t("searchArtists")}
      name="search"
      onChange={search}
      value={value}
      classNameInput={styles.fullWidthInput}
      className={styles.fullWidth}
      icon={<Search className={styles.icon} />}
      placeholder={placeholder}
    />
  );
}

export default ArtistSearch;
