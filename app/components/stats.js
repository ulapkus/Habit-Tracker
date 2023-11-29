import React, { useState } from "react";

export default function Stats() {
  const [nameOfUser, setNameOfUser] = useState("Ula");
  

  return (
    <div>
      <h5>Hello, {nameOfUser}</h5>
      <p className="days-tracked">You have been tracking your habits for -insert number- days</p>
    </div>
  );
}
