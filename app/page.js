'use client';

// import { getServerSession } from "next-auth/next";
// import {authOptions} from "./api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
export default function Home() {
  // const data = await getServerSession(authOptions);
  const {data} = useSession();
  return <main>{JSON.stringify(data)}</main>
}

// "use client";

// import Tabs from "./Tabs";
// import Footer from "./components/footer";

// export default function Home() {
//   return (
//     <div className="main">
//       <Tabs />
//       <div className="main-footer">
//         <Footer />
//       </div>
//     </div>
//   );
// }
