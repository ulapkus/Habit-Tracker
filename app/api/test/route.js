import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json();
  await Connect();
  await Users.create({ email });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}

export async function GET() {
    await Connect();
    const users = await Users.distinct('testname', { email: 'testy@aim.com' });

    return NextResponse.json({ users }, { status: 200 });
  }

//   thisll maybe update a value
//   export async function GET() {
//     await Connect();
//     const filter = { email: 'testy@aim.com' };
//     const update = { $set: { testname: 'random' } }; // Replace 'newTestName' with the new value

//     const users = await Users.findOneAndUpdate(filter, update, { returnDocument: 'after' });
//    // thisll give you the testname value
//     // const users = await Users.distinct('testname', { email: 'testy@aim.com' });

//     return NextResponse.json({ users }, { status: 200 });
//   }