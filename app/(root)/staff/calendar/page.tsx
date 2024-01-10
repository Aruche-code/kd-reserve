//トップレベルの予約ページコンポーネント
"use client";
import React, { useState , useEffect} from 'react';
import Calendar from './Calendar';
import MbCalendar from './MobileCalendar';
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
    const getDay = () => {
        return selectedDay.slice(-2);
    }

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

    //テストデータ
    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベタロウ',
            name: '神戸太郎',
            gakuseki: '1111111',
            day: '2023/12/3',
            time: '10:00~12:00',
            subject: '面接練習'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベジロウ',
            name: '神戸次郎',
            gakuseki: '2222222',
            day: '2023/12/3',
            time: '13:00~14:00',
            subject: 'エントリーシート作成'
        },
    ];

    //モーダルウィンドウ
    const [showModal, setShowModal] = useState(false);      //topモーダル
    const [NgModal, setNgModal] = useState(false);  //ngモーダルウィンドウ
    const [InterModal, setInterModal] = useState(false); //面接日程確認モーダル

    //右サイドバー
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('ng');

    const handleTabClick = (tab: any) => {
        setSelectedTab(tab);
    };

    const PcCalendar = () => (
        <>
            {/* カレンダー部分 */}
            <div className="flex h-auto w-full justify-center items-center">
                <div className="ml-2 mt-0 w-11/12 pr-2">
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
                            setOpen={setOpen}
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
                            <div className="text-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mb-2 border border-blue-700 rounded">
                                    保存
                                </button>
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
                                    {testUsers.map(user => (
                                    <div className="mx-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row mb-6">
                                        <div className="w-1/3 px-8 flex items-center justify-center">
                                            <div className="text-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                {user.time}
                                            </div>
                                        </div>
                                        <div className="w-1/3 border-x-2 border-gray-200 px-8">
                                            <div className="text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                {user.gakuseki}<br />
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="w-1/3 px-4 flex items-center justify-center">
                                            <div className="text-center font-medium text-sm">
                                                {user.subject}
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div> 

            {open ? (
                <>
                    <div className=" w-3/12 h-full">
                    </div>
                    <div className=" w-3/12 h-full border-l-2 border-gray-300 fixed right-0">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                            setOpen={setOpen}
                        />
                        <div className="text-3xl ml-3 mt-2">{selectedDay.length === 9 ? selectedDay.slice(-2) : selectedDay.slice(-1)}日</div>
                        <div className="h-auto w-full mt-3">
                        <ul className="flex flex-wrap">
                            <li onClick={() => handleTabClick('ng')}className={`w-1/2  p-1 text-center cursor-pointer rounded-l-lg shadow-lg border ${selectedTab === 'ng' ? 'border-sky-700 bg-sky-700 text-white' : 'border-gray-200 bg-gray-50'}`}>
                            NG日程
                            </li>
                            <li  onClick={() => handleTabClick('book')} className={`w-1/2  p-1 text-center cursor-pointer rounded-r-lg shadow-lg border${selectedTab === 'book' ? 'border-sky-700 bg-sky-700 text-white' : 'border-gray-200 bg-gray-50'}`}>
                            予定一覧
                            </li>
                        </ul>
                        <div className="mt-4 p-4">
                            {selectedTab === 'ng' && 
                                <div className="fixed p-1 w-auto h-auto bg-white">

                                    {/* 一括指定ボタン */}
                                    <div className="flex flex-wrap justify-center max-w-xl mb-2">
                                        {timeAll.map((time) => (
                                            <div
                                                key={time}
                                                className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-16 h-10 m-2 font-bold ${
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
                                                className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-16 h-10 m-2 font-bold ${
                                                isTimeIncluded(selectedDay,time) ? "bg-gray-400" : "bg-white"
                                                }`}
                                                onClick={() => toggleBgColor(selectedDay,time)}
                                            >
                                                <span>{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mb-2 border border-blue-700 rounded">
                                            保存
                                        </button>
                                    </div>
                                </div>
                            }
                            {selectedTab === 'book' && 
                                <div className="p-2 w-auto h-auto">
                                    <div className="flex flex-col items-center">
                                        {testUsers.map(user => (
                                            <div className="flex flex-col p-4">
                                                <div className="mx-4 p-1 pb-5 border-b-2 border-gray-200">
                                                    <div className="text-center font-medium text-sm">
                                                            {user.subject}
                                                    </div>
                                                    <div className="flex flex-row">
                                                        <div className="w-1/2 px-8 flex items-center justify-center">
                                                            <div className="text-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                                {user.time}
                                                            </div>
                                                        </div>
                                                        <div className="w-1/2 border-l-2 border-gray-200 px-8">
                                                            <div className="text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                                {user.gakuseki}<br />
                                                                {user.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
            
                                    </div>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>  
    );

    const MobileCalendar = () => (
        <div className="flex h-auto w-full justify-center items-center">
            <div className=" mt-20 w-full">
                <div>
                    <MbCalendar 
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

                    <div className="fixed p-4 w-auto h-auto bg-white shadow-xl rounded-xl mt-24">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        
                        <div className="flex flex-col">
                            <div 
                            className="bg-red-400 hover:bg-red-300 text-white font-bold flex items-center justify-center p-5 rounded-lg text-center m-5 h-14 w-36"
                            onClick={() => setNgModal(true)}  
                            >
                            NG日程追加
                            </div>

                            <div
                            className="bg-blue-400 hover:bg-blue-300 text-white font-bold flex items-center justify-center p-5 rounded-lg text-center m-5 h-14 w-36"
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

                    <div className="fixed p-8 w-auto h-auto bg-white shadow-xl rounded-xl mt-20">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        <div className="flex justify-between items-start">
                            <span className="font-bold">NG日程追加</span>
                        </div>

                        {/* 一括指定ボタン */}
                        <div className="flex flex-wrap justify-center max-w-xl my-4">
                            {timeAll.map((time) => (
                                <div
                                    key={time}
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-16 h-10 m-2 font-bold ${
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
                                    className={`border border-black hover:border-gray-400 rounded-lg flex items-center justify-center w-16 h-10 m-2 font-bold ${
                                    isTimeIncluded(selectedDay,time) ? "bg-gray-400" : "bg-white"
                                    }`}
                                    onClick={() => toggleBgColor(selectedDay,time)}
                                >
                                    <span>{time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mb-2 border border-blue-700 rounded">
                                保存
                            </button>
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

                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 w-auto h-auto bg-white shadow-xl rounded-xl z-50 ">
                        <CloseButton 
                            setShowModal={setShowModal}
                            setNgModal={setNgModal}
                            setInterModal={setInterModal}
                        />
                        <div className="flex flex-col items-center">
                            <span className="font-bold relative mb-4">面談予定</span>
                            {testUsers.map(user => (
                                <div className="flex flex-col p-4">
                                    <div className="mx-4 p-2 border-2 border-gray-400 rounded-lg">
                                        <div className="text-center font-medium text-sm">
                                                {user.subject}
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="w-1/2 px-8 flex items-center justify-center">
                                                <div className="text-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                    {user.time}
                                                </div>
                                            </div>
                                            <div className="w-1/2 border-l-2 border-gray-200 px-8">
                                                <div className="text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                                                    {user.gakuseki}<br />
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );

    return (
        <>
            {/* モバイル向けナビゲーションバー（mdブレークポイント以下でのみ表示） */}
            <div className="md:hidden h-full">{MobileCalendar()}</div>
        
            {/* デスクトップ向けサイドバー（mdブレークポイント以上でのみ表示） */}
            <div className="hidden md:flex h-full">{PcCalendar()}</div>
        </>
    );
}

export default Home