import React from "react";
import Image from "next/image";
import rabbitOne from "../../public/bunny-one.png";
import { useSession } from "next-auth/react";
import styles from "../styles/page.module.css";

export default function Bunny() {
  const { data: session } = useSession();

  return (
    <div className={styles.login_rabbit_container}>
      <Image className={styles.login_rabbit} src={rabbitOne} alt="" />
      <div className={styles.login_rabbit_comment}>
        {!session ? (
          <div>ONE HOP AT A TIME!</div>
        ) : (
          <div className={styles.current_user}>
            ONE HOP AT A TIME, {session.user?.name}!
          </div>
        )}
      </div>
    </div>
  );
}
