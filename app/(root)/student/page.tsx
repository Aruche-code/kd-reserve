"use client";
import React, { useState } from "react";
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

  if (error) return <div>エラーが発生しました</div>;
  // if (!homeData) return setIsLoading(true);

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

  const SkeletonRow = () => (
    <div className="mb-3 grid grid-cols-1 sm:grid-cols-5 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-8 bg-gray-300 rounded"></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-full lg:w-4/5 bg-white rounded-md shadow-md">
        {/* 確定予約セクション */}
        <div className="p-3 px-6 rounded-t-lg bg-kd-s text-white">
          ■ 予約確定一覧
        </div>

        <div className="p-4">
          {homeData?.getBookingList ? (
            homeData.getBookingList.length === 0 ? (
              <div className="text-center">現在確定した予約はありません</div>
            ) : (
              homeData.getBookingList.map((booking: any) => (
                <div
                  className="mb-3 grid grid-cols-1 sm:grid-cols-5 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center"
                  key={booking.id}
                >
                  {/* 日付 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      日付
                    </span>
                    <span className="text-sm md:text-base">{booking.ymd}</span>
                  </div>

                  {/* 時間帯 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      時間帯
                    </span>
                    <span className="text-sm md:text-base">{booking.time}</span>
                  </div>

                  {/* 職員名 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      職員
                    </span>
                    <span className="text-sm md:text-base">
                      {booking.staffName}
                    </span>
                  </div>

                  {/* 詳細 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      詳細
                    </span>
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
            )
          ) : (
            <SkeletonRow />
          )}
        </div>

        {/* 承認待ちセクション */}
        <div className="p-3 px-6 bg-kd-a_200 text-white">
          ■ 承認待ちリクエスト内容
        </div>
        <div className="p-4">
          {homeData?.getWaitingList ? (
            homeData.getWaitingList.length === 0 ? (
              <div className="text-center">現在承認待ちの予定はありません</div>
            ) : (
              homeData.getWaitingList.map((waiting: any) => (
                <div
                  className="mb-3 grid grid-cols-1 sm:grid-cols-5 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center"
                  key={waiting.id}
                >
                  {/* 日時カード */}
                  <div className="sm:col-span-2 flex flex-col">
                    <div className="flex justify-start space-x-1 mb-2">
                      <span className="font-bold text-xs md:text-sm w-1/2 text-left">
                        希望日
                      </span>
                      <span className="font-bold text-xs md:text-sm w-1/2 text-left">
                        時間帯
                      </span>
                    </div>
                    <div className="flex justify-start space-x-1">
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.firstYmd}
                      </span>
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.firstStartTime}～{waiting.firstEndTime}
                      </span>
                    </div>
                    <div className="flex justify-start space-x-1">
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.secondYmd}
                      </span>
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.secondStartTime}～{waiting.secondEndTime}
                      </span>
                    </div>
                    <div className="flex justify-start space-x-1">
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.thirdYmd ? waiting.thirdYmd : "なし"}
                      </span>
                      <span className="text-sm md:text-base w-1/2 text-left">
                        {waiting.thirdStartTime && waiting.thirdEndTime
                          ? `${waiting.thirdStartTime}～${waiting.thirdEndTime}`
                          : waiting.thirdStartTime ||
                            waiting.thirdEndTime ||
                            "なし"}
                      </span>
                    </div>
                  </div>

                  {/* 職員名カード */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      指名職員
                    </span>
                    <span className="text-sm md:text-base">
                      {waiting.staffName}
                    </span>
                  </div>

                  {/* 詳細カード */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      詳細
                    </span>
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
            )
          ) : (
            <SkeletonRow />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
