import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// this is used in questions
// to update the main categories from the modal
export async function POST(request) {
  try {
    const { daysData, colorData, habitData } = await request.json();
    await Connect();
    const session = await getServerSession();
    const thisuser = session.user.email;
    const filter = { email: thisuser };

    const result = await Users.updateOne(filter, {
      $set: { days: daysData, colors: colorData},
      $addToSet: { habits: { $each: habitData } },
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
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

