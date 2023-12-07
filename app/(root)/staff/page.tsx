"use client";
import { signOut } from "next-auth/react";

const Staff = () => {
  return <button onClick={() => signOut()}>staffログアウト</button>;
};

export default Staff;
