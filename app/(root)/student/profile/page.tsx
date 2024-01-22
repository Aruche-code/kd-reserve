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

  // {refreshInterval: 1000,}
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

  if (error) return <div>データの取得に失敗しました。</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-full lg:w-2/4 bg-white rounded-md shadow-md">
        <div className="p-3 px-6 rounded-t-lg bg-kd-s text-white text-center">
          ■ プロフィール
        </div>

        <div className="p-4 ml-7 mr-7 sm:ml-10 sm:mr-10 ">
          <div className="profile-header mb-7 mt-1">
            {userData ? (
              <h2 className="text-center text-xl font-bold">
                {userData?.name}
              </h2>
            ) : (
              <h2 className="text-center text-xl font-bold h-6 mx-20 animate-pulse bg-gray-300 rounded-md"></h2>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto text-xs md:text-base"
          >
            {/* メールアドレス */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900 ">メールアドレス</label>

              {userData ? (
                <span className="col-span-2 sm:col-span-1">
                  {userData?.email}
                </span>
              ) : (
                <span className=" col-span-2 sm:col-span-1 h-4 animate-pulse bg-gray-300 rounded-md"></span>
              )}
            </div>

            <div className="mt-2 mb-8 border-b border-gray-300"></div>

            {/* 電話番号 */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">電話番号</label>
              <span className="col-span-2 sm:col-span-1 ">
                <input
                  className="bg-slate-100 p-1 rounded-md text-sm text-center focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
                  type="text"
                  name="tel"
                  value={profileData.tel}
                  onChange={handleChange}
                  placeholder="000-0000-0000"
                />
              </span>
            </div>
            {/* 学科 */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">学科</label>
              <span className="col-span-2 sm:col-span-1 ">
                <input
                  className="bg-slate-100 p-1 rounded-md text-sm text-center focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleChange}
                  placeholder="ITスペシャリスト"
                />
              </span>
            </div>
            {/* 学年*/}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">学年</label>
              <span className="col-span-2 sm:col-span-1 ">
                <select
                  className="bg-slate-100 p-1 rounded-md text-sm focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
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
              </span>
            </div>
            {/* 卒業予定 */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">卒業予定</label>
              <span className="col-span-2 sm:col-span-1 ">
                <select
                  className="bg-slate-100 p-1 rounded-md text-sm focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
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
              </span>
            </div>
            {/* 希望勤務地 */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">希望勤務地</label>
              <span className="col-span-2 sm:col-span-1 ">
                <input
                  className="bg-slate-100 p-1 rounded-md text-sm text-center focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
                  type="text"
                  name="workLocation"
                  value={profileData.workLocation}
                  onChange={handleChange}
                  placeholder="兵庫、大阪、"
                />
              </span>
            </div>

            {/* 資格 */}
            <div className="grid grid-cols-3 gap-4 items-center mt-3">
              <label className="text-gray-900">資格</label>
              <span className="col-span-3 sm:col-span-2">
                <textarea
                  className="bg-slate-100 p-1 rounded-md text-sm w-full focus:outline-none focus:shadow-custom-blue hover:shadow-custom-blue"
                  name="qualification"
                  value={profileData.qualification}
                  onChange={handleChange}
                  rows={2}
                  style={{ resize: "none" }}
                />
              </span>
            </div>
            {userData ? (
              <button
                className="flex items-center px-14 py-2 text-center text-white bg-kd-button-cl rounded-xl hover:bg-blue-500 mt-8 mx-auto"
                type="submit"
              >
                {isEditing ? "保存" : "新規作成"}
              </button>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
