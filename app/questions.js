import React, { useContext, useEffect, useState } from "react";
import { Context } from "./chart/page";
import { DaysContext } from "./chart/page";
import { ColorContext } from "./chart/page";
import { ModalContext } from "./chart/page";

export default function Child() {
  const [habits, setHabits] = useContext(Context);
  const [days, setDays] = useContext(DaysContext);
  const [colors, setColors] = useContext(ColorContext);
  const [modalVisibility, setModalVisibility] = useContext(ModalContext);
  const [habitInputField, setHabitInputField] = useState([[]]);
  const [colorInputField, setColorInputField] = useState([[]]);
  const [showModal, setShowModal] = useState(false);
  const [stateUpdated, setStateUpdated] = useState(false);

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

  const createNewElement = () => {
    const addInput = [...habitInputField, []];
    setHabitInputField(addInput);

    const addColor = [...colorInputField, []];
    setColorInputField(addColor);
  };

  const saveAddHabit = async () => {
    const daysData = days;
    const colorData = colors;
    const habitData = habitInputField;
    try {
      const res = await fetch("/api/updateState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habitData,
          colorData,
          daysData,
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

  const removeInput = (i) => {
    const removeInput = [...habitInputField];
    removeInput.splice(i, 1);
    setHabitInputField(removeInput);

    const removeColor = [...colorInputField];
    removeColor.splice(i, 1);
    setColorInputField(removeColor);
  };

  return (
    <div>
      {showModal && modalVisibility && (
        <div id="myModal" style={{ display: "block" }}>
          <div className="modal-content">
            <section className="question-main">
              <section className="question-plus-answer">
                <h3 className="what-habits-q">
                  {"What are some habits you'd like to work on?"}
                </h3>
                <div className="input-boxes">
                  <div className="modal-habit-input">
                    {habitInputField.map((habitInput, i) => {
                      return (
                        <div key={i}>
                          <input
                            value={habitInput}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="Habit"
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
                            className="modal-question"
                            onChange={(e) => handleColorChange(e, index)}
                          >
                            <option value="">Choose color:</option>
                            <option value="#e74645">Red</option>
                            <option value="#FF8466">Orange</option>
                            <option value="#FFBD49">Yellow</option>
                            <option value="#93C574">Green</option>
                            <option value="#3b4cc3">Blue</option>
                            <option value="#AA8AFA">Purple</option>
                            <option value="#FF81C3">Pink</option>
                          </select>
                          <button
                            className="question-x"
                            onClick={() => removeInput(i)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              <section className="buttons-q">
                <button className="add-more-q-page" onClick={createNewElement}>
                  +
                </button>
                <button onClick={getInputValues} className="submit-q">
                  Submit
                </button>
              </section>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
