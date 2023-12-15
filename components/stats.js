

import React, { useEffect, useState, createContext } from "react";
import { differenceInDays } from "date-fns";

// export const StartDateContext = React.createContext();
export const NameContext = createContext([[], () => {}]);

export const StartDateContext = createContext([[], () => {}]);

export default function Stats() {
  const [nameOfUser, setNameOfUser] = useState("Ula");
  const [startDate, setStartDate] = useState(["2023-10-12"]);

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
      <h5>Hello, {nameOfUser}</h5>
      <p className="days-tracked">
        You have been tracking your habits for {daysDifference} days
      </p>
      {/* <button onClick={begin}>press</button> */}
    </div>
  );
}
