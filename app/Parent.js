import React, { useState } from "react";
import Modal from "./components/modal";

export const Context = React.createContext();


export default function Parent() {
    const [random, setRandom] = useState([]);

  return (
    <div>
        <p>This is a parent</p>
        {/* <p>Random:{random}</p> */}
        <ul>
        {random.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

   
      <Context.Provider value={[random, setRandom]}>
        <Modal />
      </Context.Provider>
    </div>
  );
}
