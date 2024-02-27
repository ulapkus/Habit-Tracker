"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import backgroundPic from "../public/background.webp";
import styles from './styles/page.module.css';

export default function ClientLogic({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let backgroundImage = "";

    if (pathname === "/chart") {
      backgroundImage = `url(${backgroundPic.src})`;
    } else {
      backgroundImage = "";
    }
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }, [pathname]);

  return <div className={styles.layout_background}>{children}</div>;
}
