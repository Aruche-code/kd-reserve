// 教員側の画面で学生の一覧を表示するページのコンポーネント
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";

interface User {
  id: number | string;
  name: string;
  email: string;
  studentIdNumber: string;
}

const Students = () => {
  const [user, setStudents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // 学生一覧を取得するAPIのエンドポイント
    const apiEndpoint = "/api/staff/students";

    // APIから学生一覧を取得
    const fetchStudents = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setStudents(response.data.users);
      } catch (error) {
        toast.error("学生データの取得エラー");
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // searchTermが変更されるたびに検索を実行
    const filtered = user.filter((user) =>
      user.studentIdNumber.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, user]);

  // 検索欄の入力値が変更された時に画面に更新結果を反映するコンポーネント
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <div className="bg-gray-100 rounded-lg shadow-md w-4/5 mt-5">
        <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
          ■ 学生一覧
        </div>
        <div className="mt-3 p-3">
          <div className="relative flex justify-end">
            <div className="flex justify-center w-full px-4">
              <div className="relative w-full max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  className="pl-10 pr-3 py-2 border rounded-full w-full hover:shadow-lg focus:shadow-lg focus:outline-0"
                  type="text"
                  placeholder="検索"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="m-5 flex flex-wrap justify-center items-center">
          {filteredUsers.map((user) => (
            // <Link key={user.id} href={`../staff/record/${user.id}`}>
            <Link key={user.id} href={`../staff/record/`}>
              <button
                // key={user.id}
                className={
                  "my-2 mx-5 min-w-[24ch] px-8 p-5 border-2 bg-white border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl overflow-hidden"
                }
                title={user.name}
              >
                {user.name.length > 8
                  ? user.name.slice(0, 8) + "..."
                  : user.name}
                <br />
                学籍番号：{user.studentIdNumber}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
