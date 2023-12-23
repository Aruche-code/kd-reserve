// React モジュールと useState 関数をインポート
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TeachersList from "../../components/TeachersList";

const InterviewScheduler = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [ngDates, setNgDates] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/student/booking");
        setTeachers(response.data.staffUsers);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    };

    const fetchNgDates = async () => {
      try {
        if (selectedTeacher) {
          const response = await axios.get(
            `/api/student/booking/${selectedTeacher}`
          );
          setNgDates(response.data.staffNgData);
        }
      } catch (error) {
        console.error("Error fetching NG dates", error);
      }
    };

    fetchTeachers();
    fetchNgDates();
    console.log(selectedTeacher);
  }, [selectedTeacher]);

  return (
    <div>
      <h1>面談予約</h1>
      <TeachersList
        teachers={teachers}
        onSelect={setSelectedTeacher}
        selectedTeacherId={selectedTeacher ? selectedTeacher : null}
      />
      {/* NG日程の表示 */}
      <div>
        {ngDates.map((ngDate: any) => (
          <div key={ngDate.ymd}>
            <p>NG Date: {ngDate.ymd}</p>
            {/* NG時間の詳細表示 */}
            {ngDate.time.map((time: any) => (
              <p key={time}>{time}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewScheduler;

// "use client";
// // 予約画面
// import useSWR from "swr";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// // SWR

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const StaffList = () => {
//   const { data, error } = useSWR("/api/student/booking", fetcher);

//   if (error) return <div>エラーが発生しました。</div>;
//   if (!data) return <div>読み込み中...</div>;

//   return (
//     <div>
//       {data.staffUsers.map((staff: any) => (
//         <div key={staff.id}>
//           <p>{staff.id}</p>
//           <p>名前: {staff.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StaffList;
