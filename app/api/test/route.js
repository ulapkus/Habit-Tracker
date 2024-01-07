import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// export async function POST(request) {
//   const { email } = await request.json();
//   await Connect();
//   await Users.create({ email });
//   return NextResponse.json(
//     { message: "User created successfully" },
//     { status: 200 }
//   );
// }

// export async function POST(request) {
//   // const { email } = await request.json();
//   await Connect();
//   await Users.insertOne({ lastname: "hellooo" });
//   return NextResponse.json(
//     { message: "User created successfully" },
//     { status: 200 }
//   );
// }

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
      $set: { days: dataObject },
      $addToSet: { habits: { $each: dataa }, colors: { $each: datacolor } },
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

// export async function GET() {
//     await Connect();
//     const users = await Users.distinct('testname', { email: 'testy@aim.com' });

//     return NextResponse.json({ users }, { status: 200 });
//   }

// export async function GET(request, { params }) {
//   const { id } = params;
//   await Connect();
//   const user = await Users.findOne({ email: "ula@aim.com" });
//   return NextResponse.json({ user }, { status: 200 });
// }

// export async function GET() {
//   await Connect();
// const session = await getServerSession();
// const thisuser = session.user.email;

//   const update = { $set: { lastname: 'hey' } }; // Replace 'newTestName' with the new value
//   const currentuser = await Users.findOneAndUpdate(thisuser, update, { returnDocument: 'after' });
// return NextResponse.json({ currentuser }, { status: 200 });
// }

export async function GET() {
  await Connect();
  const session = await getServerSession();
  const data = await Users.find({email: session.user.email}, {days: true});

  return NextResponse.json({ data }, { status: 200 });
}

//this returns the current email logged in
// export async function GET() {
//   await Connect();
// const session = await getServerSession();
// const currentuser = session.user.email;
//   return NextResponse.json({ currentuser }, { status: 200 });
// }

//idk
// export async function GET() {
//   await Connect();
//   const filter = { email: "ula@aim.com"};
//   const update = { $set: { name: 'hey' } };

//   const users = await Users.insertOne({ lastname: "hellooo"});
//  // thisll give you the testname value
//   // const users = await Users.distinct('testname', { email: 'testy@aim.com' });
// return NextResponse.json({ users }, { status: 200 });
// }

//this updates the name value
// export async function GET() {
//   await Connect();
//   const filter = { email: "ula@aim.com"};
//   const update = { $set: { name: 'hey' } };

//   const users = await Users.findOneAndUpdate(filter, update, { returnDocument: 'after' });
//  // thisll give you the testname value
//   // const users = await Users.distinct('testname', { email: 'testy@aim.com' });
// return NextResponse.json({ users }, { status: 200 });
// }
