"use client";

import React, { useEffect, useState, useCallback } from "react";
import Questions from "./questions";
import {
  format,
  subDays,
  addDays,
  endOfMonth,
  startOfMonth,
  getMonth,
  getDate,
  getDaysInMonth,
  setMonth,
  setDay,
  sub,
  differenceInDays,
} from "date-fns";

export const Context = React.createContext();
export const OtherContext = React.createContext();
export const ColorContext = React.createContext();
export const ModalVisibilityContext = React.createContext();

export default function Chart() {
  const [habits, setHabits] = useState(["workout", "yoga", "water"]);

  // longer version
  const [days, setDays] = useState({
    workout: [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2023-10-16",
      "0",
      "0",
      "0",
      "2023-10-20",
      "2023-10-21",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2023-11-2",
      "0",
      "2023-11-4",
      "0",
      "0",
      "0",
      "2023-11-8",
      "0",
      "2023-11-10",
      "0",
      "0",
      "2023-11-13",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
    yoga: [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2023-10-21",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2023-10-30",
      "0",
      "0",
      "2023-11-2",
      "0",
      "0",
      "0",
      "2023-11-6",
      "2023-11-7",
      "0",
      "2023-11-9",
      "2023-11-10",
      "0",
      "2023-11-12",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
    water: [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "2023-10-26",
      "0",
      "0",
      "0",
      "0",
      "2023-10-31",
      "0",
      "0",
      "2023-11-3",
      "2023-11-4",
      "2023-11-5",
      "0",
      "2023-11-7",
      "0",
      "0",
      "2023-11-10",
      "2023-11-11",
      "0",
      "0",
      "2023-11-14",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
  });

  // shorter version
  // const [days, setDays] = useState({
  //   workout: [
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "2023-11-2",
  //     "0",
  //     "2023-11-4",
  //     "0",
  //     "0",
  //     "0",
  //     "2023-11-8",
  //     "0",
  //     "2023-11-10",
  //     "0",
  //     "0",
  //     "2023-11-13",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //   ],
  //   yoga: [
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "2023-11-2",
  //     "0",
  //     "0",
  //     "0",
  //     "2023-11-6",
  //     "2023-11-7",
  //     "0",
  //     "2023-11-9",
  //     "2023-11-10",
  //     "0",
  //     "2023-11-12",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //   ],
  //   water: [
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "2023-11-3",
  //     "2023-11-4",
  //     "2023-11-5",
  //     "0",
  //     "2023-11-7",
  //     "0",
  //     "0",
  //     "2023-11-10",
  //     "2023-11-11",
  //     "0",
  //     "0",
  //     "2023-11-14",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //     "0",
  //   ],
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
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()));
  const [monthCount, setMonthCount] = useState(0);
  const [startDate, setStartDate] = useState("2023-10-12");
  const [lastLogin, setLastLogin] = useState("2023-11-19");
  const [daysDifference, setDaysDifference] = useState(0);
  const [runUpdateDays, setRunUpdateDays] = useState(true);

  const loginUpdate = () => {
    const startDateObj = new Date(lastLogin);
    const currentDate = new Date();
    const timeDifference = currentDate - startDateObj;
    const newDaysDifference = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    setDaysDifference(newDaysDifference);
    setLastLogin(format(new Date(), "y-MM-dd"));
  };

  if (daysDifference > 0) {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };

      Object.keys(updatedDays).forEach((activity) => {
        const array = updatedDays[activity];
        for (let i = 0; i < daysDifference; i++) {
          array.push("0");
        }
      });

      setDaysDifference(0);
      setRunUpdateDays(false);
      return updatedDays;
    });
  }

  useEffect(() => {
    if (runUpdateDays) {
      loginUpdate();
    }
  }, [runUpdateDays]);

  const addHabit = () => {
    const addInput = [...inputFields, []];
    setInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);
  };

  const dayClicked = (event, rowName, index) => {
    const firstDayOfWeek = days[rowName].length - 7;

    if (days[rowName][firstDayOfWeek + index] === "0") {
      const currentDate = subDays(new Date(), 7);

      setDays((prevDays) => {
        const newDays = { ...prevDays };
        newDays[rowName][firstDayOfWeek + index] = format(
          addDays(currentDate, index + 1),
          "y-MM-dd"
        );
        return newDays;
      });
    } else {
      setDays((prevDays) => {
        const newDays = { ...prevDays };
        newDays[rowName][firstDayOfWeek + index] = "0";
        return newDays;
      });
    }
  };

  const dayClickedMonth = (event, rowName, index) => {
    const datee = new Date();
    const result = sub(datee, {
      months: -1 * monthCount,
    });
    const startofmonth = startOfMonth(result);
    const endofmonth = endOfMonth(result);
    const newlengthOfArray =
      days[rowName].length + (differenceInDays(endofmonth, datee) - 1);
    const newfirstDayOfMonthIndex =
      newlengthOfArray - getDaysInMonth(new Date(result));
    const firstDayOfMonthIndex = days[rowName].length - getDate(new Date());

    if (monthCount === 0) {
      if (days[rowName][firstDayOfMonthIndex + index] === "0") {
        setDays((prevDays) => {
          const newDays = { ...prevDays };
          newDays[rowName][firstDayOfMonthIndex + index] = format(
            addDays(startofmonth, index),
            "y-MM-dd"
          );
          return newDays;
        });
      } else {
        setDays((prevDays) => {
          const newDays = { ...prevDays };
          newDays[rowName][firstDayOfMonthIndex + index] = "0";
          return newDays;
        });
      }
    } else if (monthCount < 0) {
      if (days[rowName][newfirstDayOfMonthIndex + index] === "0") {
        setDays((prevDays) => {
          const newDays = { ...prevDays };
          newDays[rowName][newfirstDayOfMonthIndex + index] = format(
            addDays(startofmonth, index),
            "y-MM-dd"
          );
          return newDays;
        });
      } else {
        setDays((prevDays) => {
          const newDays = { ...prevDays };
          newDays[rowName][newfirstDayOfMonthIndex + index] = "0";
          return newDays;
        });
      }
    }
  };

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

  const newArray = [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

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

  const removeHabit = () => {
    const deletehabits = [...deleteHabit, []];
    setDeleteHabit(deletehabits);
  };

  console.log(deleteHabit);

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

  function getUpcomingWeekDates() {
    const today = new Date();
    today.setDate(today.getDate() + 7 * weekCount);
    const nextWeekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
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

  const nextMonth = () => {
    setCurrentMonth(currentMonth + 1);
    setMonthCount(monthCount + 1);
  };

  const backMonth = () => {
    setCurrentMonth(currentMonth - 1);
    setMonthCount(monthCount - 1);
  };

  const weekView = () => {
    setView("week");
    setModalVisibility(false);
  };

  const monthView = () => {
    setView("month");
    setModalVisibility(false);
  };

  const renderWeekView = () => {
    return (
      <div className="total-content-month">
        <div className="background">
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
            {/* <div>{loginUpdate}</div> */}
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
                {weekCount <= 0 ? (
                  Object.keys(days).map((activity) => {
                    const activityArray = days[activity];
                    const firstDayOfWeek =
                      days[activity].length - 7 + 7 * weekCount;
                    const currentDay = days[activity].length + 7 * weekCount;
                    const slicedArray = activityArray.slice(
                      firstDayOfWeek,
                      currentDay
                    );
                    return (
                      <tr key={activity} className="test">
                        <td className="cell">{activity}</td>
                        {slicedArray.map((value, index) => (
                          <td
                            className="cell"
                            onClick={() => dayClicked(event, activity, index)}
                            key={index}
                            style={{
                              backgroundColor:
                                days[activity][firstDayOfWeek + index] !== "0"
                                  ? colors[activity]
                                  : "",
                            }}
                          ></td>
                        ))}
                        {deleteHabit.map((i) => (
                          <td key={i}>
                            <button onClick={() => eraseHabit(activity)}>
                              X
                            </button>
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="no-data-message">No data here</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
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
            <button className="chart-buttons-individual" onClick={removeHabit}>
              Remove Habit
            </button>

            <button className="chart-buttons-individual" onClick={removeXs}>
              Done
            </button>
            <button className="chart-buttons-individual" onClick={monthView}>
              Month View
            </button>
          </div>
        </div>
      </div>
    );
  };

  // this needs to change so its not workout but the oldest habit that the user has
  function getUpcomingMonthDates() {
    const today = new Date();
    today.setMonth(currentMonth);
    const nextMonthDates = [];
    const firstDay = startOfMonth(today);
    const totalDaysInMonth = endOfMonth(today).getDate();
    const firstDayOfMonthIndex = days.workout.length - getDate(new Date());
    const lastIndex = days.workout.length;
    const habitDaysInThisMonth = lastIndex - firstDayOfMonthIndex;

    if (monthCount === 0 && habitDaysInThisMonth < totalDaysInMonth) {
      for (let i = 0; i < habitDaysInThisMonth; i++) {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        nextMonthDates.push(day);
      }
      return nextMonthDates;
    } else {
      for (let i = 0; i < totalDaysInMonth; i++) {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        nextMonthDates.push(day);
      }
      return nextMonthDates;
    }
  }

  const theCurrentMonth = format(setMonth(new Date(), currentMonth), "MMMM");
  const nextMonthDates = getUpcomingMonthDates();

  const renderMonthView = () => {
    return (
      <div>
        <div className="background">
          <div className="currentMonth">{theCurrentMonth}</div>
          <div className="mainquestions-month">
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
            <div className="month-nextAndBackButtons">
              <button onClick={backMonth}>Back{"<--"}</button>
              <button onClick={nextMonth}>Next{"-->"}</button>
            </div>
            <table>
              <thead>
                <tr className="month-header-one">
                  {nextMonthDates.map((date, indexx) => (
                    <td className="month-daysofweek" key={indexx}>{`${format(
                      date,
                      "EEEEE"
                    )}`}</td>
                  ))}
                </tr>
                <tr className="month-header-two">
                  <td className="month-dayz-habits-word">Habits</td>
                  {nextMonthDates.map((date, index) => (
                    <td
                      className="month-dayz"
                      key={index}
                    >{`${date.getDate()}`}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(days).map((activity) => {
                  const activityArray = days[activity];
                  const datee = new Date();

                  const firstDayOfMonthIndex =
                    days[activity].length - getDate(datee);
                  const lengthOfArray = days[activity].length;
                  const slicedArrayy = days[activity].slice(
                    firstDayOfMonthIndex,
                    lengthOfArray
                  );

                  const result = sub(datee, {
                    months: -1 * monthCount,
                  });
                  const endofmonth = endOfMonth(result);
                  const newlengthOfArray =
                    days[activity].length +
                    (differenceInDays(endofmonth, datee) - 1);
                  const newfirstDayOfMonthIndex =
                    newlengthOfArray - getDaysInMonth(new Date(result));
                  const newslicedArray = activityArray.slice(
                    newfirstDayOfMonthIndex,
                    newlengthOfArray
                  );
                  return (
                    <tr key={activity} className="month-cell-row">
                      <td className="month-cell-habit">{activity}</td>
                      {monthCount === 0
                        ? slicedArrayy.map((value, index) => (
                            <td
                              className="month-cell"
                              onClick={() =>
                                dayClickedMonth(event, activity, index)
                              }
                              key={index}
                              style={{
                                backgroundColor:
                                  value !== "0" ? colors[activity] : "",
                              }}
                            ></td>
                          ))
                        : newslicedArray.map((value, index) => (
                            <td
                              className="month-cell"
                              onClick={() =>
                                dayClickedMonth(event, activity, index)
                              }
                              key={index}
                              style={{
                                backgroundColor:
                                  value !== "0" ? colors[activity] : "",
                              }}
                            ></td>
                          ))}
                      {/* ) : (
                        <td className="cell">Invalid data structure</td>
                      ) */}
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
                  );
                })}
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
          </div>

          <div className="chart-buttons-month">
            <button className="chart-buttons-individual-month" onClick={submit}>
              Submit
            </button>
            <button
              className="chart-buttons-individual-month"
              onClick={() => addHabit()}
            >
              Add Habit
            </button>
            <button
              className="chart-buttons-individual-month"
              onClick={removeHabit}
            >
              Remove Habit
            </button>
            <button
              className="chart-buttons-individual-month"
              onClick={removeXs}
            >
              Done
            </button>
            <button
              className="chart-buttons-individual-month"
              onClick={weekView}
            >
              Week View
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <div>{view === "week" ? renderWeekView() : renderMonthView()}</div>;
}
