"use client";
//ここが生徒のホームルートになります
//ログアウトボタンはサイドバーに組み込む予定です
import { signOut } from "next-auth/react";

const Student = () => {
  return (
    <div>
      <button onClick={() => signOut()}>studentログアウト</button>
    </div>
  );
};

export default Student;
