import React, { useContext, useState } from "react";
import { Context } from "./chart";

export default function Child() {
  const [random, setRandom] = useContext(Context);

  const createNewElement = () => {
    const newInputBox = document.createElement("input");
    newInputBox.setAttribute("type", "text");
    newInputBox.name = "newbox";
    document.getElementById("newElementId").appendChild(newInputBox);
  };

  function getInputValues() {
    const inputFields = document.querySelectorAll("input[type='text']");
    const inputValues = Array.from(inputFields).map((input) => input.value);
    setRandom(inputValues);
    console.log(random);
  }

  return (
    <div>
      <div className="habits-question-main">
        <div className="question-plus-answer">
          <h2 className="what-habits-q">
            What are some habits you would like to work on?
          </h2>
          <div className="input-boxes">
            <input
              className="answer"
              placeholder="i.e. drink more water"
              type="text"
              name="firstq"
            />
            <input type="text" />
            <div id="newElementId"></div>
          </div>
        </div>
        <div className="buttons-q">
          <button className="add-more" onClick={createNewElement}>
            + Add more
          </button>
          <button onClick={getInputValues} className="submit-q">Submit</button>
        </div>
      </div>
    </div>
  );
}
