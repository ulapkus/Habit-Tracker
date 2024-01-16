"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
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
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="login-background">
        <div className="login-box">
          <h2>Start hopping</h2>
          <div className="no-account-signup">
            <p className="no-account">ALREADY HAVE AN ACCOUNT?&nbsp;</p>
            <Link href="/login" className="signup">
              LOG IN
            </Link>
          </div>
          <div className="register">
          <div className="login-form">

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
              <button type="submit" className="login-button">
                Sign up
              </button>
              <p className="error">{error && error}</p>
            </form>
            </div>
            <div className="break-plus-or">
              <div className="break"></div>
              <p className="break-or">OR</p>
              <div className="break"></div>
            </div>
            <div className="login-bottom">
              {/* need to add register with google and github ability */}
              <button className="login-google">
                <img
                  className="image-google"
                  src="https://banner2.cleanpng.com/20180324/iww/kisspng-google-logo-g-suite-google-5ab6f1cee66464.5739288415219388949437.jpg"
                ></img>
                Continue with Google
              </button>
              <button className="login-github">
                <img
                  className="image-github"
                  src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                ></img>
                Continue with Github
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
