"use client";

import { useEffect, useState } from "react";
import Booking from "../../components/Booking/Booking";
import BookingGreen from "../../components/Booking/BookingGreen";
import Brief from "../../components/Brief/Brief";
import Devider from "../../components/Devider/Devider";
import DeviderAnimated from "../../components/Devider/DeviderAnimated";
import Hero from "../../components/Hero/Hero";
import Missions from "../../components/Missions/Missions";
import SoundWaves from "../../components/SoundWaves/SoundWaves";
import Talents from "../../components/Talents/Talents";
import styles from "./home.module.css";
import useApiHook from "../../hooks/useApiHook";
import Clients from "../../components/OurClients/Clients";

export default function Home({
  initialCmsInfo = {},
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialCmsInfo?: any;
}) {
  const [cmsInfo, setCmsInfo] = useState(initialCmsInfo);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { api } = useApiHook();

  useEffect(() => {
    if (Object.keys(initialCmsInfo).length > 0) return;

    const getCms = async () => {
      const response = await api({
        endPoint: "/admin/cms/",
        attachAccessToken: false,
      });
      if (response?.success) {
        setCmsInfo(response?.data?.data);
      }
    };
    getCms();
  }, [initialCmsInfo]);

  return (
    <section className={styles.section}>
      <Hero cmsInfo={cmsInfo} />
      <Clients />
      <Brief cmsInfo={cmsInfo} />
      <SoundWaves />
      <Talents cmsInfo={cmsInfo} />
      <DeviderAnimated className="logo" />
      <Missions cmsInfo={cmsInfo} />
      <Devider variant="default" />
      <Booking cmsInfo={cmsInfo} />
      <BookingGreen cmsInfo={cmsInfo} />
    </section>
  );
}
