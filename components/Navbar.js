"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar-background">
      <Link href="/">Home</Link>
      <Link href="/testname">testname</Link>
      {!session ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <>
          <div className="dashboard">
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
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
