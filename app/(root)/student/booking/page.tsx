"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TeachersList from "../../components/TeachersList";

/**
 * InterviewScheduler Component
 * 面談予約システムのメインコンポーネント。教師のリストを表示し、選択された教師の利用不可日をユーザーに提供します。
 */
const InterviewScheduler = () => {
  // 選択された教師のIDを保持します。
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  // 利用可能な全教師のリストを保持します。
  const [teachers, setTeachers] = useState([]);
  // 選択された教師の利用不可日（NG日）を保持します。
  const [ngDates, setNgDates] = useState([]);

  // 教師データと利用不可日をAPIから取得します。
  useEffect(() => {
    // 教師のデータをフェッチする非同期関数
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/student/booking");
        setTeachers(response.data.staffUsers);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    };

    // 選択された教師の利用不可日をフェッチする非同期関数
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

    // 教師データと利用不可日のデータをフェッチします。
    fetchTeachers();
    fetchNgDates();
  }, [selectedTeacher]); // selectedTeacherが変更された時にのみ実行されます。

  return (
    <div>
      <h1>面談予約</h1>
      {/* TeachersListコンポーネント：教師の一覧を表示し、教師を選択する機能を提供します。 */}
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
