//トップレベルの予約ページコンポーネント
"use client";
import React, { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Home = () => {
    const [date, setDate] = useState(new Date());

    //モーダルウィンドウ
    const [showModal, setShowModal] = useState(false);

    //選ばれている日
    const [selectedDay, setSelectedDay] = useState<string>("1");

    //NG日程の選択状況
    const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string[] }>({});

    // バックグラウンドカラーを切り替える関数
    const toggleBgColor = (day:string, time:string) => {
        setSelectedTimes((prev) => {
            if (prev[day]) {
                const updatedTimes = prev[day].includes(time)
                    ? prev[day].filter((t) => t !== time)
                    : [...prev[day], time];
                return {
                    ...prev,
                    [day]: updatedTimes,
                };
            } else {
                // dayが存在しない場合、新しく作成する
                return {
                    ...prev,
                    [day]: [time],
                };
            }
        });
        const jsonSelectedTimes = JSON.stringify(selectedTimes);
        console.log(jsonSelectedTimes);
        // if (prev.includes(time)) {
        //     // 時間がすでに選択されている場合は削除
        //     return prev.filter((selectedTime) => selectedTime !== time);
        // } else {
        //     // 時間が選択されていない場合は追加
        //     return [...prev, time];
        // }
        // });
        // console.log(selectedTimes);
    };

    //全日指定
    const toggleALL = (value:string) => {
        switch (value) {
            case "午前":
                const timeAM = [
                    "09:00", "09:30", "10:00", "10:30",
                    "11:00", "11:30", "12:00", 
                ];

                {timeAM.map((time) => (
                    toggleBgColor(selectedDay,time)
                ))};

            break;
        
            case "午後":
                const timePM = [
                    "12:30","13:00", "13:30", "14:00",
                    "14:30","15:00", "15:30", "16:00",
                ]
                
                {timePM.map((time) => (
                    toggleBgColor(selectedDay,time)
                ))};

            break;
        
            default:
                const timeALL = [
                    "09:00", "09:30", "10:00", "10:30",
                    "11:00", "11:30", "12:00", "12:30",
                    "13:00", "13:30", "14:00", "14:30",
                    "15:00", "15:30", "16:00",
                ];
                {timeALL.map((time) => (
                    toggleBgColor(selectedDay,time)
                ))};

        }
        toggleBgColor(selectedDay,value)
        
    }

    //全体選択
    const timeAll = [
        "午前", "午後", "全日",
    ]

    // 表示する時間の選択肢
    const timeOptions = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00",
    ];

    const daysInMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => (i + 1).toString());
    };
    
    //月を前に１つ戻す
    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };

    //月を後に１つ進める
    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };

    // timeが指定された日付の時間配列に含まれているかを確認する関数
    const isTimeIncluded = (day: string, time: string) => {
        const timeslot = selectedTimes[day];
        return timeslot ? timeslot.includes(time) : false;
    };

    return (
        // カレンダー部分
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
                    <div key={day} className="text-center border-2 h-20 hover:border-cyan-400" onClick={() => {setShowModal(true);setSelectedDay(day);}}>
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

                    <div className="fixed p-10 w-auto h-auto bg-white shadow-xl rounded-xl ">
                        {/* 解除ボタン */}
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-3">
                            <svg
                            className="w-6 h-6 text-4xl"
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
                        <div className="flex justify-between items-start">
                            <span className="font-bold">NG日程追加</span>
                        </div>

                        {/* 一括指定ボタン */}
                        <div className="flex flex-wrap justify-center max-w-4xl my-9">
                            {timeAll.map((time) => (
                                <div
                                    key={time}
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-48 h-16 m-3 font-bold ${
                                    isTimeIncluded(selectedDay,time) ? "bg-gray-400" : "bg-white"
                                    }`}
                                    onClick={() => toggleALL(time)}
                                >
                                    <span>{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* 個別指定ボタン */}
                        <div className="flex flex-wrap justify-center max-w-4xl">
                            {timeOptions.map((time) => (
                                <div
                                    key={time}
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-48 h-16 m-3 font-bold ${
                                    isTimeIncluded(selectedDay,time) ? "bg-gray-400" : "bg-white"
                                    }`}
                                    onClick={() => toggleBgColor(selectedDay,time)}
                                >
                                    <span>{time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : null}
        </div>    
    );
}

export default Home