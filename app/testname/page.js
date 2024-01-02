"use client";

import React, { useState, useEffect } from 'react';

const AllUsers = () => {

  const [data, setData] = useState([]);

  const createTest = async () => {
    const email = "testonetwo@test.com";
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/test");

        if (!res.ok) {
          throw new Error("Error fetching users");
        }

        const { users } = await res.json();
        setData(users);
        console.log(users)
      } catch (error) {
        console.log("Error fetching users");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={createTest}>Create Test</button>
    </div>
  );
};

export default AllUsers;

//old:
// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// const AllUsers = () => {
//   const [rows, setRows] = useState([]);

  // const { data: session } = useSession();

//   useEffect(() => {
    // async function getAllUsers() {
    //   try {
    //     const res = await fetch("/api/");

    //     if (!res.ok) {
    //       throw new Error("Error fetching users");
    //     }

    //     const { users } = await res.json();
    //     setRows(users);
    //   } catch (error) {
    //     console.log("Error fetching users");
    //   }
    // }
//     getAllUsers();
//   }, []);

//   return (
//     <div>
//       {!session ? <div>hi</div> : <div> {session.user?.email}</div>}
//       {rows.map((tr, i) => (
//         <div key={i}>
//           <p>{tr._id}</p>
//           <p>{tr?.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllUsers;
