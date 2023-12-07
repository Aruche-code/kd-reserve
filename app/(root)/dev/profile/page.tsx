"use client";
import React, { useState } from 'react';
// import React from "react";
import Link from 'next/link';

const Profile = () => {

  const [formData, setFormData] = useState({
    kanjiName: "",
    kanaName: "",
    phoneNumber: "",
    department: "",
    grade: "",
    graduationYear: "",
    graduationMonth: "",
    industry: "",
    workLocation: "",
    qualifications: "",
  });

  const handleConfirm = () => {
    // フォームデータをJSON文字列に変換
    const jsonData = JSON.stringify(formData, null, 2);

    // メッセージボックスに表示
    alert(jsonData);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <main className="flex flex-col flex-1 p-2 overflow-auto items-center">
      <div className="mt-2 flex flex-col items-center w-6/12 py-2 border-4 border-blue-400 rounded-lg">
        <h1 className="mt-5 text-xl text-gray-800 font-semibold">プロフィール</h1>
        <div className="flex items-center mt-3 w-8/12">
          <label className="text-gray-900 w-1/3">氏名（漢字）</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.kanjiName}
            onChange={(e) => handleChange("kanjiName", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className="text-gray-900 w-1/3">氏名（カナ）</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.kanaName}
            onChange={(e) => handleChange("kanaName", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className="text-gray-900 w-1/3">電話番号</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">学科</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">学年</label>
          <input className="p-1 border-2 rounded-lg w-1/4 px-4"
            value={formData.grade}
            onChange={(e) => handleChange("grade", e.target.value)} />
          <label className="ms-2 text-sm font-medium text-gray-900">年</label>
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-2/6">卒業予定</label>
          <div className="flex items-center w-4/6">
            <input className="p-1 border-2 rounded-lg w-1/3 px-4"
              value={formData.graduationYear}
              onChange={(e) => handleChange("graduationYear", e.target.value)} />
            <label className="ms-2 text-sm font-medium text-gray-900">年</label>
            <input className="ml-2 p-1 border-2 rounded-lg w-1/3 px-4"
              value={formData.graduationMonth}
              onChange={(e) => handleChange("graduationMonth", e.target.value)} />
            <label className="ms-2 text-sm font-medium text-gray-900">月</label>
          </div>
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">志望業界</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">志望勤務地</label>
          <input className="p-1 border-2 rounded-lg w-2/3 px-4"
            value={formData.workLocation}
            onChange={(e) => handleChange("workLocation", e.target.value)} />
        </div>
        <div className="flex items-center mt-3 w-8/12">
          <label className=" text-gray-900 w-1/3">保有資格</label>
          <textarea
            className="p-1 border-2 rounded-lg w-2/3 px-4"
            rows={(2 as React.TextareaHTMLAttributes<HTMLTextAreaElement>['rows'])}
            style={{ resize: "none" }}
            value={formData.qualifications}
            onChange={(e) => handleChange("qualifications", e.target.value)}
          />
        </div>
        <button
          className="flex items-center px-20 py-2 text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 mt-7 mb-4"
          onClick={handleConfirm}
        >
          確認する
        </button>
      </div>
    </main>
  );
}

export default Profile