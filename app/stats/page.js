"use client";

import React, { useEffect, useState } from "react";

import { differenceInDays } from "date-fns";
import { useSession } from "next-auth/react";

export default function Stats() {
  const [dateCreated, setDateCreated] = useState();
  const { data: session } = useSession();
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
      <div className="stats-greeting">
        <h5>HELLO,&nbsp;</h5>
        {!session ? null : (
          <div className="stats-user"> {session.user?.name}!</div>
        )}
      </div>
      <p className="days-tracked">
        You have been tracking your habits for {daysDifference} days
      </p>
    </div>
  );
}
