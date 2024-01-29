"use client";
import { useRouter } from "next/navigation";

const StudentRecordTest = () => {
  const router = useRouter();

  const handleClick = (studentId: string) => {
    return () => {
      router.push(`/staff/record/${studentId}`);
    };
  };

  // onClick に handleClick を実行する関数を渡す
  return <button onClick={handleClick("shdhad89929")}>生徒情報</button>;
};

export default StudentRecordTest;
