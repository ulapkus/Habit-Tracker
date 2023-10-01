import { useState } from "react";
import Chart from "./components/chart";
import Home from "./components/home";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    console.log("Toggling to tab", index);
    setToggleState(index);
  };

  console.log("Current toggleState:", toggleState);
  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Home
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Chart
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Stats
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "active-content" : "content"}>
          {/* <h1>Habit Chart</h1> */}
          <hr />
         <Home /> 
        </div>

        <div className={toggleState === 2 ? "active-content" : "content"}>
          <hr />
          <Chart />
        </div>

        <div className={toggleState === 3 ? "active-content" : "content"}>
          <h3>Stats</h3>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
