"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, [GA_MEASUREMENT_ID]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const hostname = window.location.hostname;
    // const path = location.pathname; // Old way
    const path = pathname;
    const search = searchParams.toString();

    const isInternalPanel =
      hostname.includes("admin") ||
      hostname.includes("app") ||
      hostname.includes("localhost");

    if (!isInternalPanel) {
      setTimeout(() => {
        ReactGA.send({
          hitType: "pageview",
          page: path + (search ? `?${search}` : ""),
          title: document.title,
        });
      }, 100);
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return null;
};

export default Analytics;
