"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import arrow from "../../public/arrow.png";
import githubLogo from "../../public/github-logo.png";
import googleLogo from "../../public/google-logo.png";
import Bunny from "../components/bunny";
import alert from "../../public/alert-icon.png";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const habits = [];
    const days = {};
    const colors = {};

    if (!isValidEmail(email)) {
      setError("THAT EMAIL IS INVALID. ARE YOU SURE YOU ENTERED IT CORRECTLY?");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!password) {
      setError(
        "THAT PASSWORD IS INVALID. ARE YOU SURE YOU ENTERED IT CORRECTLY?"
      );
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password.length < 8) {
      setError(
        "THAT PASSWORD IS TOO SHORT. MAKE SURE IT IS AT LEAST 8 CHARACTERS LONG."
      );
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          habits,
          days,
          colors,
        }),
      });
      if (res.status === 400) {
        setError("THIS EMAIL IS ALREADY REGISTERED. PLEASE LOG IN.");
        setTimeout(() => setError(""), 3000);
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("ERROR, TRY AGAIN");
    }
  };

  if (sessionStatus === "loading") {
    <div className="loading-background">
      <p className="loading">LOADING...</p>
    </div>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="login-background">
        <p className={`error ${error ? "error-visible" : ""}`}>
          {error && (
            <Image src={alert} alt="Error" className="error-img"></Image>
          )}
          {error}
        </p>
        <Bunny />
        <div className="login-box">
          <h2>Start hopping</h2>
          <div className="no-account-signup">
            <p className="no-account">ALREADY HAVE AN ACCOUNT?&nbsp;</p>
            <Link href="/login" className="signup">
              LOG IN
            </Link>
          </div>
          <div className="register">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                placeholder="Name"
                required
                className="register-name"
              />
              <input
                type="text"
                placeholder="Email"
                required
                className="login-email"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="login-password"
              />
              <button type="submit" className="login-button-plus-arrow">
                <p className="login-button">Sign Up</p>
                <Image src={arrow} alt="arrow" className="login-arrow" />
              </button>
            </form>
            <div className="break-plus-or">
              <div className="break"></div>
              <p className="break-or">OR</p>
              <div className="break"></div>
            </div>
            <div className="login-bottom">
              <button
                onClick={() => {
                  signIn("google");
                }}
                className="login-google-button"
              >
                <Image
                  src={googleLogo}
                  alt="Google logo"
                  className="image-google"
                />
                <p className="login-google">Continue with Google</p>
              </button>
              <button
                onClick={() => {
                  signIn("github");
                }}
                className="login-github-button"
              >
                <Image
                  src={githubLogo}
                  alt="Github logo"
                  className="image-github"
                />
                <p className="login-github">Continue with Github</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
