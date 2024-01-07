"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const AllUsers = () => {
  const [data, setData] = useState([]);

  // const createTest = async () => {
  //   const session = await getSession();

  //   const email = session.user.email;
  //   const dataa = "testhabit";
  //   try {
  //     const res = await fetch("/api/test", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         dataa,
  //       }),
  //     });
  //     await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // This line makes a network request to the /api/test endpoint using the fetch function. The result (res) is a Response object representing the entire HTTP response.
  //       // This line doesn't automatically parse the response body as JSON. It's just fetching the response object.
  //       const res = await fetch("/api/test");

  //       if (!res.ok) {
  //         throw new Error("Error fetching users");
  //       }
  //       // This line takes the Response object (res) obtained from the previous fetch request and uses the json method to parse the response body as JSON.
  //       // The object { users } is destructuring assignment, which means it extracts the users property from the parsed JSON data. If the JSON structure is { "users": [...] }, then users will contain the array inside the users property.
  //       const { users } = await res.json();
  //       setData(users);
  //       console.log(users);
  //     } catch (error) {
  //       console.log("Error fetching current user");
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      {/* <button onClick={createTest}>Create Test</button> */}
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
