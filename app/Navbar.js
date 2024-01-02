"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      {/* <div className="container"> */}
        <div className="bloc-tabs">
          <div className="logo-div">
            <Link href="/">
              <img
                className="logo"
                src="https://i.ibb.co/p3LhT3W/H-2.png"
              ></img>
            </Link>
          </div>
          <div className="chart-and-stats">
            {/* <Link href="/">Home</Link> */}
            <Link href="/testname">testname</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/chart">CHART</Link>
            <Link href="/stats">STATS</Link>

            {!session ? (
              <>
                <Link href="/login">LOGIN</Link>
                <Link href="/register">REGISTER</Link>
              </>
            ) : (
              <>
                <button className="logout"
                  onClick={() => {
                    signOut();
                  }}
                >
                  LOGOUT
                </button>
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
