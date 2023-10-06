import React, { useState, useEffect } from "react";
import Questions from "./questions";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);
  const [renderCount, setRenderCount] = useState(["", "", "", "", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState("");
  const colors = ["red", "pink", "green"];
  const inputValues = [];

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
    habitInputBox.id = "blahhh";
    habitInputBox.classList.add("habit-input-box");

    habitInputBox.addEventListener("change", function () {
      // const inputValue = event.target.value;
      const inputElements = document.querySelectorAll("input");
      for (let i = 2; i < inputElements.length; i++) {
        inputValues.push(inputElements[i].value);
        // console.log(inputElements[i].value);
      }

      //     setInputValues((prevInputValues) => [...prevInputValues, inputValue[i]]);
    });

    document.getElementById("newHabitId").appendChild(habitInputBox);

    const habitsubmit = document.createElement("button");
    habitsubmit.textContent = "Submit";
    // habitsubmit.id = "submitz";
    habitsubmit.id = "input-box-submit";
    habitsubmit.classList.add("habit-submit");

    document.getElementById("child").appendChild(habitsubmit);

    // habitsubmit.addEventListener("click", function () {
    //   // const inputValue = event.target.value;

    //   // setInputValues((prevInputValues) => [...prevInputValues, inputValue]);
    //   console.log(inputValues);
    // });

    //   const habitsubmits = document.getElementById("submitz");
    //   // const habitInputBoxes = document.getElementsByClassName("habit-submit")
    //   habitsubmits.addEventListener("click", function (event) {
    //     setInputValues(event.target.value);
    //  console.log(inputValues);
    //     // for (let i = 0; i < habitInputBoxes.length; i++) {
    //     //   const newArray = [];
    //     //   newArray.push(habitInputBoxes.value[i]);
    //     //   // return newArray;
    //     //   console.log(newArray);

    //     // }
    //   });
  };

  //   const habitsubmits = document.getElementById("submitz");
  //   // const habitInputBoxes = document.getElementsByClassName("habit-submit")
  //   habitsubmits.addEventListener("click", function (event) {
  //     setInputValues(event.target.value);
  //  console.log(inputValues);
  //     // for (let i = 0; i < habitInputBoxes.length; i++) {
  //     //   const newArray = [];
  //     //   newArray.push(habitInputBoxes.value[i]);
  //     //   // return newArray;
  //     //   console.log(newArray);

  //     // }
  //   });

  const handleChange = (event) => {
    setInputValues(event.target.value);
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
      dropdown.id = "select";

      for (let j = 0; j <= colors.length; j++) {
        const option = document.createElement("option");
        option.className = "colorz";

        // option.className = colors[j];
        option.text = colors[j];
        option.value = colors[j];
        option.id = "text";

        dropdown.appendChild(option);
      }

      document.getElementById("checkbox-parent").appendChild(dropdown);
    }

    document.getElementById("select").addEventListener("change", handleColorSelection);

  }

const handleColorSelection = (event) => {
const cellsInFirstRow = document.querySelectorAll(".first-habit-cell");
    const selectedColor = event.target.value;

cellsInFirstRow.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    switch (selectedColor) {
      case "red":
        event.target.style.backgroundColor = "red";
        break;
      case "green":
        event.target.style.backgroundColor = "green";
        break;
      case "pink":
        event.target.style.backgroundColor = "pink";
        break;
    }
  });
});}




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
      <h1 id="white">My Habit Tracker</h1>
      <button id="submitz" onClick={() => console.log(inputValues[2].value)}>
        submitz
      </button>
      {/* <button onClick={colorFul}>Hi</button> */}
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
                        <td
                          key={dindex}
                          className="first-habit-cell cell"
                        >
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
          {/* <button className="chart-buttons-individual" onClick={save}>Save</button> */}
          <button className="chart-buttons-individual">Other</button>
        </div>
      </div>
    </div>
  );
}
