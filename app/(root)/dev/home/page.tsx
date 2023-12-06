//トップレベルの予約ページコンポーネント
"use client";
import React, { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Home = () => {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    const daysInMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => i + 1);
    };
    
    //月を前に１つ戻す
    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };

    //月を後に１つ進める
    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };

    return (
        <div className="flex h-full w-full justify-center items-center">
            <div className="ml-8 mt-0 w-9/12 pr-5">
                <div className="text-3xl">{date.getFullYear()}年</div>
                <div className="flex justify-start items-center mb-4">
                    <ArrowCircleLeftIcon onClick={prevMonth} className="mr-5" />
                    <h2 className="text-5xl font-bold">
                    {date.getMonth() + 1}月
                    </h2>
                    <ArrowCircleRightIcon onClick={nextMonth} className="mx-5" />
                </div>
                <div className="grid grid-cols-7 w-11/12 mx-auto">
                    {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                    <div key={day} className="text-center font-bold">{day}</div>
                    ))}
                    {Array.from({ length: date.getDay() }, (_, i) => (
                    <div key={`empty-${i}`} className="text-center text-gray-400 border-2 h-20">{''}</div>
                    ))}
                    {daysInMonth().map(day => (
                    <div key={day} className="text-center border-2 h-20 hover:border-cyan-400" onClick={() => setShowModal(true)}>
                        {day}
                    </div>
                    ))}
                </div>
            </div>
            {showModal ? (
        <>
        <div
            className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
            onClick={() => setShowModal(false)}
        ></div>

        <div className="fixed inset-44 p-10 bg-white shadow-xl rounded-xl">
            <div className="flex justify-between items-start">
                <span className="font-bold">NG日程追加</span>
                <div className="flex space-x-4">
                    {/* 全日程 */}
                    <div className="flex-shrink-0 p-4 bg-white shadow-md rounded-md">
                        <span className="font-bold">全日程</span>
                        {/* ここに全日程のコンテンツを追加 */}
                    </div>

                    {/* 午前 */}
                    <div className="flex-shrink-0 p-4 bg-white shadow-md rounded-md">
                        <span className="font-bold">午前</span>
                        {/* ここに午前のコンテンツを追加 */}
                    </div>

                    {/* 午後 */}
                    <div className="flex-shrink-0 p-4 bg-white shadow-md rounded-md">
                        <span className="font-bold">午後</span>
                        {/* ここに午後のコンテンツを追加 */}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowModal(false)}>
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
        </div>
        </>
    ) : null}
        </div>
    );
}

export default Home