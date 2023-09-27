// import { useState } from "react";
// import Modal from "./components/modal";

// function Tabs() {
//   const [toggleState, setToggleState] = useState(1);

//   const toggleTab = (index) => {
//     console.log("Toggling to tab", index);
//     setToggleState(index);
//   };

//   console.log("Current toggleState:", toggleState);
//   return (
//     <div className="container">
//       <div className="bloc-tabs">
//         <button
//           className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(1)}
//         >
//           Tab 1
//         </button>
//         <button
//           className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(2)}
//         >
//           Tab 2
//         </button>
//         <button
//           className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(3)}
//         >
//           Tab 3
//         </button>
//       </div>

//       <div className="content-tabs">
//         <div className={toggleState === 1 ? "active-content" : "content"}>
//           <h1>Home Page</h1>
//           <hr />
//         </div>

//         <div className={toggleState === 2 ? "active-content" : "content"}>
//           <h2>Habit Chart</h2>
//           <hr />
//           <Modal />
//         </div>

//         <div className={toggleState === 3 ? "active-content" : "content"}>
//           <h3>Stats</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tabs;
