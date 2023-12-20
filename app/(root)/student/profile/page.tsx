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

  const handleDelete = async () => {
    try {
      await axios.delete("/api/student/profile");
      toast.success("プロフィールを削除しました。");
      mutate("/api/student/profile");
    } catch (error) {
      toast.error("削除できませんでした。");
    }
  };

  if (error) return <div>データの取得に失敗しました。</div>;
  if (!data)
    return (
      <div>ローディング中...{/* ここにスケルトンボディを追加してほしい */}</div>
    );

  return (
    <div>
      <h1>ユーザプロフィール</h1>

      <div>
        <strong>名前:</strong> {userData?.name}
      </div>
      <div>
        <strong>メール:</strong> {userData?.email}
      </div>
      <form onSubmit={handleSubmit}>
        {/* 各フォームフィールド */}
        <div>
          <label>学科：</label>
          <input
            type="text"
            name="department"
            value={profileData.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>学年：</label>
          <select
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
        </div>
        <div>
          <label>電話番号：</label>
          <input
            type="text"
            name="tel"
            value={profileData.tel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>卒業予定年：</label>
          <select
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
        </div>

        <div>
          <label>希望勤務地：</label>
          <input
            type="text"
            name="workLocation"
            value={profileData.workLocation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>所持資格：</label>
          <textarea
            name="qualification"
            value={profileData.qualification}
            onChange={handleChange}
            rows={2}
            style={{ resize: "none" }}
          />
        </div>

        <button type="submit">{isEditing ? "保存" : "新規作成"}</button>
        {isEditing && (
          <button type="button" onClick={handleDelete}>
            削除
          </button>
        )}
      </form>
    </div>
  );
}

export default UserForm;
