"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import habitRabbitLogo from "../public/habbit-rabbit-logo.png";

const Navbar = () => {
  const { data: session } = useSession();
  const [textColor, setTextColor] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/chart") {
      setTextColor("white");
    } else {
      setTextColor("#8AEEB3");
    }

    return () => {
      setTextColor("");
    };
  }, [pathname]);

  return (
    <div className="nav-background">
      <div className="nav-main">
        <div className="logo-div">
          <Link href="/">
            <Image
              src={habitRabbitLogo}
              alt="habbit rabbit logo"
              width={400}
              height={100}
            />
          </Link>
        </div>
        <div className="chart-and-stats">
          <Link href="/about" className="nav-link" style={{ color: textColor }}>
            ABOUT
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className="nav-link"
                style={{ color: textColor }}
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="nav-link"
                style={{ color: textColor }}
              >
                REGISTER
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/chart"
                className="nav-link"
                style={{ color: textColor }}
              >
                CHART
              </Link>
              <Link
                href="/stats"
                className="nav-link"
                style={{ color: textColor }}
              >
                STATS
              </Link>
              <p
                className="nav-link"
                onClick={() => {
                  signOut();
                }}
                style={{ color: textColor }}
              >
                LOGOUT
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
