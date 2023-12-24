"use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import StaffList from "../../components/StaffList";
// import { Staff, StaffNgData } from "@/app/components/types";

// /**
//  * InterviewScheduler Component
//  * 面談予約システムのメインコンポーネント。教師のリストを表示し、選択された教師の利用不可日をユーザーに提供します。
//  */
// const InterviewScheduler: React.FC = () => {
//   // 選択された職員のIDを保持します。
//   const [selectedStaffMember, setSelectedStaffMember] = useState<string | null>(
//     null
//   );
//   // 利用可能な全職員のリストを保持します。
//   const [staff, setStaff] = useState<Staff[]>([]);
//   // 選択された職員の利用不可日（NG日）を保持します。
//   const [ngDates, setNgDates] = useState<StaffNgData[]>([]);

//   // 教師データと利用不可日をAPIから取得します。
//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const response = await axios.get("/api/student/booking");
//         // console.log("Staff Data:", response.data.staffUsers);
//         setStaff(response.data.staffUsers);
//       } catch (error) {
//         console.error("Error fetching staff", error);
//       }
//     };
//     const fetchNgDates = async () => {
//       if (selectedStaffMember) {
//         try {
//           const response = await axios.get(
//             `/api/student/booking/${selectedStaffMember}`
//           );
//           // console.log("NG Dates Data:", response.data.staffNgData[0].staffng);
//           setNgDates(response.data.staffNgData[0].staffng || []);
//         } catch (error) {
//           console.error("Error fetching NG dates", error);
//         }
//       }
//     };

//     // 職員データと利用不可日のデータをフェッチします。
//     fetchStaff();
//     fetchNgDates();
//   }, [selectedStaffMember]); // selectedStaffMemberが変更された時にのみ実行されます。

//   return (
//     <div>
//       <h1>面談予約</h1>
//       {/* StaffListコンポーネント：職員の一覧を表示し、職員を選択する機能を提供します。 */}
//       <StaffList
//         staff={staff}
//         onSelect={setSelectedStaffMember}
//         selectedTeacherId={selectedStaffMember}
//       />
//       {/* NG日程の表示 */}
//       {/* 日付被り対策 ngDate,index & time,timeIndex 一意のキーを生成 */}
//       <div>
//         {ngDates.map((ngDate, index) => (
//           <div key={`${ngDate.ymd}-${index}`}>
//             <p>NG Date: {ngDate.ymd}</p>
//             {ngDate.time.map((time, timeIndex) => (
//               <p key={`${ngDate.ymd}-${time}-${timeIndex}`}>{time}</p>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InterviewScheduler;

// SWR版とても速いよ
import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import StaffList from "../../components/StaffList";
import { Staff, StaffNgData } from "@/app/components/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const InterviewScheduler: React.FC = () => {
  const [selectedStaffMember, setSelectedStaffMember] = useState<string | null>(
    null
  );

  // スタッフデータを取得するためにSWRを使用
  const { data: staffData, error: staffError } = useSWR(
    "/api/student/booking",
    fetcher
  );
  const staff: Staff[] = staffData?.staffUsers || [];

  // 選択されたスタッフの利用不可日（NG日）を取得するためにSWRを使用
  const { data: ngData, error: ngError } = useSWR(
    selectedStaffMember ? `/api/student/booking/${selectedStaffMember}` : null,
    fetcher
  );
  const ngDates: StaffNgData[] = ngData?.staffNgData[0]?.staffng || [];

  // エラーハンドリング
  if (staffError) return <div>スタッフデータの読み込みに失敗しました。</div>;
  if (ngError) return <div>利用不可日の読み込みに失敗しました。</div>;

  return (
    <div>
      <h1>面談予約</h1>
      <StaffList
        staff={staff}
        onSelect={setSelectedStaffMember}
        selectedTeacherId={selectedStaffMember}
      />
      <div>
        {ngDates.map((ngDate, index) => (
          <div key={`${ngDate.ymd}-${index}`}>
            <p>NG Date: {ngDate.ymd}</p>
            {ngDate.time.map((time, timeIndex) => (
              <p key={`${ngDate.ymd}-${time}-${timeIndex}`}>{time}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewScheduler;
