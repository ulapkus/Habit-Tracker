import Connect from "../../../utils/db";
import Users from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await Connect();
    const user = await Users.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
  }

  
  export async function POST(request, { params }) {
    const { id } = params;
    const { email } = await request.json();
    await Connect();
    await Users.findByIdAndUpdate(id, { email });
    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  }
  
//   export async function DELETE(request, { params }) {
//     const { id } = params;
//     console.log("DELETE", id);
//     await Connect();
//     await Products.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Product deleted successfully" },
//       { status: 200 }
//     );
//   }
  

// import Connect from "../../../utils/db";
// import User from "../../../models/User";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   const { id } = params;
//   await Connect();
//   const user = await User.findOne({ _id: id });
//   return NextResponse.json({ user }, { status: 200 });
// }

// export async function POST(request, { params }) {
//   const { id } = params;
//   const { title, description, price } = await request.json();
//   await Connect();
//   await User.findByIdAndUpdate(id, { title, description, price });
//   return NextResponse.json(
//     { message: "User updated successfully" },
//     { status: 200 }
//   );
// }

// export async function DELETE(request, { params }) {
//   const { id } = params;
//   console.log("DELETE", id);
//   await Connect();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json(
//     { message: "User deleted successfully" },
//     { status: 200 }
//   );
// }
