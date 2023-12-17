import React from "react";
import Tabs from "../Tabs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  // await here is used to wait for the asynchronous getServerSession function to complete before continuing
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="main">
      <Tabs />
    </div>
  );
};

export default Dashboard;
