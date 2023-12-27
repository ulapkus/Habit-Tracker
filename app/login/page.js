"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
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
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="login-background">
        <div className="login-box">
          <h2>Login</h2>
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
            <button type="submit" className="login-button">
              Sign In
            </button>
            <p>{error && error}</p>
          </form>
          <hr className="login-break"></hr>
          <div className="login-bottom">
            <button
              onClick={() => {
                signIn("github");
              }}
              className="login-github"
            >
              Sign In with Github
            </button>
            <div>- OR -</div>
            <Link href="/register">Create an account</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
