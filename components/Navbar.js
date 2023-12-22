"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
// console.log(session)




  return (
    <div>
      <ul>
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div>
          <Link href="/testname">
            <li>testname</li>
          </Link>
        </div>
        <div>
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              {/* this displays email */}
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
