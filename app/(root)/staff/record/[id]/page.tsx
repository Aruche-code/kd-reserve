"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function StudentRecordPage() {
  const pathname = usePathname();
  const studentId = pathname.split("/").pop(); // パスの最後の部分を取得

  useEffect(() => {
    // studentIdを使ってAPIコール等の処理
    console.log(studentId);
  }, [studentId]);

  return (
    <div>
      <h1>Student Record</h1>
      <p>Student ID: {studentId}</p>
    </div>
  );
}

export default StudentRecordPage;
