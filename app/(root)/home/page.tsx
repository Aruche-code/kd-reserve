//トップレベルの予約ページコンポーネント
"use client";
import React, { useState } from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Home = () => {
    const [date, setDate] = useState(new Date());

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
        <div className="flex h-full w-full">
        <div className="ml-8 mt-0 w-9/12 border-r-2 pr-5">
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
                <div key={day} className="text-center border-2 h-20 hover:border-cyan-400">
                    {day}
                </div>
                ))}
            </div>
        </div>
        <div className="flex-auto h-full bg-red-100"></div>
    </div>
    );
}

export default Home