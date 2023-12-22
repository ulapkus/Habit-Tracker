"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";


const AllUsers = () => {
  const [rows, setRows] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch("/api/");

        if (!res.ok) {
          throw new Error("Error fetching users");
        }

        const { users } = await res.json();
        setRows(users);
      } catch (error) {
        console.log("Error fetching users");
      }
    }
    getAllUsers();
  }, []);

  return (
    <div>
      {!session ? (<div>hi</div>) : (<div> {session.user?.email}</div>)}
      {rows.map((tr, i) => (
        <div key={i}>
          <p>{tr._id}</p>
          <p>{tr?.email}</p>
          {/* <p>{tr?.title}</p>
          <p>{tr?.description.substring(0, 40).concat("...")}</p> */}
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
