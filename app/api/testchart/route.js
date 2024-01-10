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
    const data = await Users.find(query, { _id: 0, colors: 1 });
  
    return NextResponse.json({ data }, { status: 200 });
  }

// export async function POST(request) {
//     try {
//       const { dataa, datacolor, dataObject } = await request.json();
//       await Connect();
//       const session = await getServerSession();
//       const thisuser = session.user.email;
//       const filter = { email: thisuser };
  
//       const result = await Users.updateOne(filter, {
//         $pop: { habits: -1 },
//       });
  
//       if (result.modifiedCount === 1) {
//         return NextResponse.json(
//           { message: "User updated successfully" },
//           { status: 200 }
//         );
//       } else {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       return NextResponse.json(
//         { message: "Error updating user" },
//         { status: 500 }
//       );
//     }
//   }


// //idk what this was for?
// // export async function POST(request) {
// //   try {
// //     const { dataa, datacolor, dataObject } = await request.json();
// //     // const { datacolor } = await request.json();

// //     await Connect();

// //     const session = await getServerSession();
// //     const thisuser = session.user.email;
// //     const filter = { email: thisuser };
// //     // const update = { $push: { habits: dataa } };

// //     // const update = { $set: { habits: dataa } };
// //     // const result = await Users.updateOne(filter, update);

// //     const result = await Users.updateOne(filter, {
// //         $addToSet: { habits: {$each: dataa}, colors: {$each: datacolor} },
// //     });

// //     if (result.modifiedCount === 1) {
// //       return NextResponse.json(
// //         { message: "User updated successfully" },
// //         { status: 200 }
// //       );
// //     } else {
// //       return NextResponse.json({ message: "User not found" }, { status: 404 });
// //     }
// //   } catch (error) {
// //     console.error("Error updating user:", error);
// //     return NextResponse.json(
// //       { message: "Error updating user" },
// //       { status: 500 }
// //     );
// //   }
// // }



