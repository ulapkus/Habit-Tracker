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
            <Modal />
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

// OLD - USING TABLE:
// return (
//   <div className="background">
//     {/* <h1>My Habit Tracker</h1> */}
//     <div className="mainquestions">
//       <section className="border">
//         <Context.Provider value={[random, setRandom]}>
//           <Modal />
//         </Context.Provider>
//         <section className="habits">
//           <h3 className="habit-heading">Habit</h3>
//           {random.map((item, index) => (
//             <p key={index} className="tablebody">
//               {item}
//             </p>
//           ))}
//         </section>

//         <section className="days-boxes">
//           <table>
//             <thead>
//               <tr>
//                 <th>Day 1</th>
//                 <th>Day 2</th>
//                 <th>Day 3</th>
//                 <th>Day 4</th>
//                 <th>Day 5</th>
//                 <th>Day 6</th>
//                 <th>Day 7</th>
//               </tr>
//             </thead>

//             <tbody className="habit-rows" id="mytable">
//               <tr onClick={location} className="first-habit row">
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//               <tr onClick={location} className="second-habit row">
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </section>
//       </section>
//     </div>
//   </div>
// );
// }

{
  /* <div className="habit-days">
              <div className="habit-days-individual">Day 1</div>
              <div>Day 2</div>
              <div>Day 3</div>
              <div>Day 4</div>
              <div>Day 5</div>
              <div>Day 6</div>
              <div>Day 7</div>
            </div> */
}
