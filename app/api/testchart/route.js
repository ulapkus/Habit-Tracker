import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const { dataa, datacolor, dataObject } = await request.json();
    // const { datacolor } = await request.json();

    await Connect();

    const session = await getServerSession();
    const thisuser = session.user.email;
    const filter = { email: thisuser };
    // const update = { $push: { habits: dataa } };

    // const update = { $set: { habits: dataa } };
    // const result = await Users.updateOne(filter, update);

    const result = await Users.updateOne(filter, {
        $addToSet: { habits: {$each: dataa}, colors: {$each: datacolor} },
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



