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

  const createNewRow = () => {
    const table = document.getElementById("mytable");
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    cell1.className = "cell";
    const cell2 = newRow.insertCell(1);
    cell2.className = "cell";
    const cell3 = newRow.insertCell(2);
    cell3.className = "cell";
    const cell4 = newRow.insertCell(3);
    cell4.className = "cell";
    const cell5 = newRow.insertCell(4);
    cell5.className = "cell";
    const cell6 = newRow.insertCell(5);
    cell6.className = "cell";
    const cell7 = newRow.insertCell(6);
    cell7.className = "cell";

    const habitInputBox = document.createElement("input");
    habitInputBox.setAttribute("type", "text");
    habitInputBox.name = "newbox";
    habitInputBox.placeholder = "insert habit";
    habitInputBox.classList.add("habit-input-box");
    document.getElementById("newHabitId").appendChild(habitInputBox);
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
            <h4>Habit</h4>
            {random.map((item, index) => (
              <p key={index} className="imported-habits">
                {item}
              </p>
            ))}
            <div id="newHabitId"></div>
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
              <tbody id="mytable">
                <tr onClick={location}>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                  <td className="first-habit-cell cell"></td>
                </tr>
                <tr onClick={location}>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                  <td className="second-habit-cell cell"></td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
        <div className="new-row">
          <button onClick={createNewRow} className="add-row">
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
}
