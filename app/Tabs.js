"use client"
import { useState } from "react";
import Chart from "../components/chart";
import Quote from "../components/quote";
import Stats from "../components/stats";
import About from "../components/about";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    console.log("Toggling to tab", index);
    setToggleState(index);
  };

  return (
    <div>
      <div className="container">
        <div className="bloc-tabs">
          <div className="logo-div">
            <button
              className={
                toggleState === 1 ? "tabs-logo active-tabs" : "tabs-logo"
              }
              onClick={() => toggleTab(1)}
            >
              <img
                className="logo"
                src="https://i.ibb.co/p3LhT3W/H-2.png"
              ></img>
            </button>
          </div>
          <div className="chart-and-stats">
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              About
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Chart
            </button>
            <button
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              Stats
            </button>
          </div>
        </div>
        <div className="content-tabs">
          <div className={toggleState === 1 ? "active-content" : "content"}>
            <Quote />
          </div>
          <div className={toggleState === 2 ? "active-content" : "content"}>
            <About />
          </div>
          <div className={toggleState === 3 ? "active-content" : "content"}>
            <Chart />
          </div>
          <div className={toggleState === 4 ? "active-content" : "content"}>
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
