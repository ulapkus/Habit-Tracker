import React, { useContext, useEffect, useState } from "react";
import { Context } from "./chart/page";
import { DaysContext } from "./chart/page";
import { ColorContext } from "./chart/page";
import { ModalContext } from "./chart/page";
import { getSession } from "next-auth/react";

export default function Child() {
  const [habits, setHabits] = useContext(Context);
  const [days, setDays] = useContext(DaysContext);
  const [colors, setColors] = useContext(ColorContext);
  const [modalVisibility, setModalVisibility] = useContext(ModalContext);
  const [firstInputFields, setFirstInputFields] = useState([[]]);
  const [colorFields, setColorFields] = useState([[]]);

  const createNewElement = () => {
    const addInput = [...firstInputFields, []];
    setFirstInputFields(addInput);

    const addColor = [...colorFields, []];
    setColorFields(addColor);
  };

  const saveAddHabit = async () => {
    const session = await getSession();

    const dataObject = {};
    firstInputFields.forEach((category) => {
      dataObject[category] = [];
    });

    const email = session.user.email;
    const dataa = firstInputFields;
    const datacolor = colorFields;

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          dataa,
          datacolor,
          dataObject,

        }),
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveAddHabit();
  }, [habits]);

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

      setHabits([...habits, inputValue]);
    });
    console.log(colorFields);
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
  }

  return (
    <div>
      {modalVisibility && (
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

// pre-async function
// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "./chart/page";
// import { DaysContext } from "./chart/page";
// import { ColorContext } from "./chart/page";
// import { ModalContext } from "./chart/page";

// export default function Child() {
//   const [habits, setHabits] = useContext(Context);
//   const [days, setDays] = useContext(DaysContext);
//   const [colors, setColors] = useContext(ColorContext);
//   const [modalVisibility, setModalVisibility] = useContext(ModalContext);
//   const [firstInputFields, setFirstInputFields] = useState([[]]);
//   const [colorFields, setColorFields] = useState([[]]);

//   const createNewElement = () => {
//     const addInput = [...firstInputFields, []];
//     setFirstInputFields(addInput);

//     const addColor = [...colorFields, []];
//     setColorFields(addColor);
//   };

//   function getInputValues() {
//     const inputFields = document.querySelectorAll("input[type='text']");
//     const inputValues = Array.from(inputFields).map((input) => input.value);

//     inputValues.map((inputValue, index) => {
//       const newArray = [];
//       setDays((prevDays) => ({
//         ...prevDays,
//         [inputValues[index]]: newArray,
//       }));

//       inputValues.map((inputValue, index) => {
//         setColors((prevColor) => ({
//           ...prevColor,
//           [inputValues[index]]: colorFields[index],
//         }));
//       });

//       setHabits([...habits, inputValue]);
//     });

//     setModalVisibility(false);
//   }

//   const handleInputChange = (onChangeValue, i) => {
//     const inputValue = [...firstInputFields];
//     inputValue[i] = onChangeValue.target.value;
//     setFirstInputFields(inputValue);
//   };

//   const handleColorChange = (value, i) => {
//     const colorValue = [...colorFields];
//     colorValue[i] = value.target.value;
//     setColorFields(colorValue);
//   };

//   const removeInput = (i) => {
//     const removeInput = [...firstInputFields];
//     removeInput.splice(i, 1);
//     setFirstInputFields(removeInput);

//     const removeColor = [...colorFields];
//     removeColor.splice(i, 1);
//     setColorFields(removeColor);
//   };

//   return (
//     <div>
//       {modalVisibility && (
//         <div id="myModal" style={{ display: "block" }}>
//           <div className="modal-content">
//             <section className="question-main">
//               <section className="question-plus-answer">
//                 <h3 className="what-habits-q">
//                   What are some habits you'd like to work on?
//                 </h3>
//                 <div className="input-boxes">
//                   <div className="modal-habit-input">
//                     {firstInputFields.map((firstInputField, i) => {
//                       return (
//                         <div key={i}>
//                           <input
//                             value={firstInputField}
//                             onChange={(e) => handleInputChange(e, i)}
//                             placeholder="Habit"
//                             type="text"
//                             className="modal-question"
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="modal-color-input">
//                     {colorFields.map((colorField, index) => {
//                       return (
//                         <div key={index} className="modal-color-plus-button">
//                           <input
//                             value={colorField}
//                             onChange={(e) => handleColorChange(e, index)}
//                             placeholder="Color"
//                             className="modal-question"
//                           />
//                           <button className="question-x" onClick={() => removeInput(i)}>X</button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </section>
//               <section className="buttons-q">
//                 <button className="add-more-q-page" onClick={createNewElement}>
//                   +
//                 </button>
//                 <button onClick={getInputValues} className="submit-q">
//                   Submit
//                 </button>
//               </section>
//             </section>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
