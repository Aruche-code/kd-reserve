"use client";
// 予約画面
import useSWR from "swr";
import axios from "axios";
import React, { useEffect, useState } from "react";

// SWR

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StaffList = () => {
  const { data, error } = useSWR("/api/student/booking", fetcher);

  if (error) return <div>エラーが発生しました。</div>;
  if (!data) return <div>読み込み中...</div>;

  return (
    <div>
      {data.staffUsers.map((staff: any) => (
        <div key={staff.id}>
          <p>{staff.id}</p>
          <p>名前: {staff.name}</p>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
