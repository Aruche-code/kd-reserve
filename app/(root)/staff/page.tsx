"use client";
import { signOut } from "next-auth/react";

const Staff = () => {
  return (
    <div>
      <button onClick={() => signOut()}>staffログアウト</button>
    </div>
  );
};

export default Staff;
