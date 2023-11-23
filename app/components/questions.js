import React, { useContext, useEffect, useState } from "react";
import { Context } from "./chart";
import { OtherContext } from "./chart";
import { ColorContext } from "./chart";
import { ModalVisibilityContext } from "./chart";

export default function Child() {
  const [habits, setHabits] = useContext(Context);
  const [days, setDays] = useContext(OtherContext);
  const [colors, setColors] = useContext(ColorContext);
  const [modalVisibility, setModalVisibility] = useContext(
    ModalVisibilityContext
  );
  const [random, setRandom] = useState([]);
  const [firstInputFields, setFirstInputFields] = useState([[]]);
  const [firstColors, setFirstColors] = useState([[]]);
  const [colorFields, setColorFields] = useState([[]]);

  const createNewElement = () => {
    const addInput = [...firstInputFields, []];
    setFirstInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);
  };

  function getInputValues() {
    const inputFields = document.querySelectorAll("input[type='text']");
    const inputValues = Array.from(inputFields).map((input) => input.value);

    inputValues.map((inputValue, index) => {
      const newArray = [true, false, false, false, false, false, true];
      setDays((prevDays) => ({
        ...prevDays,
        [inputValues[index]]: newArray,
      }));

      inputValues.map((inputValue, index) => {
        setColors((prevColor) => ({
          ...prevColor,
          [inputValues[index]]: colorFields[index],
        }));
      });

      setHabits([...habits, inputValue]);
    });

    setModalVisibility(false);
  }

  const handleInputChange = (onChangeValue, i) => {
    const inputValue = [...firstInputFields];
    inputValue[i] = onChangeValue.target.value;
    setFirstInputFields(inputValue);
  };

  const handleColorChange = (value, i) => {
    const colorValue = [...colorFields];
    colorValue[i] = value.target.value;
    setColorFields(colorValue);
  };

  const removeInput = (i) => {
    const removeInput = [...firstInputFields];
    removeInput.splice(i, 1);
    setFirstInputFields(removeInput);

    const removeColor = [...colorFields];
    removeColor.splice(i, 1);
    setColorFields(removeColor);
  };

  return (
    <div>
      {modalVisibility && (
        <div id="myModal" style={{ display: "block" }}>
          <div className="modal-content">
            <section className="question-main">
              <section className="question-plus-answer">
                <h3 className="what-habits-q">
                  What are some habits you would like to work on?
                </h3>
                <div className="input-boxes">
                  <div className="modal-habit-input">
                    {firstInputFields.map((firstInputField, i) => {
                      return (
                        <div key={i}>
                          <input
                            value={firstInputField}
                            onChange={(e) => handleInputChange(e, i)}
                            placeholder="Habit"
                            type="text"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="modal-color-input">
                    {colorFields.map((colorField, index) => {
                      return (
                        <div key={index} className="modal-color-plus-button">
                          <input
                            value={colorField}
                            onChange={(e) => handleColorChange(e, index)}
                            placeholder="Color"
                          />
                          <button onClick={() => removeInput(i)}>X</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              <section className="buttons-q">
                <button className="add-more-q-page" onClick={createNewElement}>
                  + Add more
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
