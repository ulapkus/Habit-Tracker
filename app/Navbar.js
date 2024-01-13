"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [bodyBackgroundColor, setBodyBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") {
      setBodyBackgroundColor("#8caa91");
      setTextColor("black");
    } else if (pathname === "/register") {
      setBodyBackgroundColor("#8caa91");
      setTextColor("black");
    } else {
      setBodyBackgroundColor("#f5f5dc");
      setTextColor("grey");
    }

    return () => {
      setBodyBackgroundColor("");
      setTextColor("");
    };
  }, [pathname]);

  return (
    <div className="nav-background" style={{ backgroundColor: bodyBackgroundColor }}>
      <div className="nav-main">
        <div className="logo-div">
          <Link href="/">
            <img className="logo" src="https://i.ibb.co/p3LhT3W/H-2.png"></img>
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