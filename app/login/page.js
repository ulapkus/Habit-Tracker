"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import arrow from "../../public/arrow.png";
import githubLogo from "../../public/github-logo.png";
import googleLogo from "../../public/google-logo.png";
import Bunny from "../components/bunny";
import alert from "../../public/alert-icon.png";
import styles from "../styles/page.module.css";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
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
    const email = e.target[0].value.toLowerCase();
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("THAT EMAIL IS INVALID. ARE YOU SURE YOU ENTERED IT CORRECTLY?");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!password || password.length < 8) {
      setError(
        "THAT PASSWORD IS INVALID. ARE YOU SURE YOU ENTERED IT CORRECTLY?"
      );
      setTimeout(() => setError(""), 3000);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("INVALID EMAIL OR PASSWORD");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
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
          <h2>Log in</h2>
          <div className={styles.no_account_signup}>
            <p className={styles.no_account}>DON&apos;T HAVE AN ACCOUNT?&nbsp;</p>
            <Link href="/register" className={styles.signup}>
              SIGN UP
            </Link>
          </div>
          <div className={styles.signin}>
            <form onSubmit={handleSubmit} className={styles.login_form}>
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
                <p className={styles.login_button}>Sign In</p>
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

export default Login;
