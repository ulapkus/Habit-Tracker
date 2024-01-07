"use client";

import React, { useEffect, useState, createContext } from "react";
import Child from "../questions";
import { format, addDays, setMonth, subDays } from "date-fns";
import { getSession } from "next-auth/react";

export const Context = createContext([[], () => {}]);
export const DaysContext = React.createContext();
export const ColorContext = React.createContext();
export const ModalContext = React.createContext();

// need to address if all habits are erased
// need to prevent user from going beyond current month/week

export default function Chart() {
  const [habits, setHabits] = useState(["workout", "yoga", "water"]);
  const [days, setDays] = useState({
    workout: [
      "2023-10-16",
      "2023-10-20",
      "2023-10-21",
      "2023-11-1",
      "2023-11-2",
      "2023-11-4",
      "2023-11-8",
      "2023-11-10",
      "2023-11-27",
    ],
    yoga: [
      "2023-10-21",
      "2023-10-30",
      "2023-11-2",
      "2023-11-6",
      "2023-11-7",
      "2023-11-9",
      "2023-11-26",
      "2023-11-27",
    ],
    water: [
      "2023-10-26",
      "2023-10-31",
      "2023-11-3",
      "2023-11-4",
      "2023-11-5",
      "2023-11-7",
      "2023-11-10",
      "2023-11-25",
      "2023-11-28",
    ],
  });
  const [colors, setColors] = useState({
    workout: "purple",
    yoga: "green",
    water: "blue",
  });
  const [inputFields, setInputFields] = useState([]);
  const [colorFields, setColorFields] = useState([]);
  const [weekCount, setWeekCount] = useState(-1);
  const [view, setView] = useState("week");
  const [modalVisibility, setModalVisibility] = useState(true);
  const [newHabitAdded, setNewHabitAdded] = useState(true);
  // const [currentMonths, setCurrentMonths] = useState(12);
  const [currentMonths, setCurrentMonths] = useState(() => {
    const firstdayofweek = subDays(new Date(), 6);
    const month = firstdayofweek.getMonth() + 1;
    return month;
  });

  const [currentYear, setCurrentYear] = useState(2023);
  const [selectedDates, setSelectedDates] = useState(() => {
    const today = new Date();
    const past7Days = Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - index);
      return currentDate;
    });
    return past7Days.sort((a, b) => a - b);
  });



  // const saveAddHabit = async () => {
  //   const session = await getSession();

  //   const email = session.user.email;
  //   const dataa = "testhabittwo";
  //   try {
  //     const res = await fetch("/api/test", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         dataa,
  //       }),
  //     });
  //     await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addHabit = () => {
    const addInput = [...inputFields, []];
    setInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);

    setNewHabitAdded(false);
  };


  const saveAddHabit = async () => {
    const session = await getSession();

    const dataObject = {};
    inputFields.forEach((category) => {
      dataObject[category] = [];
    });

    const email = session.user.email;
    const dataa = habits;
    const datacolor = colorFields;

    try {
      const res = await fetch("/api/testchart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          dataa,
          datacolor,
          dataObject,

        }),
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveAddHabit();
  }, [addHabit]);

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

  const submit = () => {
    setHabits([...habits, ...inputFields]);
    setNewHabitAdded(true);

    inputFields.map((inputField, index) => {
      setDays((prevDays) => ({
        ...prevDays,
        [inputFields[index]]: [],
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

  const eraseHabit = (activity, i) => {
    const removeFromHabits = [...habits];
    removeFromHabits.splice(i, 1);
    setHabits(removeFromHabits);

    const newDays = { ...days };
    delete newDays[activity];
    setDays(newDays);
  };

  const handleCellClickWeek = (activityy, dayIndexx) => {
    const currentDate = selectedDates[dayIndexx];
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const isSelected = days[activityy].includes(formattedDate);
    if (isSelected) {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activityy]: prevDays[activityy].filter(
            (date) => date !== formattedDate
          ),
        };
      });
    } else {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activityy]: [...prevDays[activityy], formattedDate],
        };
      });
    }
  };

  const back = () => {
    setWeekCount((prevWeekCount) => prevWeekCount - 1);
  };

  const next = () => {
    setWeekCount((prevWeekCount) => prevWeekCount + 1);
  };

  const generateDateArray = (state) => {
    const today = addDays(new Date(), 1);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + state * 7);

    const dateArray = Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return currentDate;
    });
    setSelectedDates(dateArray);
    return dateArray;
  };

  useEffect(() => {
    generateDateArray(weekCount);
  }, [weekCount]);

  const today = new Date();

  const calculateStartingDate = () => {
    const daysToAdd = weekCount * 7 + 1;
    const startingDate = new Date(
      currentYear,
      currentMonths,
      today.getDate() + daysToAdd
    );
    return startingDate;
  };

  useEffect(() => {});

  const getBackgroundColorForDayWeek = (activityy, dayIndexxx) => {
    const activityDays = days[activityy];
    const currentDate = new Date(calculateStartingDate());
    currentDate.setDate(currentDate.getDate() + dayIndexxx);

    return activityDays.includes(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    )
      ? colors[activityy]
      : "#81c8e0";
  };

  const formatDate = (datee) => {
    const month = datee.getMonth() + 1;
    const day = datee.getDate();
    return `${month}/${day}`;
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
    const firstDay = selectedDates[0];
    const formattedDate = format(firstDay, "EEEE, M/d");
    return formattedDate;
  };

  const currentWeekSecond = () => {
    const lastDay = selectedDates[6];
    const formattedDate = format(lastDay, "EEEE, M/d");
    return formattedDate;
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
          <div className="month-and-year-week">
            <h4>
              {currentWeekFirst()} - {currentWeekSecond()}
            </h4>
            <p className="currentyear-week">{currentYear}</p>
          </div>
          <img
            className="next"
            onClick={next}
            src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
          ></img>
        </div>
        <div className="main-questions">
          <ModalContext.Provider value={[modalVisibility, setModalVisibility]}>
            <ColorContext.Provider value={[colors, setColors]}>
              <Context.Provider value={[habits, setHabits]}>
                <DaysContext.Provider value={[days, setDays]}>
                  <Child />
                </DaysContext.Provider>
              </Context.Provider>
            </ColorContext.Provider>
          </ModalContext.Provider>
          <table>
            <thead>
              <tr className="test-one">
                <th className="dayz-habits-word">Habits</th>
                {selectedDates.map((datee, dayIndexx) => (
                  <th className="dayz" key={dayIndexx}>
                    {formatDate(datee)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(days).map((activityy, indexx) => (
                <tr key={indexx} className="test">
                  <td className="cell-first">
                    <div className="x-button-div-week">
                      <p
                        onClick={() => eraseHabit(activityy, indexx)}
                        className="x-button-week"
                      >
                        X
                      </p>
                    </div>
                    <div className="activity-week">{activityy}</div>
                  </td>
                  {selectedDates.map((datee, dayIndexxx) => (
                    <td
                      className="cell"
                      key={dayIndexxx}
                      onClick={() => handleCellClickWeek(activityy, dayIndexxx)}
                      style={{
                        backgroundColor: getBackgroundColorForDayWeek(
                          activityy,
                          dayIndexxx
                        ),
                      }}
                    >
                      {getBackgroundColorForDayWeek(activityy, dayIndexxx) ===
                        colors[activityy]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <tbody>
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
                    {[...Array(7)].map((_, dayIndex) => (
                      <td key={dayIndex} className="cell"></td>
                    ))}
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
          <div>
            <button onClick={saveAddHabit}>Save</button>
          </div>
        </div>
        <button className="month-view" onClick={monthView}>
          Month View
        </button>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonths((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonths === 0 ? prevYear - 1 : prevYear
    );
  };

  const goToNextMonth = () => {
    setCurrentMonths((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonths === 11 ? prevYear + 1 : prevYear
    );
  };

  useEffect(() => {
    renderMonthView();
  }, [currentMonths, currentYear]);

  const getDayOfWeek = (year, month, day) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(year, month, day);
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  };

  const theCurrentMonth = format(setMonth(new Date(), currentMonths), "MMMM");

  const handleCellClick = (activity, dayIndex) => {
    const currentDate = new Date(currentYear, currentMonths, dayIndex + 1);
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const isSelected = days[activity].includes(formattedDate);

    if (isSelected) {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activity]: prevDays[activity].filter(
            (date) => date !== formattedDate
          ),
        };
      });
    } else {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activity]: [...prevDays[activity], formattedDate],
        };
      });
    }
  };

  const getBackgroundColorForDay = (activity, dayIndex) => {
    const activityDays = days[activity];
    const currentDate = new Date(currentYear, currentMonths, dayIndex + 1);

    return activityDays.includes(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    )
      ? colors[activity]
      : "#81c8e0";
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderMonthView = () => {
    return (
      <div>
        <div className="background-month">
          <div className="month-nextAndBackButtons">
            <img
              className="backMonth"
              onClick={goToPreviousMonth}
              src="https://cdn-icons-png.flaticon.com/128/860/860790.png"
            ></img>
            <div className="month-and-year">
              <h6 className="currentMonth">{theCurrentMonth}</h6>
              <p className="currentYear">{currentYear}</p>
            </div>
            <img
              className="nextMonth"
              onClick={goToNextMonth}
              src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
            ></img>
          </div>
          <div className="main-questions-month">
            <ModalContext.Provider
              value={[modalVisibility, setModalVisibility]}
            >
              <ColorContext.Provider value={[colors, setColors]}>
                <Context.Provider value={[habits, setHabits]}>
                  <DaysContext.Provider value={[days, setDays]}>
                    <Child />
                  </DaysContext.Provider>
                </Context.Provider>
              </ColorContext.Provider>
            </ModalContext.Provider>
            <div className="randdd">
              <table className="habit-table-month">
                <thead>
                  <tr className="month-header-one">
                    {Array.from(
                      { length: getDaysInMonth(currentYear, currentMonths) },
                      (_, dayIndex) => (
                        <th className="month-dayz" key={dayIndex}>
                          {dayIndex + 1}
                        </th>
                      )
                    )}
                  </tr>
                  <tr className="month-header-two">
                    <td className="month-dayz-habits-word">Habits</td>

                    {Array.from(
                      { length: getDaysInMonth(currentYear, currentMonths) },
                      (_, dayIndex) => (
                        <th className="month-daysofweek" key={dayIndex}>
                          {getDayOfWeek(
                            currentYear,
                            currentMonths,
                            dayIndex + 1
                          )}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(days).map((activity, index) => (
                    <tr key={index} className="month-cell-row">
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
                      {Array.from(
                        { length: getDaysInMonth(currentYear, currentMonths) },
                        (_, dayIndex) => (
                          <td
                            className="month-cell"
                            key={dayIndex}
                            onClick={() => handleCellClick(activity, dayIndex)}
                            style={{
                              backgroundColor: getBackgroundColorForDay(
                                activity,
                                dayIndex
                              ),
                            }}
                          >
                            {getBackgroundColorForDay(activity, dayIndex) ===
                              colors[activity]}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
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
                        {Array.from(
                          {
                            length: getDaysInMonth(currentYear, currentMonths),
                          },
                          (_, i) => (
                            <td key={i} className="month-cell"></td>
                          )
                        )}
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
