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
      // router.replace("/dashboard");
      router.replace("/questionone");

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
    // const days = [];
    const days = {placeholder: []};
    const colors = {placeholdertwo: ""};
    // const colors = [];

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
        <div className="register-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Name"
              required
              className="login-name"
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
              Register
            </button>
            <p>{error && error}</p>
          </form>
          <hr className="login-break"></hr>
          <div className="login-bottom">
            <Link href="/login" className="have-or-create-account">
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
