"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Profile = () => {

  const [formData, setFormData] = useState({
    name: "",
    kana: "",
    tel: "",
    department: "",
    grade: "",
    graduationYear: "",
    industry: "",
    workLocation: "",
    qualifications: "",
  });

  const [telError, setTelError] = useState("");

  const handleConfirm = () => {
    for (const key in formData) {
      if (!formData[key]) {
        alert("全ての項目を入力してください");
        return;
      }
    }
    if (!isValidTel(formData.tel)) {
      setTelError("半角11桁の数字で入力してください");
      return;
    }

    // もし有効ならばエラーをクリア
    setTelError("");

    // 確認ロジックを続行
    const jsonData = JSON.stringify(formData, null, 2);
    alert(jsonData);

    window.location.href = '../dev/profile1';
  };

  const isValidTel = (tel) => {
    // 簡単なバリデーション: telが半角11桁の数字かどうかを確認
    return /^\d{11}$/.test(tel);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <main className="flex flex-col flex-1 p-1.5 overflow-auto items-center">
      <div className="bg-gray-100 shadow-lg flex flex-col items-center w-full md:w-4/5 lg:w-2/3 xl:w-1/2 text-xs md:text-sm lg:text-sm rounded-lg">
        <h1 className="mt-8 mb-2 text-xl text-gray-800 font-semibold">プロフィール</h1>
        <div className="flex items-center mt-3 w-8/12">
          <label className="text-gray-900 w-1/3">氏名 (漢字)</label>
          <input className="p-1 border-1 rounded-lg w-2/3 px-4"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className="text-gray-900 w-1/3">氏名 (カナ)</label>
          <input className="p-1 border-1 rounded-lg w-2/3 px-4"
            value={formData.kana}
            onChange={(e) => handleChange("kana", e.target.value)} />
        </div>
        <div className="flex flex-col mt-3 w-8/12">
          <div className="flex items-center">
            <label className="text-gray-900 w-1/3">電話番号</label>
            <input
              className={`p-1 border-1 rounded-lg w-2/3 px-4`}
              value={formData.tel}
              onChange={(e) => handleChange('tel', e.target.value)}
            />
          </div>
          {telError && (
            <span className="text-red-500 text-xs mt-1 ml-auto">{telError}</span>
          )}
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">学科</label>
          <input className="p-1 border-1 rounded-lg w-2/3 px-4"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">学年</label>
          <select
            className="p-1 border-1 rounded-lg w-1/2 sm:w-1/3 md:w-1/4 px-4"
            value={formData.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label className="ms-2 text-gray-900">年</label>
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">卒業予定</label>
          <select
            className="p-1 border-1 rounded-lg w-1/2 sm:w-1/3 md:w-1/4 px-4"
            value={formData.graduationYear}
            onChange={(e) => handleChange("graduationYear", e.target.value)}
          >
            <option value=""></option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
          <label className="ms-2 text-gray-900">年</label>
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">志望業界</label>
          <input className="p-1 border-1 rounded-lg w-2/3 px-4"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">志望勤務地</label>
          <input className="p-1 border-1 rounded-lg w-2/3 px-4"
            value={formData.workLocation}
            onChange={(e) => handleChange("workLocation", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">保有資格</label>
          <textarea
            className="p-1 border-1 rounded-lg w-2/3 px-4"
            rows={(2 as React.TextareaHTMLAttributes<HTMLTextAreaElement>['rows'])}
            style={{ resize: "none" }}
            value={formData.qualifications}
            onChange={(e) => handleChange("qualifications", e.target.value)}
          />
        </div>
        {/* <Link href="../dev/profile1"> */}
        <button
          className="flex items-center px-20 py-2 text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 mt-5 mb-7"
          onClick={handleConfirm}
        >
          確認する
        </button>
        {/* </Link> */}
      </div>
    </main>
  );
}

export default Profile