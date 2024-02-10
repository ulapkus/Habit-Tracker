import React, { useContext, useEffect, useState } from "react";
import { Context } from "./chart/page";
import { DaysContext } from "./chart/page";
import { ColorContext } from "./chart/page";
import { ModalContext } from "./chart/page";
import Image from "next/image";
import arrow from "../public/arrow.png";

export default function Child() {
  const { value } = React.useContext(ModalContext);
  const [habits, setHabits] = useContext(Context);
  const [days, setDays] = useContext(DaysContext);
  const [colors, setColors] = useContext(ColorContext);
  const [modalVisibility, setModalVisibility] = value;
  const [habitInputField, setHabitInputField] = useState([[], [], []]);
  const [colorInputField, setColorInputField] = useState([[], [], []]);
  const [showModal, setShowModal] = useState(false);
  const [stateUpdated, setStateUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getData() {
    try {
      const res = await fetch("/api/updateModal");
      if (!res.ok) {
        throw new Error("Error fetching users", error.message);
      }
      const modalResponse = await res.json();
      const updatedData = Object.values(modalResponse.data[0])[0];
      setShowModal(updatedData);
    } catch (error) {
      console.log("Error fetching current user", error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // const saveAddHabit = async () => {
  //   const daysData = days;
  //   const colorData = colors;
  //   const habitData = habitInputField;
  //   try {
  //     const res = await fetch("/api/updateState", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         habitData,
  //         colorData,
  //         daysData,
  //       }),
  //     });
  //     await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveAddHabit = async () => {
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

  const hasSeenModal = async () => {
    const makeFalse = false;
    try {
      const res = await fetch("/api/updateModal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          makeFalse,
        }),
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  function getInputValues() {
    const inputFields = document.querySelectorAll("input[type='text']");
    const inputValues = Array.from(inputFields).map((input) => input.value);

    const habitFilled = habitInputField.every((array) => array.length > 0);
    const colorFilled = colorInputField.every((array) => array.length > 0);

    if (habitFilled && colorFilled) {
      inputValues.map((inputValue, index) => {
        setDays((prevDays) => ({
          ...prevDays,
          [inputValues[index]]: [],
        }));

        inputValues.map((inputValue, index) => {
          setColors((prevColor) => ({
            ...prevColor,
            [inputValues[index]]: colorInputField[index],
          }));
        });
        setHabits((prevHabits) => [...habitInputField]);
      });
      setShowModal(false);
      hasSeenModal();
      setModalVisibility(false);
      setStateUpdated(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "NOT ALL BOXES ARE FILLED IN. PLEASE INCLUDE THREE HABITS AND THREE COLORS."
      );
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  }

  useEffect(() => {
    if (stateUpdated) {
      saveAddHabit();
      setStateUpdated(false);
    }
  }, [stateUpdated]);

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

  return (
    <div>
      {showModal && modalVisibility && (
        <div id="myModal" style={{ display: "block" }}>
          <p className={`error ${errorMessage ? "error-visible" : ""}`}>
            {errorMessage}
          </p>
          <div className="modal-content">
            {/* <div className="question-main-second-modalagain"> */}

            <section className="question-main">
              <div className="question-main-second">
                <h5>{"Let's start you off with three habits to work on"}</h5>
                <div className="input-boxes">
                  <div className="modal-habit-input">
                    {habitInputField.map((habitInput, i) => {
                      return (
                        <div key={i} className="modal-habit">
                          <input
                            value={habitInput}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="ENTER HABIT HERE..."
                            type="text"
                            className="modal-question"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="modal-color-input">
                    {colorInputField.map((colorField, index) => {
                      return (
                        <div key={index} className="modal-color-plus-button">
                          <select
                            className="modal-color"
                            onChange={(e) => handleColorChange(e, index)}
                          >
                            <option value=""></option>
                            <option value="#e74645"></option>
                            <option value="#FF8466">Orange</option>
                            <option value="#FFBD49">Yellow</option>
                            <option value="#93C574">Green</option>
                            <option value="#3b4cc3">Blue</option>
                            <option value="#AA8AFA">Purple</option>
                            <option value="#FF81C3">Pink</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            <button onClick={getInputValues} className="submit-q">
              <p className="start-hoppin">Start hoppin&apos;</p>
              <Image src={arrow} alt="arrow" className="arrow-q" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
