import React, { useContext, useEffect} from "react";
import { Context } from "./chart";

export default function Child() {
  const [random, setRandom] = useContext(Context);

  useEffect(() => {
    function onstartup() {
      document.getElementById("myModal").style.display = "block";
    }
    onstartup();
  }, []);
 
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

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
    <div id="myModal" className="modal">
    <div className="modal-content">

    <section className="habits-question-main">
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
          <input type="text" />
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
    </div>
  );
}
