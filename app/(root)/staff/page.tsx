"use client";
//ここが職員のホームルートになります
//ログアウトボタンはサイドバーに組み込む予定です
import { signOut } from "next-auth/react";

const Staff = () => {
  return (
    <div>
      <button onClick={() => signOut()}>staffログアウト</button>
    </div>
  );
};

export default Staff;
