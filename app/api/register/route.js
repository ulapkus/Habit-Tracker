import User from "/models/User";
import connect from "/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, password } = await request.json();

  // Assuming you want a default empty value for testname
  const testname = '';

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
    testname,  // Include the testname field here with default value
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err) {
    console.error('Error saving user:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
