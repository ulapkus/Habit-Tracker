"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
            <img
              className="logo"
              src="https://i.ibb.co/3myfFc1/Habbit-Rabbit-Logo.png"
              alt="HABIT RABBIT"
            ></img>
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
