"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function StudentRecordPage() {
  const pathname = usePathname();
  // pathname が null でないことを確認
  const studentId = pathname ? pathname.split("/").pop() : "不明";

  useEffect(() => {
    if (studentId !== "不明") {
      // studentIdを使ってAPIコール等の処理
    }
    // studentIdが変更された場合のみ、この効果を再実行
  }, [studentId]);

  return (
    <div>
      <h1>Student Record</h1>
      <p>Student ID: {studentId}</p>
    </div>
  );
}

export default StudentRecordPage;
