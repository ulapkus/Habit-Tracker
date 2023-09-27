"use client";

// import Link from "next/link";
// import styles from "./page.module.css";
// import { useState } from "react";
// import Form from "./pages/page";
// import Habits from "./form/chart/page";
import Tabs from "./Tabs";
import Parent from "./Parent";
export default function Home() {
  // const [name, setName] = useState("");
  // const [frequency, setFrequency] = useState("");

  // function handleName(e) {
  //   setName(e.target.value);
  // }

  // function handleFrequency(e) {
  //   setFrequency(e.target.value);
  // }

  return (
    <div>
      {/* <p>Hello world</p> */}
      {/* <Tabs /> */}
      <Parent />
      {/* <Form
        name={name}
        frequency={frequency}
        handleName={handleName}
        handleFrequency={handleFrequency}
      />
      <Habits name={name} frequency={frequency} /> */}

      
      {/* <Link href="/form" className={styles.navlink}>
          Form
        </Link>
        <Link href="/form/chart" className={styles.navlink}>
          Chart
        </Link> */}
    </div>
  );
}

// "use client";

// import Tabs from "./Tabs";

// export default function Home() {


//   return (
//     <div>
//       <Tabs />

//     </div>
//   );
// }