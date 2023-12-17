// import User from "/models/User";
// import connect from "/utils/db";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   const { email, password } = await request.json();

//   await connect();

//   const hashedPassword = await bcrypt.hash(password, 5);
//   const newUser = new User({
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("user is registered", { status: 200 });
//   } catch (err) {
//     return new NextResponse(err, {
//       status: 500,
//     });
//   }
// };
