import React, { useState, useEffect } from "react";
import Questions from "./questions";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);
  const renderCount = ["", "", "", "", "", "", ""];
  const colors = [
    "Choose color",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
  ];
  const inputValues = [];
  const selectedColors = [];
  const [addInputSubmit, setAddInputSubmit] = useState(false);
  const [addInputSubmitTwo, setAddInputSubmitTwo] = useState(false);

  const handleColorSelection = (event) => {
    const selectedColor = event.target.value;

    if (selectedColors.length < random.length) {
      selectedColors.push(selectedColor);
      console.log(selectedColors);
    } else if (selectedColors.length === random.length) {
      const children = Array.from(event.target.parentElement.children);
      const childrenIndex = children.indexOf(event.target);
      selectedColors.splice(childrenIndex, 1, selectedColor);
    }

    const table = document.getElementById("mytable");

    for (let p = 0; p < table.rows.length; p++) {
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        table.rows[p].cells[i].addEventListener("click", function () {
          if (this.parentElement.rowIndex === p + 1) {
            this.style.backgroundColor = selectedColors[p];
          }
        });
      }
    }
  };

  const createNewRow = () => {
    const table = document.getElementById("tempTable");
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

    setAddInputSubmit(true);
  };

  useEffect(() => {
    if (addInputSubmit && !addInputSubmitTwo) {
      const habitsubmit = document.createElement("button");
      habitsubmit.textContent = "Submit";
      habitsubmit.id = "input-box-submit";
      habitsubmit.classList.add("habit-submit");

      document.getElementById("child").appendChild(habitsubmit);
      setAddInputSubmitTwo(true);

      habitsubmit.addEventListener("click", function () {
        document.getElementById("child").removeChild(habitsubmit);
        const inputElements = document.querySelectorAll("input");
        for (let i = 2; i < inputElements.length; i++) {
          inputValues.push(inputElements[i].value);
          console.log(inputValues);
          setRandom((prevRandom) => [...prevRandom, inputElements[i].value]);
          console.log(random);

          while (document.getElementById("newHabitId").firstChild) {
            document
              .getElementById("newHabitId")
              .removeChild(document.getElementById("newHabitId").firstChild);
          }

          while (document.getElementById("tempTable").firstChild) {
            document
              .getElementById("tempTable")
              .removeChild(document.getElementById("tempTable").firstChild);
          }
        }
      });
    }
  }, [addInputSubmit, addInputSubmitTwo, inputValues, random]);

  function removeHabits() {
    for (let i = 0; i < random.length; i++) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkboxes";
      document
        .getElementById("checkbox-parent")
        .appendChild(checkbox, random[i]);
    }

    const newChild = document.createElement("button");
    newChild.onclick = checkIfSubmit;
    newChild.textContent = "Remove";
    newChild.id = "remove-button";

    document.getElementById("child").appendChild(newChild);
  }

  const chooseColor = () => {
    for (let i = 0; i < random.length; i++) {
      const dropdown = document.createElement("select");
      dropdown.id = "select";
      dropdown.className = "select";

      for (let j = 0; j <= colors.length; j++) {
        const option = document.createElement("option");
        option.className = "colorz";
        option.text = colors[j];
        option.value = colors[j];
        option.id = "text";

        dropdown.appendChild(option);
      }
      document.getElementById("checkbox-parent").appendChild(dropdown);
    }
    for (let l = 0; l < document.getElementsByTagName("select").length; l++) {
      document
        .getElementsByTagName("select")
        [l].addEventListener("change", handleColorSelection);
    }

    const colorSubmit = document.createElement("button");
    colorSubmit.textContent = "Submit";
    colorSubmit.id = "color-submit";
    colorSubmit.classList.add("color-submit");
    colorSubmit.addEventListener("click", function () {
      colorSubmitClicked();
    });
    document.getElementById("child").appendChild(colorSubmit);
  };

  const colorSubmitClicked = () => {
    document
      .getElementById("child")
      .removeChild(document.getElementById("color-submit"));
    while (document.getElementById("checkbox-parent").firstChild) {
      document
        .getElementById("checkbox-parent")
        .removeChild(document.getElementById("checkbox-parent").firstChild);
    }
  };

  const checkIfSubmit = () => {
    const boxes = document.getElementsByClassName("checkboxes");

    for (let i = boxes.length - 1; i >= 0; i--) {
      if (boxes[i].checked) {
        random.splice([i], 1);

        const tablee = document.getElementById("mytable");
        tablee.removeChild(document.getElementsByClassName("random-row")[i]);

        const habitBox = document.getElementById("habits-input-boxes");
        habitBox.removeChild(
          document.getElementsByClassName("imported-habits")[i]
        );
      }
    }
    document.getElementById("remove-button").remove();
    while (document.getElementById("checkbox-parent").firstChild) {
      document
        .getElementById("checkbox-parent")
        .removeChild(document.getElementById("checkbox-parent").firstChild);
    }
  };

  const testt = () => {
    console.log(random);
  };

  return (
    <div className="background">
      <h1>My Habit Tracker</h1>
      <div className="mainquestions">
        <div className="checkboxes-plus-chart">
          <div id="checkboxes-plus-submit">
            <div id="checkbox-parent"></div>
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
                    <td className="dayz" id="one">
                      Day 1
                    </td>
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
                    <tr key={index} className="random-row">
                      {renderCount.map((item, dindex) => (
                        <td key={dindex} className="first-habit-cell cell">
                          {item}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tbody id="tempTable"></tbody>
              </table>
            </section>
          </section>
        </div>
        <div className="chart-buttons">
          <button onClick={createNewRow} className="chart-buttons-individual">
            + Add Habit
          </button>
          <button className="chart-buttons-individual" onClick={removeHabits}>
            - Remove habit
          </button>
          <button className="chart-buttons-individual" onClick={chooseColor}>
            Color
          </button>
          {/* <button className="chart-buttons-individual" onClick={save}>Save</button> */}
          <button className="chart-buttons-individual" onClick={testt}>
            Other
          </button>
        </div>
      </div>
    </div>
  );
}

// const handleColorSelection = (event) => {
//   const selectedColor = event.target.value;

//   const cellrows = document.getElementsByClassName("random-row");

//   for (let i = 0; i < cellrows.length; i++) {
//     const cellsInRow = cellrows[i].querySelectorAll(".cell");

//     cellsInRow.forEach((cell) => {
//       cell.addEventListener("click", () => {
//         switch (selectedColor) {
//           case "red":
//             cell.style.backgroundColor = "red";
//             break;
//           case "orange":
//             cell.style.backgroundColor = "orange";
//             break;
//           case "yellow":
//             cell.style.backgroundColor = "yellow";
//             break;
//           case "green":
//             cell.style.backgroundColor = "green";
//             break;
//           case "blue":
//             cell.style.backgroundColor = "blue";
//             break;
//           case "purple":
//             cell.style.backgroundColor = "purple";
//             break;
//           case "pink":
//             cell.style.backgroundColor = "pink";
//             break;
//         }
//       });
//     });
//   }
//   selectedColors.push(selectedColor);
//   console.log(selectedColors);
// };

// const habitInputBox = document.createElement("input");
// habitInputBox.setAttribute("type", "text");
// habitInputBox.name = "newbox";
// habitInputBox.placeholder = "Insert habit";
// habitInputBox.classList.add("habit-input-box");

// document.getElementById("newHabitId").appendChild(habitInputBox);

// const habitsubmit = document.createElement("button");
// habitsubmit.textContent = "Submit";
// habitsubmit.id = "input-box-submit";
// habitsubmit.classList.add("habit-submit");

// document.getElementById("child").appendChild(habitsubmit);

// habitsubmit.addEventListener("click", function () {
//     document.getElementById("child").removeChild(document.getElementById("input-box-submit"));

//     const inputElements = document.querySelectorAll(".habit-input-box");
//     for (let i = 2; i < inputElements.length; i++) {
//       inputValues.push(inputElements[i].value);
//       console.log(inputValues);
//       setRandom((prevRandom) => [...prevRandom, inputElements[i].value]);
//       console.log(random);

//       while (document.getElementById("newHabitId").firstChild) {
//         document
//           .getElementById("newHabitId")
//           .removeChild(document.getElementById("newHabitId").firstChild);
//       }

//       while (document.getElementById("tempTable").firstChild) {
//         document
//           .getElementById("tempTable")
//           .removeChild(document.getElementById("tempTable").firstChild);
//       }

//     }
//   })
// };
