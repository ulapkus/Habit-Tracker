"use client";

import React, { useEffect, useState, createContext } from "react";
import { differenceInDays } from "date-fns";
import { useSession } from "next-auth/react";

// export const StartDateContext = React.createContext();
export const NameContext = createContext([[], () => {}]);

export const StartDateContext = createContext([[], () => {}]);

export default function Stats() {
  const [nameOfUser, setNameOfUser] = useState("Ula");
  const [startDate, setStartDate] = useState(["2023-10-12"]);
  const { data: session } = useSession();

  const daysDifference = differenceInDays(new Date(), new Date(startDate));

  const begin = () => {
    setStartDate("2023-10-31");
  };

  return (
    <div>
      <div>
        {/* <NameContext.Provider value={[]}>
          <StartDateContext.Provider value={[]}>
            <Signinn />
          </StartDateContext.Provider>
        </NameContext.Provider> */}
      </div>
      <div className="stats-greeting">
        <h5>HELLO,&nbsp;</h5>
        {!session ? null : <div className="stats-user"> {session.user?.name}!</div>}
      </div>
      <p className="days-tracked">
        You have been tracking your habits for {daysDifference} days
      </p>
      {/* <button onClick={begin}>press</button> */}
    </div>
  );
}
