import Navbar from "./Navbar";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider";
import ClientLogic from "./clientlogic";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/neue-power-trial-ultra.otf",
  display: "swap",
});

export const metadata = {
  title: "Habit Rabbit",
  description: "Habit tracker",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={myFont.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body>
        <SessionProvider session={session}>
          <ClientLogic>
            <Navbar />
            {children}
          </ClientLogic>
        </SessionProvider>
      </body>
    </html>
  );
}
