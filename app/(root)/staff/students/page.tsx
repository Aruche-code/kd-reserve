// 教員側の画面で学生の一覧を表示するページのコンポーネント
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number | string;
  name: string;
  email: string;
  studentIdNumber: string;
}

const Students = () => {
  const [user, setStudents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // console.log(user);
  useEffect(() => {
    // 学生一覧を取得するAPIのエンドポイント
    const apiEndpoint = '/api/koma/StudentsListGet';

    // APIから学生一覧を取得
    const fetchStudents = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        // console.log(response);
        setStudents(response.data.users);
      } catch (error) {
        console.error('学生データの取得エラー:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // searchTermが変更されるたびに検索を実行
    const filtered = user.filter(user =>
      user.studentIdNumber.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, user]);

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
            <div className="relative w-20px">
              <div className="relative flex justify-end">
                <input
                  className="w-full rounded-full hover:shadow-lg focus:shadow-lg focus:outline-0 p-2 px-10 border pl-18 mr-6 ml-6"
                  type="text"
                  placeholder="検索"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="absolute left-10 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="m-5 flex flex-wrap justify-center items-center">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              className={'my-2 mx-5 min-w-[24ch] px-8 p-5 border-2 bg-white border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl overflow-hidden'}
              title={user.name}
            >
              {user.name.length > 8 ? user.name.slice(0, 8) + '...' : user.name}<br />
              学籍番号：{user.studentIdNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;