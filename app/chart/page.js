"use client";

import React, { useEffect, useState, createContext } from "react";
import Child from "../questions";
import { format, addDays, set, subDays } from "date-fns";

export const Context = createContext([[], () => {}]);
export const DaysContext = React.createContext();
export const ColorContext = React.createContext();
export const ModalContext = React.createContext();

// need to prevent user from going beyond current month/week

export default function Chart() {
  const [habits, setHabits] = useState([]);
  const [days, setDays] = useState({});
  const [colors, setColors] = useState({});
  const [inputFields, setInputFields] = useState([]);
  const [colorFields, setColorFields] = useState([]);
  const [weekCount, setWeekCount] = useState(-1);
  const [view, setView] = useState("week");
  const [isDayClicked, setIsDayClicked] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(true);
  const [newHabitAdded, setNewHabitAdded] = useState(true);
  const [month, setMonth] = useState(() => subDays(new Date(), 6).getMonth());
  //need to fix year for weekview (doesnt change when going back)
  const [year, setYear] = useState(() => subDays(new Date(), 6).getFullYear());
  const [selectedDates, setSelectedDates] = useState(() => {
    const past7Days = Array.from({ length: 7 }, (_, index) => {
      const dates = new Date(new Date());
      dates.setDate(new Date().getDate() - index);
      return dates;
    });
    return past7Days.sort((a, b) => a - b);
  });

  async function fetchState() {
    try {
      const res = await fetch("/api/fetchState");
      if (!res.ok) {
        throw new Error("Error fetching user", error.message);
      }
      const newResponse = await res.json();
      setDays(newResponse.data[0].days);
      setHabits(newResponse.data[0].habits);
      setColors(newResponse.data[0].colors);
    } catch (error) {
      console.log("Error fetching current user", error.message);
    }
  }

  useEffect(() => {
    fetchState();
  }, []);

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
    setIsSubmitClicked(true);
  };

  const eraseHabit = (activity, i) => {
    const newHabits = [...habits];
    newHabits.splice(i, 1);
    setHabits(newHabits);

    const newDays = { ...days };
    delete newDays[activity];
    setDays(newDays);

    const newColors = { ...colors };
    delete newColors[activity];
    setColors(newColors);

    setIsSubmitClicked(true);
  };

  const saveAddOrRemoveHabit = async () => {
    const daysCopy = days;
    const colorsCopy = colors;
    const habitsCopy = habits;
    try {
      const res = await fetch("/api/addOrRemoveHabit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          daysCopy,
          colorsCopy,
          habitsCopy,
        }),
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitClicked) {
      saveAddOrRemoveHabit();
      setIsSubmitClicked(false);
    }
  }, [isSubmitClicked]);

  const saveCellClick = async () => {
    const daysCopy = days;
    try {
      const res = await fetch("/api/sendCopy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          daysCopy,
        }),
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const cellClickWeek = (activityy, dayIndexx) => {
    const dates = selectedDates[dayIndexx];
    const newDates = `${dates.getFullYear()}-${
      dates.getMonth() + 1
    }-${dates.getDate()}`;

    if (days[activityy].includes(newDates)) {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activityy]: prevDays[activityy].filter((date) => date !== newDates),
        };
      });
    } else {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activityy]: [...prevDays[activityy], newDates],
        };
      });
    }
    setIsDayClicked(true);
  };

  const cellClickMonth = (activity, dayIndex) => {
    const dates = new Date(year, month, dayIndex + 1);
    const newDates = `${dates.getFullYear()}-${
      dates.getMonth() + 1
    }-${dates.getDate()}`;

    if (days[activity].includes(newDates)) {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activity]: prevDays[activity].filter((date) => date !== newDates),
        };
      });
    } else {
      setDays((prevDays) => {
        return {
          ...prevDays,
          [activity]: [...prevDays[activity], newDates],
        };
      });
    }
    setIsDayClicked(true);
  };

  useEffect(() => {
    if (isDayClicked) {
      saveCellClick();
      setIsDayClicked(false);
    }
  }, [isDayClicked]);

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

  const dayColorWeek = (activityy, dayIndexxx) => {
    const date = new Date(
      new Date(year, month, new Date().getDate() + (weekCount * 7 + 1))
    );
    date.setDate(date.getDate() + dayIndexxx);

    return days[activityy].includes(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    )
      ? colors[activityy]
      : "#81c8e0";
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
      <div className="background-week">
        <div className="nextAndBackButtons">
          <img
            className="back"
            onClick={back}
            src="https://cdn-icons-png.flaticon.com/128/860/860790.png"
          ></img>
          <div className="month-and-year-week">
            <h4>
              {format(selectedDates[0], "EEEE, M/d")} -{" "}
              {format(selectedDates[6], "EEEE, M/d")}
            </h4>
            <p className="currentyear-week">{year}</p>
          </div>
          <img
            className="next"
            onClick={next}
            src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
          ></img>
        </div>
        <div className="main-table">
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
              <tr className="week-header-one">
                <th className="days-habit-word">Habits</th>
                {selectedDates.map((datee, dayIndexx) => (
                  <th className="days" key={dayIndexx}>
                    {`${datee.getMonth() + 1}/${datee.getDate()}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days &&
                Object.keys(days).map((activityy, indexx) => (
                  <tr key={indexx} className="week-cell-row">
                    <td className="week-cell-habit">
                      <p
                        onClick={() => eraseHabit(activityy, indexx)}
                        className="x-button-week"
                      >
                        X
                      </p>
                      <div className="activity-week">{activityy}</div>
                    </td>
                    {selectedDates.map((datee, dayIndexxx) => (
                      <td
                        className="week-cell"
                        key={dayIndexxx}
                        onClick={() => cellClickWeek(activityy, dayIndexxx)}
                        style={{
                          backgroundColor: dayColorWeek(activityy, dayIndexxx),
                        }}
                      >
                        {dayColorWeek(activityy, dayIndexxx) ===
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
                  <tr key={i} className="week-cell-row">
                    <td className="cell-new-habit-week">
                      <p
                        className="add-habit-x-button-week"
                        onClick={() => removeInput(i)}
                      >
                        X
                      </p>
                      <div className="add-habit-x-div-week">
                        <input
                          className="input-box-week"
                          value={inputField}
                          onChange={(e) => handleInputChange(e, i)}
                          placeholder="Habit"
                        />
                        <div className="select-week">
                          <select
                            className="color-dropdown-week"
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
        </div>
        <button className="month-view" onClick={monthView}>
          Month View
        </button>
      </div>
    );
  };

  const previousMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
  };

  useEffect(() => {
    renderMonthView();
  }, [month, year]);

  const getDayOfWeek = (year, month, day) => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return week[new Date(year, month, day).getDay()];
  };

  const dayColorMonth = (activity, dayIndex) => {
    const dates = new Date(year, month, dayIndex + 1);

    return days[activity].includes(
      `${dates.getFullYear()}-${dates.getMonth() + 1}-${dates.getDate()}`
    )
      ? colors[activity]
      : "#81c8e0";
  };

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderMonthView = () => {
    return (
      <div>
        <div className="background-month">
          <div className="month-nextAndBackButtons">
            <img
              className="backMonth"
              onClick={previousMonth}
              src="https://cdn-icons-png.flaticon.com/128/860/860790.png"
            ></img>
            <div className="month-and-year">
              <h6 className="currentMonth">
                {format(set(new Date(), { month: month }), "MMMM")}
              </h6>
              <p className="currentYear">{year}</p>
            </div>
            <img
              className="nextMonth"
              onClick={nextMonth}
              src="https://cdn-icons-png.flaticon.com/128/758/758778.png"
            ></img>
          </div>
          <div className="table-parent-month">
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
            <table className="habit-table-month">
              <thead>
                <tr className="month-header-one">
                  {Array.from(
                    { length: daysInMonth(year, month) },
                    (_, dayIndex) => (
                      <th className="month-days" key={dayIndex}>
                        {dayIndex + 1}
                      </th>
                    )
                  )}
                </tr>
                <tr className="month-header-two">
                  <td className="month-days-habits-word">Habits</td>
                  {Array.from(
                    { length: daysInMonth(year, month) },
                    (_, dayIndex) => (
                      <th className="month-daysofweek" key={dayIndex}>
                        {getDayOfWeek(year, month, dayIndex + 1)}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Object.keys(days).map((activity, index) => (
                  <tr key={index} className="month-cell-row">
                    <td className="month-cell-habit">
                      <p
                        onClick={() => eraseHabit(activity, index)}
                        className="x-button-month"
                      >
                        X
                      </p>
                      <div className="activity-month">{activity}</div>
                    </td>
                    {Array.from(
                      { length: daysInMonth(year, month) },
                      (_, dayIndex) => (
                        <td
                          className="month-cell"
                          key={dayIndex}
                          onClick={() => cellClickMonth(activity, dayIndex)}
                          style={{
                            backgroundColor: dayColorMonth(activity, dayIndex),
                          }}
                        >
                          {dayColorMonth(activity, dayIndex) ===
                            colors[activity]}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <tbody>
                {inputFields.map((inputField, i) => {
                  return (
                    <tr key={i} className="add-habit-row-month">
                      <td className="cell-new-habit-month">
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
                          length: daysInMonth(year, month),
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
          <button className="week-view" onClick={weekView}>
            Week View
          </button>
        </div>
      </div>
    );
  };

  return <div>{view === "week" ? renderWeekView() : renderMonthView()}</div>;
}
