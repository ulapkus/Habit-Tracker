import Users from "../../../models/User";
import Connect from "../../../utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, habits, days, colors } = await request.json();

  // first it waits to connect to your database (on mongodb) via mongoose (on /utils/db)
  await Connect();

  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
    habits,
    days,
    colors,
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err) {
    console.error("Error saving user:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// import User from "/models/User";
// import connect from "/utils/db";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   const { email, password } = await request.json();

//   // Assuming you want a default empty value for testname
//   const testname = '';

//   // first it waits to connect to your database (on mongodb) via mongoose (on /utils/db)
//   await connect();

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return new NextResponse("Email is already in use", { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 5);
//   const newUser = new User({
//     email,
//     password: hashedPassword,
//     testname,  // Include the testname field here with default value
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("User is registered", { status: 200 });
//   } catch (err) {
//     console.error('Error saving user:', err);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// };
