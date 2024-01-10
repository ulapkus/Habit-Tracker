import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
    try {
      const { yeah } = await request.json();
      await Connect();
      const session = await getServerSession();
      const thisuser = session.user.email;
      const filter = { email: thisuser };
  
      const result = await Users.updateOne(filter, {
        $set: { displayModal: false}
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
        { message: "Error updating user", error},
        { status: 500 }
      );
    }
  }

  export async function GET() {
    await Connect();
    const session = await getServerSession();
    const query = { email: session.user.email };

    const data = await Users.find(query, { _id: 0, displayModal: 1 });
  
    return NextResponse.json({ data }, { status: 200 });
  }
  