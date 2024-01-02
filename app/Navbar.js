"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="randddd" style={{ backgroundColor: bodyBackgroundColor }}>
      {/* <div className="container"> */}
      <div className="bloc-tabs">
        <div className="logo-div">
          <Link href="/">
            <img className="logo" src="https://i.ibb.co/p3LhT3W/H-2.png"></img>
          </Link>
        </div>
        <div className="chart-and-stats">
          {/* <Link href="/">Home</Link> */}
          <Link href="/testname" className="linkk" style={{ color: textColor }}>
            testname
          </Link>
          <Link href="/about" className="linkk" style={{ color: textColor }}>
            ABOUT
          </Link>

          {!session ? (
            <>
              <Link
                href="/login"
                className="linkk"
                style={{ color: textColor }}
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="linkk"
                style={{ color: textColor }}
              >
                REGISTER
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/chart"
                className="linkk"
                style={{ color: textColor }}
              >
                CHART
              </Link>
              <Link
                href="/stats"
                className="linkk"
                style={{ color: textColor }}
              >
                STATS
              </Link>
              <p
                className="linkk"
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
    // </div>
  );
};

export default Navbar;

// "use client";
// import React from "react";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   const { data: session } = useSession();

//   return (
//     <div>
//       <Link href="/">Home</Link>
//       <Link href="/testname">testname</Link>
//       <Link href="/dashboard">Dashboard</Link>
//       {!session ? (
//         <>
//           <Link href="/login">Login</Link>
//           <Link href="/register">Register</Link>
//         </>
//       ) : (
//         <>
//           {/* this displays email */}
//           {session.user?.email}
//           <button
//             onClick={() => {
//               signOut();
//             }}
//           >
//             Logout
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Navbar;
