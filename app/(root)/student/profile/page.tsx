"use client";
import { toast } from "react-hot-toast";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { StudentProfile, ApiResponse } from "@/app/components/types";

const fetcher = (url: string) =>
  axios.get<ApiResponse>(url).then((res) => res.data);

function UserForm() {
  const [profileData, setProfileData] = useState<StudentProfile>({
    department: "",
    schoolYear: "",
    tel: "",
    graduationYear: "",
    qualification: "",
    workLocation: "",
  });

  const { data, error } = useSWR("/api/student/profile", fetcher);
  const userData = data ? data.user[0] : null;
  const isEditing = userData && userData.studentProfile;
  // 学年の選択肢
  const schoolYears = ["1", "2", "3", "4"];

  // 現在の年を取得し、卒業予定年の選択肢を生成
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from(
    { length: 4 },
    (_, i) => currentYear + i
  ).map(String);

  useEffect(() => {
    if (isEditing && userData && userData.studentProfile) {
      setProfileData(userData.studentProfile);
    } else {
      setProfileData({
        department: "",
        schoolYear: "",
        tel: "",
        graduationYear: "",
        qualification: "",
        workLocation: "",
      });
    }
  }, [userData, isEditing]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isEditing) {
        response = await axios.put("/api/student/profile", profileData);
        toast.success("プロフィール保存完了!");
      } else {
        response = await axios.post("/api/student/profile", profileData);
        toast.success("プロフィール新規作成！");
      }
      if (response.data) {
        mutate("/api/student/profile");
      }
    } catch (error) {
      toast.error("送信出来ませんでした。");
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete("/api/student/profile");
  //     toast.success("プロフィールを削除しました。");
  //     mutate("/api/student/profile");
  //   } catch (error) {
  //     toast.error("削除できませんでした。");
  //   }
  // };

  if (error) return <div>データの取得に失敗しました。</div>;
  if (!data)
    return (
      <div>ローディング中...{/* ここにスケルトンボディを追加してほしい */}</div>
    );

  return (
    <div className="flex flex-col flex-1 p-1.5 items-center">
      <div className="bg-gray-100 shadow-lg flex flex-col items-center w-full md:w-4/5 lg:w-2/3 xl:w-1/2 text-xs md:text-sm lg:text-sm rounded-lg">

        <h1 className="mt-8 mb-2 text-xl text-gray-800 font-semibold">プロフィール</h1>

        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 py-1 mx-auto">
            <label className="text-gray-900 w-1/3">名前</label> {userData?.name}
          </div>
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 py-1 mx-auto">
            <label className="text-gray-900 w-1/3">メールアドレス</label> {userData?.email}
          </div>
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className=" text-gray-900 w-1/3">電話番号</label>
            <input className={`p-1 border-1 rounded-lg w-2/3 px-4`}
              type="text"
              name="tel"
              value={profileData.tel}
              onChange={handleChange}
            />
          </div>
          {/* 各フォームフィールド */}
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className="text-gray-900 w-1/3">学科</label>
            <input className="p-1 border-1 rounded-lg w-2/3 px-4"
              type="text"
              name="department"
              value={profileData.department}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className=" text-gray-900 w-1/3">学年</label>
            <select className="p-1 border-1 rounded-lg w-1/3 md:w-1/4 px-4"
              name="schoolYear"
              value={profileData.schoolYear}
              onChange={handleChange}
            >
              {schoolYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label className="ms-2 text-gray-900">年</label>
          </div>
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className=" text-gray-900 w-1/3">卒業予定</label>
            <select className="p-1 border-1 rounded-lg w-1/3 md:w-1/4 px-4"
              name="graduationYear"
              value={profileData.graduationYear}
              onChange={handleChange}
            >
              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label className="ms-2 text-gray-900">年</label>
          </div>

          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className=" text-gray-900 w-1/3">希望勤務地</label>
            <input className="p-1 border-1 rounded-lg w-2/3 px-4"
              type="text"
              name="workLocation"
              value={profileData.workLocation}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mt-3 w-3/4 sm:w-8/12 mx-auto">
            <label className=" text-gray-900 w-1/3">資格</label>
            <textarea className="p-1 border-1 rounded-lg w-2/3 px-4"
              name="qualification"
              value={profileData.qualification}
              onChange={handleChange}
              rows={2}
              style={{ resize: "none" }}
            />
          </div>

          <button className="flex items-center px-20 py-2 text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 mt-7 mb-7 mx-auto"
            type="submit">{isEditing ? "保存" : "新規作成"}</button>
          {/* {isEditing && (
            <button className="flex items-center px-20 py-2 text-center text-white bg-red-400 rounded-xl hover:bg-red-500 mb-7 mx-auto"
              type="button" onClick={handleDelete}>
              入力リセット
            </button>
          )} */}
        </form>
      </div>
    </div>
  );
}

export default UserForm;
