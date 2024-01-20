"use client";

import React, { useEffect, useState } from "react";

import { differenceInDays } from "date-fns";

export default function Stats() {
  const [dateCreated, setDateCreated] = useState();
  const daysDifference = differenceInDays(new Date(), new Date(dateCreated));

  async function getStartDate() {
    try {
      const res = await fetch("/api/getStats");

      if (!res.ok) {
        throw new Error("Error fetching users", error.message);
      }
      const modalResponse = await res.json();
      const updatedData = Object.values(modalResponse.data[0])[0];
      setDateCreated(updatedData);
    } catch (error) {
      console.log("Error fetching current user", error.message);
    }
  }

  useEffect(() => {
    getStartDate();
  }, []);

  return (
    <div>
      <div className="stats-top">
        <div className="stats-main">
          {/* fix the below so if its 1 day it doesnt say "1 days" */}
          <p className="days-tracked">
            You&apos;ve been habit hoppin&apos; for {daysDifference} days
          </p>
          <p className="insights">HERE ARE YOUR INSIGHTS</p>
        </div>
        <div className="stats-rabbit-container">
        <img
          className="stats-rabbit"
          src="https://i.ibb.co/4FSQSbp/Bunny1.png"
          alt="habit rabbit icon"
        ></img>
        <p className="stats-rabbit-comment">THIS PAGE IS COMING SOON!</p>
        </div>
      </div>
      <img
        className="stats-img"
        src="https://i.ibb.co/j3vS6GK/BLURRED-STATS.png"
        alt="user data"
      ></img>
    </div>
  );
}
