import React from "react";
import Link from 'next/link';

const Profile= () => {
    return (
        <main className="flex flex-col flex-1 p-4 overflow-auto items-center">
        <div className="mt-5 flex flex-col items-center w-6/12 py-2 border-4 border-blue-400 rounded-lg">
          <h1 className="mt-10 text-2xl text-gray-600 font-banana">プロフィール</h1>
          <div className="flex items-center mt-5 w-8/12">
            <label className="text-gray-900 w-1/3">氏名（漢字）</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className="text-gray-900 w-1/3">氏名（カナ）</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className="text-gray-900 w-1/3">電話番号</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">性別</label>
            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900">男性</label>
            <input id="default-radio-2" type="radio" value="" name="default-radio2" className="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900">女性</label>
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">学科</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">学年</label>
            <input className="p-2 border-2 rounded-lg w-1/3 px-4" />
            <label className="ms-2 text-sm font-medium text-gray-900">年</label>
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-2/5">卒業予定</label>
            <input className="p-2 border-2 rounded-lg w-2/5 px-4" />
            <label className="ms-2 text-sm font-medium text-gray-900">年</label>
            <input className="ml-2 p-2 border-2 rounded-lg w-1/5 px-4" />
            <label className="ms-2 text-sm font-medium text-gray-900">月</label>
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">志望業界</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">志望勤務地</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <div className="flex items-center mt-3 w-8/12">
            <label className=" text-gray-900 w-1/3">保有資格</label>
            <input className="p-2 border-2 rounded-lg w-2/3 px-4" />
          </div>
          <Link href="/profile1">
            <button className="flex items-center px-20 py-3 text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 mt-7 mb-4">確認する</button>
          </Link>
        </div>
      </main>
    );
}

export default Profile