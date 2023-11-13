"use client";

import React, { useState } from "react";
import Questions from "./questions";

import { format, subDays, addDays } from "date-fns";

export const Context = React.createContext();
export const OtherContext = React.createContext();
export const ColorContext = React.createContext();
export const ModalVisibilityContext = React.createContext();

export default function Chart() {
  const [habits, setHabits] = useState(["workout", "yoga", "water"]);

  // make application work with this
  // const [completionDates, setCompletionDates = useState({
  // workout: ['2023-11-11', '2023-11-13'],
  // yoga: ['2023-11-12', '2023-11-15', '2023-11-16'],
  // water: ['2023-11-12', '2023-11-14'],
  // })

  // make back and next buttons work

  // const [displayStartDate, setDisplayStartDate] = useState('2023-10-01')

  // this is week/month mode
  // const [displayMode, setDisplayMode] = useState

  // an array of all the dates showing - will be calculated from start date and display mode
  // const displayedDates = []

  // const displayCompletionData =

  const [days, setDays] = useState({
    workout: ["0", "2023-11-12", "0", "2023-11-13", "0", "0", "0"],
    yoga: ["0", "2023-11-12", "0", "0", "0", "2023-11-15", "2023-11-16"],
    water: ["0", "0", "0", "2023-11-13", "2023-11-14", "0", "0"],
  });

  // console.log(days.workout[0])

  // var date = new Date(days.workout[0]);
  // var dayOfMonth = date.getDate();
  // console.log(dayOfMonth);

  // const result = getDayOfYear(new Date(2014, 6, 2))
  // console.log(result)

  // const [days, setDays] = useState({
  //   workout: [true, false, true, true, false, false, true],
  //   yoga: [true, true, false, false, true, false, false],
  //   water: [false, true, false, true, false, false, true],
  // });

  const [colors, setColors] = useState({
    workout: "purple",
    yoga: "green",
    water: "blue",
  });

  const [inputFields, setInputFields] = useState([]);
  const [colorFields, setColorFields] = useState([]);
  const [deleteHabit, setDeleteHabit] = useState([]);
  const [weekCount, setWeekCount] = useState(0);
  const [view, setView] = useState("week");
  const [modalVisibility, setModalVisibility] = useState(true);

  const addHabit = () => {
    const addInput = [...inputFields, []];
    setInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);
  };

  // old way for t/f - works!

  //   const dayClicked = (event, rowName, index) => {

  //     setDays((prevDays) => {
  //       return {
  //         ...prevDays,
  //         [rowName]: [
  //           ...prevDays[rowName].slice(0, index),
  //           !prevDays[rowName][index],
  //           ...prevDays[rowName].slice(index + 1),
  //         ],
  //       };
  //     });

  // // dont think i need (but keep just in case for now)
  //     // if (days[rowName][index]) {
  //     //   event.target.style.backgroundColor = colors[rowName];
  //     // } else {
  //     //   event.target.style.backgroundColor = "white";
  //     // }
  //   };

  const dayClicked = (event, rowName, index) => {
    if (days[rowName][index] === "0") {
      const currentDate = subDays(new Date(), 7);

      setDays((prevDays) => {
        return {
          ...prevDays,
          [rowName]: [
            ...prevDays[rowName].slice(0, index),
            // days[rowName][index],
            format(
              addDays(currentDate, index + 1 + 7 * weekCount),
              "y" + "-" + "MM" + "-" + "dd"
            ),
            ...prevDays[rowName].slice(index + 1),
          ],
        };
      });
    } else if (days[rowName][index] != "0") {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [rowName]: [
            ...prevDays[rowName].slice(0, index),
            "0",
            ...prevDays[rowName].slice(index + 1),
          ],
        };
      });
    }
  };

  console.log(days.workout);

  const handleInputChange = (onChangeValue, i) => {
    const inputValue = [...inputFields];
    inputValue[i] = onChangeValue.target.value;
    setInputFields(inputValue);
  };

  const handleColorChange = (value, i) => {
    const colorValue = [...colorFields];
    colorValue[i] = value.target.value;
    setColorFields(colorValue);
  };

  const removeInput = (i) => {
    const removeInput = [...inputFields];
    removeInput.splice(i, 1);
    setInputFields(removeInput);

    const removeColor = [...colorFields];
    removeColor.splice(i, 1);
    setColorFields(removeColor);
  };

  const submit = () => {
    setHabits([...habits, ...inputFields]);

    inputFields.map((inputField, index) => {
      setDays((prevDays) => ({
        ...prevDays,
        [inputFields[index]]: newArray,
      }));
    });

    inputFields.map((inputField, index) => {
      setColors((prevColor) => ({
        ...prevColor,
        [inputFields[index]]: colorFields[index],
      }));
    });

    setInputFields([]);
    setColorFields([]);
  };

  const newArray = [true, false, false, false, false, false, true];

  const removeHabit = () => {
    const deletehabit = [...deleteHabit, []];
    setDeleteHabit(deletehabit);
  };

  const eraseHabit = (activity, i) => {
    const removeFromHabits = [...habits];
    removeFromHabits.splice(i, 1);
    setHabits(removeFromHabits);

    const newDays = { ...days };
    delete newDays[activity];
    setDays(newDays);
  };

  const removeXs = () => {
    setDeleteHabit([]);
  };

  // const currentDate = new Date();
  // console.log(currentDate)
  // const month = currentDate.getMonth() + 1;
  // const day = currentDate.getDate();
  // const year = currentDate.getFullYear();

  // var getDate = require('date-fns/getDate')
  // formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  // const result = getDate(new Date(2012, 1, 29))
  // const result = getDate(new Date(2012, 1, 29))

  // console.log(format(new Date(), "'Today is a' eeee"))

  function getUpcomingWeekDates() {
    const today = new Date();
    today.setDate(today.getDate() + 7 * weekCount);
    const nextWeekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - 6 + i);
      nextWeekDates.push(date);
    }

    return nextWeekDates;
  }
  const nextWeekDates = getUpcomingWeekDates();

  const next = () => {
    setWeekCount(weekCount + 1);
  };

  const back = () => {
    setWeekCount(weekCount - 1);
  };

  const weekView = () => {
    setView("week");
    setModalVisibility(false);
  };

  const monthView = () => {
    setView("month");
    setModalVisibility(false);
    // setWeekCount(0);
  };

  const renderWeekView = () => {
    return (
      <div>
        <div className="background">
          <h1>My Habit Tracker</h1>

          <div className="mainquestions">
            <section className="border">
              <ModalVisibilityContext.Provider
                value={[modalVisibility, setModalVisibility]}
              >
                <ColorContext.Provider value={[colors, setColors]}>
                  <Context.Provider value={[habits, setHabits]}>
                    <OtherContext.Provider value={[days, setDays]}>
                      <Questions />
                    </OtherContext.Provider>
                  </Context.Provider>
                </ColorContext.Provider>
              </ModalVisibilityContext.Provider>
            </section>
            <div className="nextAndBackButtons">
              <button className="back" onClick={back}>
                Back{"<--"}
              </button>
              <button className="next" onClick={next}>
                Next{"-->"}
              </button>
            </div>
            <table>
              <thead>
                <tr className="test-one">
                  <td className="dayz">Habits</td>
                  {nextWeekDates.map((date, index) => (
                    <td className="dayz" key={index}>{`${
                      date.getMonth() + 1
                    }/${date.getDate()}`}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(days).map((activity) => (
                  <tr key={activity} className="test">
                    <td className="cell">{activity}</td>
                    {days[activity].map((value, index) => (
                      <td
                        className="cell"
                        onClick={() => dayClicked(event, activity, index)}
                        key={index}
                        // i have to make it for the backgroundColor below so that the color changes on the box where there is a
                        // corresponding date in the array
                        // ex: if it says 2023-10-01, then on the chart this day should change color

                        // old:
                        // style={{
                        //   backgroundColor: days[activity][index]
                        //     ? colors[activity]
                        //     : "",
                        // }}

                        style={{
                          backgroundColor:
                            days[activity][index] !== "0"
                              ? colors[activity]
                              : "",
                        }}
                      ></td>
                    ))}
                    {deleteHabit.map((i) => {
                      return (
                        <td key={i}>
                          <button onClick={() => eraseHabit(activity)}>
                            X
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <button>Choose color</button> */}
            <div className="ran">
              <div className="habit-input">
                {inputFields.map((inputField, i) => {
                  return (
                    <div key={i}>
                      <input
                        value={inputField}
                        onChange={(e) => handleInputChange(e, i)}
                        placeholder="Habit"
                      />

                      <button onClick={() => removeInput(i)}>X</button>
                    </div>
                  );
                })}
              </div>
              <div className="color-input">
                {colorFields.map((colorField, index) => {
                  return (
                    <div key={index}>
                      <input
                        value={colorField}
                        onChange={(e) => handleColorChange(e, index)}
                        placeholder="Color"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="chart-buttons">
              <button className="chart-buttons-individual" onClick={submit}>
                Submit
              </button>
              <button
                className="chart-buttons-individual"
                onClick={() => addHabit()}
              >
                Add Habit
              </button>
              <button
                className="chart-buttons-individual"
                onClick={removeHabit}
              >
                Remove Habit
              </button>

              <button className="chart-buttons-individual" onClick={removeXs}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function getUpcomingMonthDates() {
    const today = new Date();
    today.setDate(today.getDate() + 7 * weekCount);
    const nextMonthDates = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      nextMonthDates.push(date);
    }

    return nextMonthDates;
  }
  const nextMonthDates = getUpcomingMonthDates();

  // const renderMonthView = () => {
  //   return (
  //     <div>
  //       <p>Month View</p>
  //       <div className="background">
  //         <h1>My Habit Tracker</h1>

  //         <div className="mainquestions">
  //           <section className="border">
  //             <ModalVisibilityContext.Provider
  //               value={[modalVisibility, setModalVisibility]}
  //             >
  //               <ColorContext.Provider value={[colors, setColors]}>
  //                 <Context.Provider value={[habits, setHabits]}>
  //                   <OtherContext.Provider value={[days, setDays]}>
  //                     <Questions />
  //                   </OtherContext.Provider>
  //                 </Context.Provider>
  //               </ColorContext.Provider>
  //             </ModalVisibilityContext.Provider>
  //           </section>

  //           <button onClick={back}>Back{"<--"}</button>
  //           <button onClick={next}>Next{"-->"}</button>

  //           <table>
  //             <thead>
  //               <tr className="test-one">
  //                 <td className="month-dayz">Habits</td>
  //                 {nextMonthDates.map((date, index) => (
  //                   <td className="month-dayz" key={index}>{`${
  //                     date.getMonth() + 1
  //                   }/${date.getDate()}`}</td>
  //                 ))}
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {Object.keys(days).map((activity) => (
  //                 <tr key={activity} className="test">
  //                   <td className="month-cell">{activity}</td>
  //                   {days[activity].map((value, index) => (
  //                     <td
  //                       className="month-cell"
  //                       onClick={() => dayClicked(event, activity, index)}
  //                       key={index}
  //                       style={{
  //                         backgroundColor: days[activity][index]
  //                           ? colors[activity]
  //                           : "",
  //                       }}
  //                     ></td>
  //                   ))}
  //                   {deleteHabit.map((i) => {
  //                     return (
  //                       <td key={i}>
  //                         <button onClick={() => eraseHabit(activity)}>
  //                           X
  //                         </button>
  //                       </td>
  //                     );
  //                   })}
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //           {/* <button>Choose color</button> */}
  //           <div className="ran">
  //             <div className="habit-input">
  //               {inputFields.map((inputField, i) => {
  //                 return (
  //                   <div key={i}>
  //                     <input
  //                       value={inputField}
  //                       onChange={(e) => handleInputChange(e, i)}
  //                       placeholder="Habit"
  //                     />

  //                     <button onClick={() => removeInput(i)}>X</button>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //             <div className="color-input">
  //               {colorFields.map((colorField, index) => {
  //                 return (
  //                   <div key={index}>
  //                     <input
  //                       value={colorField}
  //                       onChange={(e) => handleColorChange(e, index)}
  //                       placeholder="Color"
  //                     />
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </div>
  //           <div className="chart-buttons">
  //             <button className="chart-buttons-individual" onClick={submit}>
  //               Submit
  //             </button>
  //             <button
  //               className="chart-buttons-individual"
  //               onClick={() => addHabit()}
  //             >
  //               Add Habit
  //             </button>
  //             <button
  //               className="chart-buttons-individual"
  //               onClick={removeHabit}
  //             >
  //               Remove Habit
  //             </button>

  //             <button className="chart-buttons-individual" onClick={removeXs}>
  //               Done
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <button className="week-view" onClick={weekView}>
        Week View
      </button>
      <button className="month-view" onClick={monthView}>
        Month View
      </button>
      {view === "week" ? renderWeekView() : renderMonthView()}
    </div>
  );
}

{
  /* <td className="dayz">Mon</td>
                <td className="dayz">Tues</td>
                <td className="dayz">Wed</td>
                <td className="dayz">Thurs</td>
                <td className="dayz">Fri</td>
                <td className="dayz">Sat</td>
                <td className="dayz">Sun</td> */
}
