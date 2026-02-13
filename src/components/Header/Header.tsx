"use client";

import Link from "next/link";
//Componets
import Menu from "../Menu/Menu";
import Navpanel from "../NavPanels/Navpanel";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
//Utils
import { ROUTES } from "../../utils/constants";
//Styles
import styles from "./header.module.css";

type Props = {};

function Header({}: Props) {
  return (
    <header className={styles.container}>
      <Link href={ROUTES.home} className={styles.logoContainer}>
        <AnimatedLogo />
      </Link>
      <div className={styles.navPanel}>
        <Navpanel />
      </div>

      <Menu />
    </header>
  );
}

export default Header;
