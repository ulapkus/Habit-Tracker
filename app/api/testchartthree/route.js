import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  await Connect();
  const session = await getServerSession();
  const query = { email: session.user.email };
  // const query = {email: "hii@aim.com"};

  // const options = { projection: { days: true } };
  const options = { projection: { name: true } };

  // const data = await Users.find({email: session.user.email}, {days: true});
  const data = await Users.find(query, { _id: 0, habits: 1 });

  return NextResponse.json({ data }, { status: 200 });
}
