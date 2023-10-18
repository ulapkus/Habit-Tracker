

// export default async function Home() {
//   return <main>Hello</main>
// }

"use client";

import Tabs from "./Tabs";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="main">
      <Tabs />
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
}
