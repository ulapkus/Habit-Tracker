import React, { useState } from "react";
import Modal from "./modal";

export const Context = React.createContext();

export default function Chart() {
    const [random, setRandom] = useState([]);

  return (
    <div>
      <h1>My Habit Tracker</h1>
      <section>
      <ul>
        {random.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
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
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>box</td>
              <td>box</td>
              <td>box</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>box</td>
              <td>box</td>
              <td>box</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>box</td>
              <td>box</td>
              <td>box</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}