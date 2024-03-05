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
import styles from "../styles/page.module.css";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    const name = e.target[0].value.toLowerCase();
    const email = e.target[1].value.toLowerCase();
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className={styles.loading_background}>
        <p className={styles.loading}>LOADING...</p>
      </div>
    );
  }

  if (isLoading === true) {
    return (
      <div className={styles.loading_background}>
        <p className={styles.loading}>LOADING...</p>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={styles.login_background}>
        <p className={`${styles.error} ${error ? styles.error_visible : ""}`}>
          {error && (
            <Image src={alert} alt="Error" className={styles.error_img}></Image>
          )}
          {error}
        </p>
        <Bunny />
        <div className={styles.login_box}>
          <h2>Start hopping</h2>
          <div className={styles.no_account_signup}>
            <p className={styles.no_account}>ALREADY HAVE AN ACCOUNT?&nbsp;</p>
            <Link href="/login" className={styles.signup}>
              LOG IN
            </Link>
          </div>
          <div className={styles.register}>
            <form onSubmit={handleSubmit} className={styles.login_form}>
              <input
                type="text"
                placeholder="Name"
                required
                className={styles.register_name}
              />
              <input
                type="text"
                placeholder="Email"
                required
                className={styles.login_email}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className={styles.login_password}
              />
              <button type="submit" className={styles.login_button_plus_arrow}>
                <p className={styles.login_button}>Sign Up</p>
                <Image src={arrow} alt="arrow" className={styles.login_arrow} />
              </button>
            </form>
            <div className={styles.break_plus_or}>
              <div className={styles.break}></div>
              <p className={styles.break_or}>OR</p>
              <div className={styles.break}></div>
            </div>
            <div className={styles.login_bottom}>
              <button
                onClick={() => {
                  signIn("google");
                }}
                className={styles.login_google_button}
              >
                <Image
                  src={googleLogo}
                  alt="Google logo"
                  className={styles.image_google}
                />
                <p className={styles.login_google}>Continue with Google</p>
              </button>
              <button
                onClick={() => {
                  signIn("github");
                }}
                className={styles.login_github_button}
              >
                <Image
                  src={githubLogo}
                  alt="Github logo"
                  className={styles.image_github}
                />
                <p className={styles.login_github}>Continue with Github</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
