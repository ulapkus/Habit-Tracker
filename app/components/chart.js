import React, { useState, useEffect } from "react";
import Questions from "./questions";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);
  const [renderCount, setRenderCount] = useState(["", "", "", "", "", "", ""]);
  const colors = ["red", "pink", "green"];

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

  const createNewerRow = () => {
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
    console.log(random.length);
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
    habitInputBox.placeholder = "Insert habit";
    habitInputBox.classList.add("habit-input-box");
    document.getElementById("newHabitId").appendChild(habitInputBox);
  };

  function removeHabits() {
    for (let i = 0; i < random.length; i++) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkboxes";
      document
        .getElementById("checkbox-parent")
        .appendChild(checkbox, random[i]);
    }

    const parent = document.getElementById("checkboxes-plus-submit");
    const newChild = document.createElement("button");
    // newChild.innerHTML = "Submit";
    newChild.onclick = checkIfSubmit;
    newChild.textContent = "Submit";

    const oldChild = document.getElementById("child");
    parent.replaceChild(newChild, oldChild);
  }

  function changeColor() {
    for (let i = 0; i < random.length; i++) {
      const dropdown = document.createElement("select");

      for (let j = 0; j <= colors.length; j++) {
        const option = document.createElement('option');
        option.text = colors[j];
        dropdown.appendChild(option);
      }

      document.getElementById('checkbox-parent').appendChild(dropdown);


      // document
      //   .getElementById("checkbox-parent")
      //   .appendChild(dropdown, random[i]);
    }

    // for (let i = 0; i <= 3; i++) {
    //   const colorOptions = document.createElement("option");
    //   document
    //     .getElementById("color-options")
    //     .appendChild(colorOptions, random[i]);
    // }


    /* <select className="chart-buttons-individual">
<option>Choose Color</option>
<option>pink</option>
<option>pink</option>
<option>green</option>
</select> */

    // const parent = document.getElementById("checkboxes-plus-submit");
    // const newChild = document.createElement("button");
    // // newChild.innerHTML = "Submit";
    // newChild.onclick = checkIfSubmit;
    // newChild.textContent = "Submit";

    // const oldChild = document.getElementById("child");
    // parent.replaceChild(newChild, oldChild);
  }

  const checkIfSubmit = () => {
    const boxes = document.getElementsByClassName("checkboxes");

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        random.splice(boxes[i], 1);
        console.log(random[i]);

        const tablee = document.getElementById("mytable");
        tablee.removeChild(document.getElementsByClassName("random-row")[i]);

        const habitBox = document.getElementById("habits-input-boxes");
        habitBox.removeChild(
          document.getElementsByClassName("imported-habits")[i]
        );
      }
    }
  };

  return (
    <div className="background">
      <h1>My Habit Tracker</h1>
      <div className="mainquestions">
        <div className="checkboxes-plus-chart">
          <div id="checkboxes-plus-submit">
            <div id="checkbox-parent">
              <div id="dropdown-options"></div>
            </div>
            <div id="child"></div>
          </div>
          <section className="border">
            <Context.Provider value={[random, setRandom]}>
              <Questions />
            </Context.Provider>
            <section className="habits">
              <h4>Habit</h4>
              <div id="habits-input-boxes">
                {random.map((item, index) => (
                  <p key={index} className="imported-habits">
                    {item}
                  </p>
                ))}
              </div>
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
                  {random.map((item, index) => (
                    <tr key={index} className="random-row" onClick={location}>
                      {renderCount.map((item, dindex) => (
                        <td key={dindex} className="first-habit-cell cell">
                          {item}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </div>
        <div className="chart-buttons">
          {/* <div className="new-row"> */}
          <button onClick={createNewRow} className="chart-buttons-individual">
            + Add Habit
          </button>
          {/* </div> */}
          <button className="chart-buttons-individual" onClick={removeHabits}>
            - Remove habit
          </button>
          <button className="chart-buttons-individual" onClick={changeColor}>
            Color
          </button>
          <button className="chart-buttons-individual">Save</button>
          <button className="chart-buttons-individual">Other</button>
        </div>
      </div>
    </div>
  );
}

/* <select className="chart-buttons-individual">
<option>Choose Color</option>
<option>pink</option>
<option>pink</option>
<option>green</option>
</select> */
