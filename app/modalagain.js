"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "./chart/page";
import { ModalContext } from "./chart/page";
import { DaysContext } from "./chart/page";
import { ColorContext } from "./chart/page";
import Image from "next/image";
import arrow from "../public/arrow.png";

export default function Childtwo() {
  const { value2 } = React.useContext(ModalContext);

  const [habits, setHabits] = useContext(Context);
  const [days, setDays] = useContext(DaysContext);
  const [colors, setColors] = useContext(ColorContext);
  const [modalVisibilityNew, setModalVisibilityNew] = value2;
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [habitInputField, setHabitInputField] = useState([[]]);
  const [colorInputField, setColorInputField] = useState([[]]);

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

  const handleInputChange = (onChangeValue, i) => {
    const inputValue = [...habitInputField];
    inputValue[i] = onChangeValue.target.value;
    setHabitInputField(inputValue);
  };

  const handleColorChange = (e, index) => {
    const colorValue = [...colorInputField];
    colorValue[index] = e.target.value;
    setColorInputField(colorValue);
  };

  const removeModal = () => {
    setHabitInputField([[]]);
    setColorInputField([[]]);
    setModalVisibilityNew(false);
  };

  const submit = () => {
    const duplicateHabits = habitInputField.filter((habit) =>
      habits.includes(habit)
    );
    if (duplicateHabits.length > 0) {
      setErrorMessage("Habit already exists. Please choose a different name.");
      return;
    }

    setHabits([...habits, ...habitInputField]);

    habitInputField.map((inputField, index) => {
      setDays((prevDays) => ({
        ...prevDays,
        [habitInputField[index]]: [],
      }));
    });

    setModalVisibilityNew(false);
    habitInputField.map((inputField, index) => {
      setColors((prevColor) => ({
        ...prevColor,
        [habitInputField[index]]: colorInputField[index],
      }));
    });

    setHabitInputField([]);
    setColorInputField([]);
    setIsSubmitClicked(true);
    setErrorMessage("");
    saveAddOrRemoveHabit();
  };

  useEffect(() => {
    if (isSubmitClicked) {
      saveAddOrRemoveHabit();
      setIsSubmitClicked(false);
    }
  }, [isSubmitClicked]);

  return (
    <div>
      {modalVisibilityNew && (
        <div id="myModal" style={{ display: "block" }}>
          <p className={`error ${errorMessage ? "error-visible" : ""}`}>
            {errorMessage}
          </p>{" "}
          <div className="modal-content">
            <section className="question-main">
              <div className="x-container-modalagain">
                <p className="x-modalagain" onClick={removeModal}>
                  X
                </p>
              </div>
              <div className="question-main-second-modalagain">
                <h5>Add a new habit</h5>
                {habitInputField.map((inputField, i) => {
                  return (
                    <div key={i} className="input-boxes">
                      <div className="modal-habit">
                        <input
                          value={inputField}
                          onChange={(e) => handleInputChange(e, i)}
                          className="modal-question"
                          placeholder="ENTER HABIT HERE..."
                        />
                      </div>
                      <div className="modal-color-plus-button">
                        <select
                          className="modal-color"
                          onChange={(event) => handleColorChange(event, i)}
                        >
                          <option value=""></option>
                          <option value="#e74645">Red</option>
                          <option value="#FF8466">Orange</option>
                          <option value="#FFBD49">Yellow</option>
                          <option value="#93C574">Green</option>
                          <option value="#3b4cc3">Blue</option>
                          <option value="#AA8AFA">Purple</option>
                          <option value="#FF81C3">Pink</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <button className="submit-q" onClick={submit}>
              <p className="start-hoppin">Confirm</p>
              <Image src={arrow} alt="arrow" className="arrow-q" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
