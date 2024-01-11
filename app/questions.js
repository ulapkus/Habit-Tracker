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
  const [firstInputFields, setFirstInputFields] = useState([[]]);
  const [colorFields, setColorFields] = useState([[]]);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function getData() {
    try {
      const res = await fetch("/api/updateModal");

      if (!res.ok) {
        throw new Error("Error fetching usersss", error.message);
      }
      const updatedDays = await res.json();
      const blah = updatedDays.data[0];
      const blahh = Object.values(blah)[0];
      // console.log("displayModal GET data is:" + JSON.stringify(blahh));
      setShowModal(blahh);
    } catch (error) {
      console.log("Error fetching current userrrr", error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const createNewElement = () => {
    const addInput = [...firstInputFields, []];
    setFirstInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);
  };

  const saveAddHabit = async () => {
    const dataObject = {};
    firstInputFields.forEach((category) => {
      dataObject[category] = [];
    });

    const dataObjectColor = {};
    firstInputFields.forEach((category) => {
      dataObjectColor[category] = [];
    });

    const dataa = firstInputFields;
    const datacolor = dataObjectColor;

    try {
      const res = await fetch("/api/fetchDays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataa,
          datacolor,
          dataObject,
        }),
      });
      const bleh = await res.json();
      console.log("bleh" + JSON.stringify(bleh));
    } catch (error) {
      console.log(error);
    }
  };

  const hasSeenModal = async () => {
    const yeah = false;

    try {
      const res = await fetch("/api/updateModal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yeah
        }),
      });
      const bleh = await res.json();
      // console.log("yeah" + JSON.stringify(bleh));
    } catch (error) {
      console.log(error);
    }
  };

  function getInputValues() {
    const inputFields = document.querySelectorAll("input[type='text']");
    const inputValues = Array.from(inputFields).map((input) => input.value);

    inputValues.map((inputValue, index) => {
      const newArray = [];
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

      //do i even need a list of habits? if not, i can get rid of the below
      setHabits((prevHabits) => [...firstInputFields]);
      console.log("firstinputfields" + firstInputFields);

    });
    setSubmitted(true);
    setShowModal(false);
    hasSeenModal();
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

  const leave = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    // console.log("showmodal is:" + JSON.stringify(showModal));
  }, [getData]);

  useEffect(() => {
    if (showModal) {
      saveAddHabit();
    }
  }, [submitted]);

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
                    {firstInputFields.map((firstInputField, i) => {
                      return (
                        <div key={i}>
                          <input
                            value={firstInputField}
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
                    {colorFields.map((colorField, index) => {
                      return (
                        <div key={index} className="modal-color-plus-button">
                          <input
                            value={colorField}
                            onChange={(e) => handleColorChange(e, index)}
                            placeholder="Color"
                            className="modal-question"
                          />
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
                <button onClick={leave}>Leave</button>
              </section>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
