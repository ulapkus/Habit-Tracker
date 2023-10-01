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
