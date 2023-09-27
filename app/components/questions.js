"use client";

import React, { useState } from "react";

function Question() {
  const [habits, setHabits] = useState([]);
  const [answer, setAnswer] = useState("");

  function getInputValues() {
    const inputFields = document.querySelectorAll("input[type='text']");
    // for (let i = 0; i < inputFields.length; i++) {
      setHabits([...habits, inputFields.value]);
    // }
    console.log(habits);
  }

  const createNewElement = () => {
    const newInputBox = document.createElement("div");
    newInputBox.innerHTML =
      "<input type='text' className={styles.newinputbox} name='newbox' >";
    document.getElementById("newElementId").appendChild(newInputBox);
  };


  function handleAnswer(e) {
    setAnswer(e.target.value);
  }


  return (
    <section>
      <div>
        <p>What are some habits you would like to work on?</p>
        <input
          className="answer"
          placeholder="i.e. drink more water"
          type="text"
          name="firstq"
          onChange={handleAnswer} value={answer} 
        />
        <div id="newElementId"></div>
        <button className="but" onClick={createNewElement}>
          + Add more
        </button>
        <input type="submit" onClick={getInputValues} />
      </div>
    </section>
  );
}

export default Question;
