"use client";

import Tabs from "./Tabs";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="mainnn">
      <div className="main">
        <Tabs />
      </div>
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
}
