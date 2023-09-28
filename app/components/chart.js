import React, { useState } from "react";
import Modal from "./modal";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);

  return (
    <div className="background">
      {/* <h1>My Habit Tracker</h1> */}
      <div className="mainquestions">
        <section className="border">
          <Context.Provider value={[random, setRandom]}>
            <Modal />
          </Context.Provider>

          <table>
            <tbody>
              <tr>
                <th>Habit</th>
                <th>Day 1</th>
                <th>Day 2</th>
                <th>Day 3</th>
                <th>Day 4</th>
                <th>Day 5</th>
                <th>Day 6</th>
                <th>Day 7</th>
              </tr>
            </tbody>
            {random.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item}</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                </tr>
              </tbody>
            ))}

            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
