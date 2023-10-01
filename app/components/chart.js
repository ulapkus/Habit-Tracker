import React, { useState } from "react";
import Questions from "./questions";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);

  const location = (event) => {
    const clickedCell = event.target;
    const rowIndex = clickedCell.parentElement.rowIndex;
    const cellIndex = clickedCell.cellIndex;

    if (event.target.tagName === "TD") {
      console.log(rowIndex);
      console.log(document.getElementById("mytable").rows[0]);
    }
    for (let i = 0; i <= 6; i++) {
      if (rowIndex === 1 && cellIndex === i) {
        document.getElementById("mytable").rows[0].cells[
          i
        ].style.backgroundColor = "red";
      } else if (rowIndex === 2 && cellIndex === i) {
        document.getElementById("mytable").rows[1].cells[
          i
        ].style.backgroundColor = "pink";
      }
    }
  };

  return (
    <div className="background">
      <h1>My Habit Tracker</h1>
      <div className="mainquestions">
        <section className="border">
          <Context.Provider value={[random, setRandom]}>
            <Questions />
          </Context.Provider>
          <section className="habits">
            <h3 className="habit-heading">Habit</h3>
            {random.map((item, index) => (
              <p key={index} className="tablebody">
                {item}
              </p>
            ))}
          </section>

          <section>
            <table>
              <tbody>
                <tr>
                  <td className="dayz">Day 1</td>
                  <td className="dayz">Day 2</td>
                  <td className="dayz">Day 3</td>
                  <td className="dayz">Day 4</td>
                  <td className="dayz">Day 5</td>
                  <td className="dayz">Day 6</td>
                  <td className="dayz">Day 7</td>
                </tr>
              </tbody>
              <tbody className="habit-rows" id="mytable">
                <tr onClick={location} className="first-habit row">
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                  <td className="first-habit-cell"></td>
                </tr>
                <tr onClick={location} className="second-habit row">
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                  <td className="second-habit-cell"></td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  );
}