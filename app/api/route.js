import Connect from "../../utils/db";
import Users from "../../models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await Connect();
  const users = await Users.find();
  return NextResponse.json({ users }, { status: 200 });
}

export async function POST(request) {
  const { email } = await request.json();
  await Connect();
  await Users.create({ email });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}