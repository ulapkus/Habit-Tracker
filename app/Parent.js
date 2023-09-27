import React, { useState } from "react";
import Child from "./components/child";

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
        <Child />
      </Context.Provider>
    </div>
  );
}
