import React, { useState } from "react";
import Modal from "./modal";

export const Context = React.createContext();

export default function Chart() {
  const [random, setRandom] = useState([]);

  const location = (event) => {
    const clickedCell = event.target;
    const rowIndex = clickedCell.parentElement.rowIndex;
    const cellIndex = clickedCell.cellIndex;

    if (event.target.tagName === "TD") {
      console.log(rowIndex);
      console.log(document.getElementById("mytable").rows[0])
    }
    for (let i = 0; i <= 6; i++) {
      if (rowIndex === 1 && cellIndex === i) {
        document.getElementById("mytable").rows[0].cells[i].style.backgroundColor = "red";
      }
       else if (rowIndex === 2 && cellIndex === i) {
        document.getElementById("mytable").rows[1].cells[i].style.backgroundColor = "pink";
      }
    }
  };

  return (
    <div className="background">
      {/* <h1>My Habit Tracker</h1> */}
      <div className="mainquestions">
        <section className="border">
          <Context.Provider value={[random, setRandom]}>
            <Modal />
          </Context.Provider>
          <section className="habits">
            <h3 className="tablebody">Habit</h3>
            {random.map((item, index) => (
              <p key={index} className="tablebody">
                {item}
              </p>
            ))}
          </section>

          <section className="days-boxes">
            <table>
              <thead>
                <tr>
                  <th>Day 1</th>
                  <th>Day 2</th>
                  <th>Day 3</th>
                  <th>Day 4</th>
                  <th>Day 5</th>
                  <th>Day 6</th>
                  <th>Day 7</th>
                </tr>
              </thead>

              <tbody className="habit-rows" id="mytable">
                <tr onClick={location} className="first-habit">
                  <td>row 1 box 1</td>
                  <td>row 1 box 2</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                </tr>
                <tr onClick={location} className="second-habit">
                  <td>row 2 box 1</td>
                  <td>row 2 box 2</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                  <td>box</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </div>
  );
}

// OLD:
// {random.map((item, index) => (
//   <tbody key={index} className="tablebody">
//     <tr>
//       {/* <td className="clickbox" >{item}</td> */}
//       <td id="clickboxx" className="clickbox" onClick={location}>box</td>
//       {/* <td id="clickboxx" className="clickbox" onClick={location}>box</td> */}

//       {/* <td>box</td>
//        <td>box</td>
//       <td>box</td>
//       <td>box</td>
//       <td>box</td>
//       <td>box</td> */}
//     </tr>
//   </tbody>
// ))}
