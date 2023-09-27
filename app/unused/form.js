// 'use client';

// import { useState, useContext } from "react";
// import Link from "next/link";

// export default function Form(props) {
//     const [name, setName] = useState("");
//     const [frequency, setFrequency] = useState("");
// //   const name = props.name;
// //   const frequency = props.frequency;
// //   const handleName = props.handleName;
// //   const handleFrequency = props.handleFrequency;

//   function handleName(e) {
//     setName(e.target.value);
//   }

//   function handleFrequency(e) {
//     setFrequency(e.target.value);
//   }

//   function handleClick() {
//     console.log("clicked!");
 
//   }

//   return (
//     <div>
//       <p>Form</p>
//       <p>Name: {name}</p>
//       <p>Frequency: {frequency}</p>
//       <input onChange={handleName} type="text" value={name} />
//       <input onChange={handleFrequency} type="text" value={frequency} />
//       <button onClick={handleClick}>Submit</button>
//       <Link href="/form/chart">
//           Chart
//         </Link>
//     </div>
//   );
// }
