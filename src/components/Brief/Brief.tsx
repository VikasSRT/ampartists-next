"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// Components
import { MaskText } from "../AnimatedText/MaskText";
import Button from "../Button/Button";
// Utils
import { LOCATIONS, ROUTES } from "../../utils/constants";
// Types
import type { ICheckbox } from "../../types/types";
// Images

// Styles
import { useRouter } from "next/navigation";
import styles from "./brief.module.css";
import useLanguage from "../../hooks/useLanguage";
import CustomSelectWithCheckbox from "../CustomSelect/CustomSelectWithCheckbox";
import { DollarSign, MapPin, Search } from "lucide-react";
import CustomSelect from "../CustomSelect/CustomSelect";
import Input from "../Input/Input";
import useApiHook from "../../hooks/useApiHook";

export default function Brief({ cmsInfo }) {
  const language = useLanguage();
  const [locations, setLocations] = useState([]);
  const { api } = useApiHook();
  const [hasInitializedLocations, setHasInitializedLocations] = useState(false);

  const searchMainHeadingParts =
    cmsInfo?.searchSection?.mainHeading?.[language]
      .split(",/")
      .map((part) => part) || [];

  const router = useRouter();
  // const initialLocations: ICheckbox[] = locations.map((loc) => ({
  //   name: loc,
  //   checked: false,
  // }));

  const [formData, setFormData] = useState<{
    name: string;
    budget: string;
    location: ICheckbox[];
  }>({
    name: "",
    budget: "",
    location: [],
  });

  const { ref: svgRef, inView } = useInView({
    triggerOnce: true,
    threshold: [0],
    rootMargin: "-100px",
  });

  const handleFilterChange = (value: string | ICheckbox[], name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLocations = async () => {
    try {
      const { success, error, data } = await api({
        method: "GET",
        endPoint: `/admin/artists-locations/`,
        needLoader: true,
        loaderName: "artists-locations",
        showErrorToast: false,
      });

      const filteredLocations = data?.filter(
        (c: string) => c != null && c !== "undefined",
      );

      if (success) {
        setLocations(filteredLocations);
      }
    } catch (err) {
      console.error("Error generating support ticket:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && !hasInitializedLocations) {
      const initialLocations: ICheckbox[] = locations.map((loc) => ({
        name: loc,
        checked: false,
      }));

      setFormData((prev) => ({ ...prev, location: initialLocations }));
      setHasInitializedLocations(true);
    }
  }, [locations, hasInitializedLocations]);

  const BUDGET = [
    "$0 - $500",
    "$500 - $1000",
    "$1000 - $2500",
    "$2500 - $5000",
    "$5000 - $10000",
  ];

  const rangeArr = formData?.budget
    ?.split(" - ")
    .map((c) => c.replace("$", ""));

  const selectedLocations = formData.location
    .filter((loc) => loc.checked)
    .map((loc) => loc.name)
    .join(",");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `${ROUTES.artists}/?search=${formData.name}&${
        selectedLocations && `location=${selectedLocations}&`
      }average_booking_rate_min=${rangeArr[0]}&average_booking_rate_max=${
        rangeArr?.[1] || ""
      }`,
    );
  };

  return (
    <div className={styles.container} id="findYourArtist">
      <div className={styles.wrapper}>
        <MaskText stagger={1}>
          <p className={styles.title}>
            {/* {cmsInfo?.searchSection?.mainHeading?.[language]} */}
            {/* You bring the brief <br></br>
              <span className={styles.titleGreen}>We bring the beats</span> */}
            {searchMainHeadingParts[0]}
            <span className={styles.titleGreen}>
              <br></br>
              {searchMainHeadingParts[1]}
            </span>
          </p>
        </MaskText>
        <MaskText stagger={2}>
          <div className={styles.alighItems}>
            <p className={styles.subTitle}>
              {/* Whether you're curating a festival stage, launching a product, or
              planning your next epic afterparty{" "} */}
              {cmsInfo?.searchSection?.body?.[language]}
              <br className={styles.mobileDevider}></br>—{" "}
            </p>
            <span className={styles.subTitleGreen}>
              {/* we've got the talent, tools, and tech to make it seamless. */}
              {cmsInfo?.searchSection?.body2?.[language]}
            </span>
          </div>
        </MaskText>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Search Artist"
            name="name"
            value={formData.name}
            onChange={handleFilterChange}
            placeholder=""
            icon={<Search className={styles.icon} />}
          />
          <CustomSelect
            label="Budget"
            name="budget"
            value={formData.budget}
            onChange={handleFilterChange}
            options={BUDGET}
            icon={<DollarSign className={styles.icon} />}
          />
          <CustomSelectWithCheckbox
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleFilterChange}
            options={locations}
            icon={<MapPin className={styles.icon} />}
          />
          <Button
            text="Search"
            className="brief"
            fullWidth
            onClick={() =>
              router.push(
                `${ROUTES.artists}/?search=${formData.name}&${
                  selectedLocations && `location=${selectedLocations}&`
                }average_booking_rate_min=${
                  rangeArr[0]
                }&average_booking_rate_max=${rangeArr?.[1] || ""}`,
              )
            }
          />
        </form>
      </div>

      <svg
        viewBox="0 0 295 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(styles.decor, inView && styles.animate)}
        ref={svgRef}
      >
        <path
          className={clsx(styles.triangle, styles.triangle1)}
          d="M98.1759 95.0478L6.9062e-06 3.4809e-05L7.62939e-06 191.085L98.1759 95.0478Z"
          fill="currentColor"
        />
        <path
          className={clsx(styles.triangle, styles.triangle2)}
          d="M196.223 95.0478L98.0469 3.4809e-05L98.0469 191.085L196.223 95.0478Z"
          fill="currentColor"
        />
        <path
          className={clsx(styles.triangle, styles.triangle3)}
          d="M294.223 95.0478L196.047 3.4809e-05L196.047 191.085L294.223 95.0478Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
