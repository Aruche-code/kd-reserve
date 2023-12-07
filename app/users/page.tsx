"use client";
import { signOut } from "next-auth/react";

const Users = () => {
  return <button onClick={() => signOut()}>ログアウト</button>;
};

export default Users;
