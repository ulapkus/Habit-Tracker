import React from "react";
import Image from "next/image";
import rabbitOne from "../../public/bunny-one.png";
import { useSession } from "next-auth/react";

export default function Bunny() {
  const { data: session } = useSession();

  return (
    <div className="login-rabbit-container">
      <Image className="login-rabbit" src={rabbitOne} alt="rabbit icon" />
      <div className="login-rabbit-comment">
        {!session ? (
          <div>ONE HOP AT A TIME!</div>
        ) : (
          <div className="current-user"> ONE HOP AT A TIME, {session.user?.name}!</div>
        )}
      </div>
    </div>
  );
}
