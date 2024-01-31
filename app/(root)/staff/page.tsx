"use client";
//ここが職員のホームルートになります
import React from "react";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { pusherClient } from "@/app/libs/pusher";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface Booking {
  id: string;
  // その他の予約関連のフィールド
}

interface HomeData {
  message: string;
  getBookingList: Booking[];
}

const Home = () => {
  const {
    data: homeData,
    error,
    mutate,
  } = useSWR<HomeData>("/api/staff", fetcher);

  // from api/student/bookingdelete
  const channel = pusherClient.subscribe("booking-delete-channel");
  channel.bind("booking-delete-event", () => {
    mutate();
  });

  if (error) return <div>エラーが発生しました</div>;

  const SkeletonRow = () => (
    <div className="mb-3 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="h-8 bg-gray-300 rounded"></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-full lg:w-4/5 bg-white rounded-md shadow-md">
        <div className="p-3 px-6 rounded-t-lg bg-kd-s text-white">
          ■ 本日の予定
        </div>

        <div className="p-4">
          {homeData?.getBookingList ? (
            homeData.getBookingList.length === 0 ? (
              <div className="text-center">本日の予定はありません</div>
            ) : (
              homeData?.getBookingList.map((booking: any) => (
                <div
                  className="mb-3 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-100 rounded-lg shadow-sm p-4 items-center"
                  key={booking.staffName}
                >
                  {/* 生徒名 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      生徒名
                    </span>
                    <span className="text-sm md:text-base">
                      {booking.studentName}
                    </span>
                  </div>

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

                  {/* 詳細 */}
                  <div className="flex flex-col">
                    <span className="font-bold text-xs md:text-sm mb-2">
                      詳細
                    </span>
                    <span className="text-sm md:text-base">
                      {booking.details}
                    </span>
                  </div>
                  <Link href="../staff/record"></Link>
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
