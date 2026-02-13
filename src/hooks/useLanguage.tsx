import React from "react";
import { useDirection } from "../context/DirectionContext";

const useLanguage = () => {
  const direction = useDirection();

  return direction?.direction === "rtl" ? "ar" : "en";
};

export default useLanguage;
