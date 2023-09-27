import React, { useContext, useState } from "react";
import { Context } from "../Parent";

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
      <p>This is a child</p>
      <input
        className="answer"
        placeholder="i.e. drink more water"
        type="text"
        name="firstq"
      />
      <input
        type="text"
      />
      <div id="newElementId" ></div>
      <button className="but" onClick={createNewElement}>
        + Add more
      </button>
      <button onClick={getInputValues}>Submit</button>

      {/* <p>Random:{random}</p> */}
    </div>
  );
}
