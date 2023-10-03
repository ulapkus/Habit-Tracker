import React, { useContext, useEffect } from "react";
import { Context } from "./chart";

export default function Child() {
  const [random, setRandom] = useContext(Context);

  useEffect(() => {
    function onstartup() {
      document.getElementById("myModal").style.display = "block";
    }
    onstartup();
  }, []);

  const createNewElement = () => {
    const newInputBox = document.createElement("input");
    newInputBox.setAttribute("type", "text");
    newInputBox.name = "newbox";
    newInputBox.className = "answer";
    document.getElementById("newElementId").appendChild(newInputBox);
  };

  function getInputValues(event) {
    const inputFields = document.querySelectorAll("input[type='text']");
    const inputValues = Array.from(inputFields).map((input) => input.value);
    setRandom(inputValues);
    document.getElementById("myModal").style.display = "none";
  }

  return (
    <section id="myModal">
      <div className="modal-content">
        <section className="question-main">
          <section className="question-plus-answer">
            <h3 className="what-habits-q">
              What are some habits you would like to work on?
            </h3>
            <div className="input-boxes">
              <input
                className="answer"
                placeholder="i.e. drink more water"
                type="text"
                name="firstq"
              />
              <input type="text" className="answer" />
              <div id="newElementId"></div>
            </div>
          </section>
          <section className="buttons-q">
            <button className="add-more" onClick={createNewElement}>
              + Add more
            </button>
            <button onClick={getInputValues} className="submit-q">
              Submit
            </button>
          </section>
        </section>
      </div>
    </section>
  );
}
