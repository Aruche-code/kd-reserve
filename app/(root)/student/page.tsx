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

  console.log(homeData);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center">
      <div className="flex flex-col mt-4 w-full lg:w-1/2  bg-white rounded-md shadow-md">
        <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
          ■ 予約確定一覧
        </div>
        <div className="mt-5 mb-5">
          {homeData.getBookingList && homeData.getBookingList.length === 0 ? (
            <div className="text-center">現在確定した予約はありません</div>
          ) : (
            homeData.getBookingList.map((booking: any) => (
              <div className="flex flex-col p-2" key={booking.id}>
                <div className="mx-4 p-2 border border-kd-sub2-cl bg-white rounded-lg flex flex-row">
                  <div className="w-4/5 flex flex-row text-center items-center justify-center text-xs md:text-base lg:text-sm xl:text-base">
                    <div className="w-1/3 px-3 flex flex-col">
                      <div>{booking.ymd}</div>
                      <div className="">{booking.time}</div>
                    </div>
                    <div className="w-1/3 px-3">{booking.staffName}</div>
                    <div className="w-1/3 px-3">{booking.details}</div>
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    <button
                      type="button"
                      className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 px-6 rounded-t bg-kd-sub2-cl text-white">
          ■ 承認待ち
        </div>
        <div className="mt-5 text-xs md:text-base lg:text-sm xl:text-base mb-5">
          {homeData.getBookingList && homeData.getWaitingList.length === 0 ? (
            <div className="text-center">現在承認待ちの予定はありません</div>
          ) : (
            homeData.getWaitingList.map((waiting: any) => (
              <div className="flex flex-col p-2" key={waiting.id}>
                <div className="mx-4 p-2 border bg-white border-kd-sub2-cl rounded-lg flex flex-row">
                  <div className="w-4/5 flex flex-row text-center items-center justify-center">
                    <div className="w-2/3 px-3 flex flex-col">
                      1. {waiting.firstYmd}
                      <br /> {waiting.firstStartTime}～{waiting.firstEndTime}
                      <br />
                      2. {waiting.secondYmd}
                      <br /> {waiting.secondStartTime}～{waiting.secondEndTime}
                      <br />
                      3. {waiting.thirdYmd}
                      <br /> {waiting.thirdStartTime}～{waiting.thirdEndTime}
                      <br />
                    </div>
                    <div className="w-1/3 border-left-2 border-gray-200 px-3">
                      {waiting.staffName}
                    </div>
                    <div className="w-1/3 border-left-2 border-gray-200 px-3">
                      {waiting.details}
                    </div>
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    <button
                      type="button"
                      className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white"
                      onClick={() => handleCancelWaiting(waiting.id)}
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
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
