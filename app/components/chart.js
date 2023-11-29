"use client";

import React, { useEffect, useState } from "react";
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
  const [weekCount, setWeekCount] = useState(0);
  const [view, setView] = useState("week");
  const [modalVisibility, setModalVisibility] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()));
  const [monthCount, setMonthCount] = useState(0);
  const [startDate, setStartDate] = useState("2023-10-12");
  const [lastLogin, setLastLogin] = useState("2023-11-19");
  const [daysDifference, setDaysDifference] = useState(0);
  const [runUpdateDays, setRunUpdateDays] = useState(true);
  const [newHabitAdded, setNewHabitAdded] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUpdate = () => {
    const startDateObj = new Date(lastLogin);
    const currentDate = new Date();
    const timeDifference = currentDate - startDateObj;
    const newDaysDifference = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    setDaysDifference(newDaysDifference);
    setLastLogin(format(new Date(), "y-MM-d"));
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

    setNewHabitAdded(false);
  };

  const handleInputChange = (onChangeValue, i) => {
    const inputValue = [...inputFields];
    inputValue[i] = onChangeValue.target.value;
    setInputFields(inputValue);
  };

  const handleColorChange = (event, i) => {
    const colorValue = [...colorFields];
    colorValue[i] = event.target.value;

    setColorFields(colorValue);
  };

  const removeInput = (i) => {
    const removeInput = [...inputFields];
    removeInput.splice(i, 1);
    setInputFields(removeInput);

    const removeColor = [...colorFields];
    removeColor.splice(i, 1);
    setColorFields(removeColor);

    setNewHabitAdded(true);
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
    setNewHabitAdded(true);

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

  const dayClicked = (event, rowName, index) => {
    const firstDayOfWeek = days[rowName].length - 7;

    if (days[rowName][firstDayOfWeek + index] === "0") {
      const currentDate = subDays(new Date(), 7);

      setDays((prevDays) => {
        const newDays = { ...prevDays };
        newDays[rowName][firstDayOfWeek + index] = format(
          addDays(currentDate, index + 1),
          "y-MM-d"
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
            "y-MM-d"
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
            "y-MM-d"
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

  const eraseHabit = (activity, i) => {
    const removeFromHabits = [...habits];
    removeFromHabits.splice(i, 1);
    setHabits(removeFromHabits);

    const newDays = { ...days };
    delete newDays[activity];
    setDays(newDays);
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

  const currentWeekFirst = () => {
    const firstDay = format(subDays(new Date(), 6), "EEEE, MM/d");
    return firstDay;
  };

  const currentWeekSecond = () => {
    const currentDay = format(new Date(), "EEEE, MM/d");
    return currentDay;
  };

  const renderWeekView = () => {
    return (
      <div className="background-week">
        <div className="nextAndBackButtons">
          <img
            className="back"
            onClick={back}
            src="https://cdn-icons-png.flaticon.com/128/860/860790.png"
          ></img>

          <h4>
            {currentWeekFirst()} - {currentWeekSecond()}
          </h4>
          <img
            className="next"
            onClick={next}
            src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
          ></img>
        </div>
        <div className="main-questions">
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
          {/* <div>{loginUpdate}</div> */}

          <table>
            <thead>
              <tr className="test-one">
                <td className="dayz-habits-word">Habits</td>
                {nextWeekDates.map((date, index) => (
                  <td className="dayz" key={index}>{`${
                    date.getMonth() + 1
                  }/${date.getDate()}`}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekCount <= 0 ? (
                Object.keys(days).map((activity, i) => {
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
                      <td className="cell-first">
                        <div className="x-button-div-week">
                          <p
                            onClick={() => eraseHabit(activity, i)}
                            className="x-button-week"
                          >
                            X
                          </p>
                        </div>
                        <div className="activity-week">{activity}</div>
                      </td>
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

          <table>
            <tbody>
              {/* {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} */}

              {inputFields.map((inputField, i) => {
                return (
                  <tr key={i} className="add-habit-row">
                    <td className="cell-new-habit">
                      <p
                        className="add-habit-x-button"
                        onClick={() => removeInput(i)}
                      >
                        X
                      </p>
                      <div className="add-habit-x-div">
                        <input
                          className="input-box-week"
                          value={inputField}
                          onChange={(e) => handleInputChange(e, i)}
                          placeholder="Habit"
                        />
                        <div className="select-week">
                          <select
                            className="color-dropdown"
                            onChange={(event) => handleColorChange(event, i)}
                          >
                            <option value="">Choose color:</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                          </select>
                        </div>
                        <button className="submit-button-week" onClick={submit}>
                          Submit
                        </button>
                      </div>
                    </td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                    <td className="cell"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="add-more-div-week">
            {newHabitAdded === true ? (
              <p className="add-more-week" onClick={() => addHabit()}>
                +
              </p>
            ) : null}
          </div>
        </div>
        <button className="month-view" onClick={monthView}>
          Month View
        </button>
      </div>
    );
  };

  // this needs to change so its not the first but the oldest habit that the user has
  function getUpcomingMonthDates() {
    const firstArray = Object.values(days)[0];
    const lengthOfFirstArray = firstArray.length;
    const today = new Date();
    today.setMonth(currentMonth);
    const nextMonthDates = [];
    const firstDay = startOfMonth(today);
    const totalDaysInMonth = endOfMonth(today).getDate();
    const firstDayOfMonthIndex = lengthOfFirstArray - getDate(new Date());
    const lastIndex = lengthOfFirstArray;
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
        <div className="background-month">
          <div className="month-nextAndBackButtons">
            <img
              className="backMonth"
              onClick={backMonth}
              src="https://cdn-icons-png.flaticon.com/128/860/860790.png"
            ></img>
            <div className="currentMonth">{theCurrentMonth}</div>
            <img
              className="nextMonth"
              onClick={nextMonth}
              src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
            ></img>
          </div>
          <div className="main-questions-month">
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
            {/* <div className="x-buttons-month">
              {habits.map((activity, i) => (
                <div key={i}>
                  <p
                    className="x-month"
                    onClick={() => eraseHabit(activity, i)}
                  >
                    X
                  </p>
                </div>
              ))}
            </div> */}
            <div className="randdd">
              <table className="habit-table-month">
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
                  {Object.keys(days).map((activity, i) => {
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
                        <td className="month-cell-habit">
                          <div className="x-button-div-month">
                            <p
                              onClick={() => eraseHabit(activity, i)}
                              className="x-button-month"
                            >
                              X
                            </p>
                          </div>
                          <div className="activity-month">{activity}</div>
                        </td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <table className="add-habit-table">
                <tbody>
                  {inputFields.map((inputField, i) => {
                    return (
                      <tr key={i} className="add-habit-row-month">
                        <td className="month-cell-new-habit">
                          <p
                            className="add-habit-x-button-month"
                            onClick={() => removeInput(i)}
                          >
                            X
                          </p>
                          <div className="add-habit-x-div-month">
                            <input
                              className="input-box-month"
                              value={inputField}
                              onChange={(e) => handleInputChange(e, i)}
                              placeholder="Habit"
                            />
                            <select
                              className="color-dropdown-month"
                              onChange={(event) => handleColorChange(event, i)}
                            >
                              <option className="option-month" value="">
                                Choose color:
                              </option>
                              <option className="option-month" value="red">
                                Red
                              </option>
                              <option className="option-month" value="orange">
                                Orange
                              </option>
                              <option className="option-month" value="yellow">
                                Yellow
                              </option>
                              <option className="option-month" value="green">
                                Green
                              </option>
                              <option className="option-month" value="blue">
                                Blue
                              </option>
                              <option className="option-month" value="purple">
                                Purple
                              </option>
                            </select>
                            <button
                              className="submit-button-month"
                              onClick={submit}
                            >
                              Submit
                            </button>
                          </div>
                        </td>
                        {nextMonthDates.map((date, i) => (
                          <td key={i} className="month-cell"></td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="add-more-div-month">
                {newHabitAdded === true ? (
                  <p className="add-more-month" onClick={() => addHabit()}>
                    +
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <button className="week-view" onClick={weekView}>
            Week View
          </button>
        </div>
      </div>
    );
  };

  return <div>{view === "week" ? renderWeekView() : renderMonthView()}</div>;
}
