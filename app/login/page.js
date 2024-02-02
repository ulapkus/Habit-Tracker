"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import arrow from "../../public/arrow.png";
import githubLogo from "../../public/github-logo.png";
import googleLogo from "../../public/google-logo.png";

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
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="loading-background">
        <p className="loading">LOADING...</p>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="login-background">
        <div className="login-box">
          <h2>Log in</h2>
          <div className="no-account-signup">
            <p className="no-account">DON&apos;T HAVE AN ACCOUNT?&nbsp;</p>
            <Link href="/register" className="signup">
              SIGN UP
            </Link>
          </div>
          <div className="signin">
            <form onSubmit={handleSubmit} className="login-form">
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
                <p className="login-button">Sign In</p>
                <Image src={arrow} alt="arrow" className="login-arrow" />
              </button>
              <p className="error">{error && error}</p>
            </form>
            <div className="break-plus-or">
              <div className="break"></div>
              <p className="break-or">OR</p>
              <div className="break"></div>
            </div>
            <div className="login-bottom">
              <button className="login-google-button">
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

export default Login;
