"use client";
import { signOut } from "next-auth/react";

const Student = () => {
  return <button onClick={() => signOut()}>studentログアウト</button>;
};

export default Student;
