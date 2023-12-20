//トップレベルの予約ページコンポーネント
"use client";
import React, { useState , useEffect} from 'react';
import Calendar from './Calendar';
import CloseButton from './CloseButton';

const Home = () => {
    // オブジェクトの比較ロジック
    function isObjectEqual(obj1:any, obj2:any) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }


    //------------------------------------------------------------------//
    //Calender用関数
    const [date, setDate] = useState(new Date());

    //日付の取得
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

    //選ばれている日
    const [selectedDay, setselectedDay] = useState<string>("1");

    //NG日程の選択状況
    const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string[] }>({});
        // selectedTimes の変化を監視
        useEffect(() => {
            // 空になったキーを検出して削除
            const updatedSelectedTimes = Object.fromEntries(
            Object.entries(selectedTimes).filter(([key, value]) => value.length > 0)
            );

            if (!isObjectEqual(selectedTimes, updatedSelectedTimes)) {
                setSelectedTimes(updatedSelectedTimes);
            }
        }, [selectedTimes]); // selectedTimes が変化したときに実行

        //NG日程テストデータ
        useEffect(() => {
            const ngdays = { "2023-12-14": ["11:30", "12:00", "14:00", "13:30"], "2023-12-5": ["11:30", "13:30"] };
            setSelectedTimes(ngdays);
        }, []); 

    //面談の選択状況
    const [interview, setInterview] = useState<{ [key: string]: string[] }>({});
        useEffect(() => {
            // 空になったキーを検出して削除
            const updatedInterview = Object.fromEntries(
                Object.entries(interview).filter(([key, value]) => value.length > 0)
            );

            // interview が変更された場合のみ更新
            if (!isObjectEqual(interview, updatedInterview)) {
                setInterview(updatedInterview);
            }
        }, [interview]); // interview が変化したときに実行

        //面談状況テストデータ
        useEffect(() => {
            const inter = { "2023-12-12": ["11:30", "12:00", "14:00", "13:30"], "2023-12-6": ["11:30", "13:30"] };
            setInterview(inter);
        }, []); 

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

    //時間の範囲指定
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
    

    // timeが指定された日付の時間配列に含まれているかを確認する関数
    const isTimeIncluded = (day: string, time: string) => {
        const timeslot = selectedTimes[day];
        return timeslot ? timeslot.includes(time) : false;
    };

     //日付のみを取り枝素処理
    const extraday = (date: string) => {
        const parts = date.split("-"); // ハイフンで文字列を区切る
        const lastPart = parts[parts.length - 1]; // 配列の最後の要素を取得
        return lastPart;
    }

    //モーダルウィンドウ
    const [showModal, setShowModal] = useState(false);      //topモーダル
    const [NgModal, setNgModal] = useState(false);  //ngモーダルウィンドウ
    const [InterModal, setInterModal] = useState(false); //面接日程確認モーダル

    return (
        // カレンダー部分
        <div className="flex h-auto w-full justify-center items-center">
            <div className="ml-8 mt-0 w-10/12 pr-5">
                <div>
                    <Calendar 
                        date={date}
                        setDate={setDate} 
                        daysInMonth={daysInMonth}
                        prevMonth={prevMonth}
                        nextMonth={nextMonth} 
                        setShowModal={setShowModal}
                        setselectedDay={setselectedDay}
                        interview={interview}
                        selectedTimes={selectedTimes}
                    />
                </div>
            </div>
            

            {/* モーダルウィンドウ */}
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="fixed p-8 w-auto h-auto bg-white shadow-xl rounded-xl">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        
                        <div className="flex">
                            <div 
                            className="bg-red-400 hover:bg-red-300 text-white font-bold flex items-center justify-center p-5 rounded-lg text-center m-5 h-36 w-36"
                            onClick={() => setNgModal(true)}  
                            >
                            NG日程追加
                            </div>

                            <div
                            className="bg-blue-400 hover:bg-blue-300 text-white font-bold flex items-center justify-center p-5 rounded-lg text-center m-5 h-36 w-36"
                            onClick={() => setInterModal(true)}
                            >
                            予定の確認
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {NgModal ? (
                <>
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                        onClick={() => setNgModal(false)}
                    ></div>

                    <div className="fixed p-8 w-auto h-auto bg-white shadow-xl rounded-xl ">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        <div className="flex justify-between items-start">
                            <span className="font-bold">NG日程追加</span>
                        </div>

                        {/* 一括指定ボタン */}
                        <div className="flex flex-wrap justify-center max-w-3xl my-6">
                            {timeAll.map((time) => (
                                <div
                                    key={time}
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-36 h-12 m-3 font-bold ${
                                    isTimeIncluded(selectedDay,time) ? "bg-gray-400" : "bg-white"
                                    }`}
                                    onClick={() => toggleALL(time)}
                                >
                                    <span>{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* 個別指定ボタン */}
                        <div className="flex flex-wrap justify-center max-w-3xl">
                            {timeOptions.map((time) => (
                                <div
                                    key={time}
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-32 h-11 m-3 font-bold ${
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
            {InterModal ? (
                <>
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                        onClick={() => setInterModal(false)}
                    ></div>

                    <div className="fixed p-8 w-auto h-auto bg-white shadow-xl rounded-xl ">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        <div className="flex flex-col items-center">
                            <span className="font-bold relative mb-4">面談予定</span>
                            <div className="flex flex-col p-4">
                                <div className="mx-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">
                                    <div className="w-1/3 px-8 flex items-center justify-center">
                                        <div className="text-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                            13:30~14:00
                                        </div>
                                    </div>
                                    <div className="w-1/3 border-x-2 border-gray-200 px-8">
                                        <div className="text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                            1298533<br />
                                            山本弘樹
                                        </div>
                                    </div>
                                    <div className="w-1/3 px-4 flex items-center justify-center">
                                        <div className="text-center font-medium text-sm">
                                            エントリーシート
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            ) : null}
        </div>    
    );
}

export default Home