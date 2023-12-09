"use client";
import { signOut } from "next-auth/react";

const Users = () => {
  return (
    <div>
      <h1>authenticated!!</h1>
      <button onClick={() => signOut()}>ログアウト</button>
    </div>
  );
};

export default Users;
