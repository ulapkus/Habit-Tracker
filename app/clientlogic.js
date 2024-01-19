"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLogic({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let backgroundImage = "";

    if (pathname === "/chart") {
      backgroundImage =
        "url(https://i.ibb.co/KNw6Pm5/rabbit-background-chart.png)";
    } else {
      backgroundImage = "";
    }

    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
  }, [pathname]);

  return <div className="layout-background">{children}</div>;
}
