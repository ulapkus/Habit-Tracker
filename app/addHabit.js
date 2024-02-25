"use client";

import React, { useEffect, useState } from "react";
import { ModalContext } from "./chart/page";
import Image from "next/image";
import arrow from "../public/arrow.png";
import alert from "../public/alert-icon.png";
import styles from "./styles/page.module.css";

export default function Childtwo() {
  const { value2 } = React.useContext(ModalContext);
  const { value3 } = React.useContext(ModalContext);
  const { value4 } = React.useContext(ModalContext);
  const { value5 } = React.useContext(ModalContext);

  const [days, setDays] = value3;
  const [colors, setColors] = value4;
  const [habits, setHabits] = value5;
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
    const habitFilled = habitInputField.every((array) => array.length > 0);
    const colorFilled = colorInputField.every((array) => array.length > 0);

    const duplicateHabits = habitInputField.filter((habit) =>
      habits.includes(habit)
    );

    if (duplicateHabits.length > 0) {
      setErrorMessage("HABIT ALREADY EXISTS. PLEASE CHOOSE A DIFFERENT NAME.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (habitFilled && colorFilled) {
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
    } else {
      setErrorMessage(
        "NOT ALL BOXES ARE FILLED IN. PLEASE INCLUDE BOTH A HABIT AND A COLOR."
      );
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
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
        <div
          id="myModal"
          style={{
            display: "block",
            backgroundImage: `url('/background-modal.png')`,
          }}
        >
          <p className={`error ${errorMessage ? "error-visible" : ""}`}>
            {errorMessage && (
              <Image src={alert} alt="Error" className="error-img"></Image>
            )}
            {errorMessage}
          </p>
          <div className={styles.modal_content_two}>
            <section className={styles.question_main_two}>
              <div className={styles.remove_container}>
                <p className={styles.remove} onClick={removeModal}>
                  X
                </p>
              </div>
              <div className={styles.modal_text_two}>
                <h6>Add a new habit</h6>
                {habitInputField.map((inputField, i) => {
                  return (
                    <div key={i} className={styles.input_boxes}>
                      <div className={styles.modal_habit}>
                        <input
                          value={inputField}
                          onChange={(e) => handleInputChange(e, i)}
                          className={styles.modal_question}
                          placeholder="ENTER HABIT HERE..."
                        />
                      </div>
                      {/* <div className="modal-color">Hover me</div>
                      <div class="dropdown-container">
                        <div class="trigger">Hover me</div>
                        <div class="dropdown-content">
                          <p>This is the dropdown content</p>
                          <p>So is this</p>
                        </div>
                      </div> */}
                      <div className={styles.modal_color_plus_button}>
                        <select
                          className={styles.modal_color}
                          onChange={(event) => handleColorChange(event, i)}
                        >
                          <option value=""></option>
                          <option value="#e74645">RED</option>
                          <option value="#FF8466">ORANGE</option>
                          <option value="#FFBD49">YELLOW</option>
                          <option value="#93C574">GREEN</option>
                          <option value="#3b4cc3">BLUE</option>
                          <option value="#AA8AFA">PURPLE</option>
                          <option value="#FF81C3">PINK</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <button className={styles.submit_q} onClick={submit}>
              <p className={styles.start_hoppin}>Confirm</p>
              <Image src={arrow} alt="arrow" className={styles.arrow_q} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
