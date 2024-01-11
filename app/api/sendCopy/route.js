import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

//this is used in chart
//to update days on the server after day is clicked
//this is updated every time a day is clicked
export async function POST(request) {
  try {
    const { copyofdays } = await request.json();
    await Connect();
    const session = await getServerSession();
    const thisuser = session.user.email;
    const filter = { email: thisuser };

    const result = await Users.updateOne(filter, {
      $set: { days: copyofdays },
    });

    if (result.modifiedCount === 1) {
      return NextResponse.json(
        { message: "User updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
