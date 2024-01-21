"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";

interface Booking {
  id: string;
  // その他の予約関連のフィールド
}

interface Waiting {
  id: string;
  // その他の待機関連のフィールド
}

interface HomeData {
  message: string;
  getBookingList: Booking[];
  getWaitingList: Waiting[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Home = () => {
  const {
    data: homeData,
    error,
    mutate,
  } = useSWR<HomeData>("/api/student", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!homeData) return <div>Loading...</div>;

  const handleCancelBooking = async (id: string) => {
    try {
      await axios.delete("/api/student/bookingdelete", {
        data: { scheduleId: id },
      });
      mutate(); // データを再検証し、更新
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleCancelWaiting = async (id: string) => {
    try {
      await axios.delete("/api/student/waitdelete", {
        data: { scheduleId: id },
      });
      mutate(); // データを再検証し、更新
    } catch (error) {
      console.error("Error cancelling waiting:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-full lg:w-4/5 bg-white rounded-md shadow-md">
        {/* 確定予約セクション */}
        <div className="p-3 px-6 rounded-t-lg bg-blue-500 text-white">
          ■ 予約確定一覧
        </div>
        <div className="p-4">
          {homeData.getBookingList && homeData.getBookingList.length === 0 ? (
            <div className="text-center">現在確定した予約はありません</div>
          ) : (
            homeData.getBookingList.map((booking: any) => (
              <div
                className="mb-3 grid grid-cols-1 sm:grid-cols-5 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center"
                key={booking.id}
              >
                {/* 日付 */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">日付</span>
                  <span className="text-sm md:text-base">{booking.ymd}</span>
                </div>

                {/* 時間帯 */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">時間帯</span>
                  <span className="text-sm md:text-base">{booking.time}</span>
                </div>

                {/* 職員名 */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">職員</span>
                  <span className="text-sm md:text-base">
                    {booking.staffName}
                  </span>
                </div>

                {/* 詳細 */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">詳細</span>
                  <span className="text-sm md:text-base">
                    {booking.details}
                  </span>
                </div>

                {/* キャンセルボタン */}
                <button
                  type="button"
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 active:scale-95 transition duration-300"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  キャンセル
                </button>
              </div>
            ))
          )}
        </div>

        {/* 承認待ちセクション */}
        <div className="p-3 px-6 bg-blue-500 text-white">■ 承認待ち</div>
        <div className="p-4">
          {homeData.getWaitingList && homeData.getWaitingList.length === 0 ? (
            <div className="text-center">現在承認待ちの予定はありません</div>
          ) : (
            homeData.getWaitingList.map((waiting: any) => (
              <div
                className="mb-3 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center"
                key={waiting.id}
              >
                {/* 日時カード */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-start items-center space-x-2">
                    <span className="text-xs md:text-sm font-bold">
                      {waiting.firstYmd}
                    </span>
                    <span className="text-xs md:text-sm">
                      {waiting.firstStartTime}～{waiting.firstEndTime}
                    </span>
                  </div>
                  <div className="flex justify-start items-center space-x-2">
                    <span className="text-xs md:text-sm font-bold">
                      {waiting.secondYmd}
                    </span>
                    <span className="text-xs md:text-sm">
                      {waiting.secondStartTime}～{waiting.secondEndTime}
                    </span>
                  </div>
                  {/* その他の日時データ */}
                </div>
                {/* 職員名カード */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">職員名</span>
                  <span className="text-sm md:text-base">
                    {waiting.staffName}
                  </span>
                </div>

                {/* 詳細カード */}
                <div className="flex flex-col">
                  <span className="font-bold text-xs md:text-sm">詳細</span>
                  <span className="text-sm md:text-base">
                    {waiting.details}
                  </span>
                </div>

                {/* キャンセルボタン */}
                <button
                  type="button"
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 active:scale-95 transition duration-300"
                  onClick={() => handleCancelWaiting(waiting.id)}
                >
                  キャンセル
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// const Student = () => {
//   const testUsers = [
//     {
//       id: '601b92ee95861639c3e2c44b',
//       teachername: '○○先生',
//       day: '2023/12/3',
//       time: '10:00~12:00',
//       subject: '面接練習'
//     },
//     {
//       id: '601b95a595861639c3e2c44c',
//       teachername: '○○先生',
//       day: '2023/12/4',
//       time: '13:00~14:00',
//       subject: 'エントリーシート作成'
//     },
//   ];

//   const testUsers2 = [
//     {
//       id: '601b92ee95861639c3e2c44b',
//       teachername: '○○先生',
//       day1: '2023/12/3',
//       time1: '10:00~12:00',
//       day2: '2023/12/4',
//       time2: '10:00~12:00',
//       day3: '2023/12/5',
//       time3: '10:00~13:00',
//       subject: '面接練習'
//     },
//     {
//       id: '601b95a595861639c3e2c44c',
//       teachername: '○○先生',
//       day1: '2023/12/3',
//       time1: '10:00~12:00',
//       day2: '2023/12/4',
//       time2: '10:00~12:00',
//       day3: '2023/12/5',
//       time3: '10:00~13:00',
//       subject: 'エントリーシート作成'
//     },
//   ];

//   return (
//     <div className="flex flex-col flex-wrap justify-center items-center">
//       <div className="flex flex-col mt-4 w-full lg:w-1/2  bg-white rounded-md shadow-md">
//         <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
//           ■ 予約確定一覧
//         </div>
//         <div className="mt-5 mb-5">
//           {testusers.map((user) => (
//             <div className="flex flex-col p-2" key={user.id}>
//               <div className="mx-4 p-2 border border-kd-sub2-cl bg-white rounded-lg flex flex-row">
//                 <div className="w-4/5 flex flex-row text-center items-center justify-center text-xs md:text-base lg:text-sm xl:text-base">
//                   <div className="w-1/3 px-3 flex flex-col">
//                     <div>{user.day}</div>
//                     <div className="">{user.time}</div>
//                   </div>
//                   <div className="w-1/3 px-3">
//                     {user.teachername}
//                   </div>
//                   <div className="w-1/3 px-3">
//                     {user.subject}
//                   </div>
//                 </div>
//                 <div className="w-1/5 flex items-center justify-center">
//                   <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="p-3 px-6 rounded-t bg-kd-sub2-cl text-white">
//           ■ 承認待ち
//         </div>
//         <div className="mt-5 text-xs md:text-base lg:text-sm xl:text-base mb-5">
//           {waitingList.map((user) => (
//             <div className="flex flex-col p-2" key={user.id}>
//               <div className="mx-4 p-2 border bg-white border-kd-sub2-cl rounded-lg flex flex-row">
//                 <div className="w-4/5 flex flex-row text-center items-center justify-center">
//                   <div className="w-2/3 px-3 flex flex-col">
//                     1.　{user.day1}　{user.time1}<br />
//                     2.　{user.day2}　{user.time2}<br />
//                     3.　{user.day3}　{user.time3}<br />
//                   </div>
//                   <div className="w-1/3 border-left-2 border-gray-200 px-3">
//                     {user.teachername}<br />
//                     {user.subject}
//                   </div>
//                 </div>
//                 <div className="w-1/5 flex items-center justify-center">
//                   <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Home;
