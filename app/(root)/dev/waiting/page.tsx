"use client";

import React, { useState } from "react";
import Link from "next/link";

interface selectedUser {

    testUsers: {
        id: string;
        kana: string;
        name: string;
        day1: string;
        time1: string;
        day2: string;
        time2: string;
        day3: string;
        time3: string;

    };
    testUsers2: {
        id: string;
        kana: string;
        name: string;
        day1: string;
        time1: string;
        day2: string;
        time2: string;
        day3: string;
        time3: string;
    };
}

const selectedUser: React.FC<selectedUser> = ({ testUsers, testUsers2 }) => {

    // 選択されたオプションと時間を管理するためのState
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedTimes, setSelectedTimes] = useState<string[]>(["", "", ""]);

    // 選択された時間を更新するハンドラ
    const handleTimeChange = (index: number, selectedTime: string) => {
        setSelectedTimes((prevTimes) => {
            const newTimes = [...prevTimes];
            newTimes[index] = selectedTime;
            return newTimes;
        });
    };

    // 選択されたオプションを更新するハンドラ
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    // 選択されたオプションに基づいて使用するデータセットを判断
    const selectedData = selectedOption === "firstChoice" ? testUsers : testUsers2;



    return (
        <div className="">

        </div >
    );
};



const Waiting = () => {
    //モーダルウィンドウ
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    // ユーザーの型を定義
    interface User {
        id: string;
        kana: string;
        name: string;
        day1: string;
        time1: string;
        day2: string;
        time2: string;
        day3: string;
        time3: string;
    }
    const [nowuser, setNowUser] = useState<User | null>(null);


    const testUsers: User[] = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベタロウ',
            name: '神戸太郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベジロウ',
            name: '神戸次郎',
            day1: '2023/12/5',
            time1: '10:00~12:00',
            day2: '2023/12/6',
            time2: '10:00~12:00',
            day3: '2023/12/7',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベサブロウ',
            name: '神戸三郎',
            day1: '2023/12/8',
            time1: '10:00~12:00',
            day2: '2023/12/9',
            time2: '10:00~12:00',
            day3: '2023/12/10',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベシロウ',
            name: '神戸四郎',
            day1: '2023/12/11',
            time1: '10:00~12:00',
            day2: '2023/12/12',
            time2: '10:00~12:00',
            day3: '2023/12/13',
            time3: '10:00~13:00'
        }
    ];
    const testUsers2 = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベゴロウ',
            name: '神戸五郎',
            day1: '2023/12/14',
            time1: '10:00~12:00',
            day2: '2023/12/15',
            time2: '10:00~12:00',
            day3: '2023/12/16',
            time3: '10:00~13:00'
        },
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベロクロウ',
            name: '神戸六郎',
            day1: '2023/12/17',
            time1: '10:00~12:00',
            day2: '2023/12/18',
            time2: '10:00~12:00',
            day3: '2023/12/19',
            time3: '10:00~13:00'
        }
    ];


    return (
        <div className="flex flex-wrap text-xs md:text-base">
            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-blue-400 p-2 mx-4 border-4 border-blue-400 rounded-lg text-white">
                    指名あり
                </div>
                {testUsers.map(user => (
                    <div className="mt-2">
                        <Link href="" key={user.id}>
                            <div
                                onClick={() => [setShowModal(true), setNowUser(user)]}
                                className="flex items-center justify-center"
                            >
                                <button type="button" className="mt-5 p-3 w-5/6 border-2 border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-blue-300">
                                    <div className="text-base md:text-xl">
                                        {user.name}<br />
                                    </div>

                                    1.　{user.day1}　{user.time1}<br />
                                    2.　{user.day2}　{user.time2}<br />
                                    3.　{user.day3}　{user.time3}<br />

                                </button>

                            </div>

                        </Link>
                    </div>
                ))}

            </div>
            {showModal ? (
                <>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="" key={nowuser!.id}>
                            <div className="flex justify-center items-center">
                                <div
                                    className="fixed inset-0 bg-gray-600 bg-opacity-70 transition-opacity"
                                    onClick={() => setShowModal(false)}>
                                </div>

                                <div className="fixed px-10 py-2 w-auto h-auto bg-white shadow-xl rounded-xl ">
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
                                    {/* ラジオボタン */}
                                    <div className="flex flex-col">
                                        <div className="mb-5 text-xl text-gray-500">予約確定申請</div>
                                        <div>{nowuser!.name}</div>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm mb-2">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第1希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day1}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm mb-2">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第2希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day2}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第3希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day3}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button" className="rounded-lg bg-green-300 my-2 px-3 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">
                                            申請
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : null}

            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-orange-400 p-2 mx-4 border-4 border-orange-400 rounded-lg text-white">
                    指名なし
                </div>
                {testUsers2.map(user => (
                    <div className="mt-2">
                        <Link href="" key={user.id}>
                            <div
                                onClick={() => [setShowModal2(true), setNowUser(user)]}
                                className="flex items-center justify-center"
                            >
                                <button type="button" className="mt-5 p-3 w-5/6 border-2 border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-blue-300">
                                    <div className="text-base md:text-xl">
                                        {user.name}<br />
                                    </div>

                                    1.　{user.day1}　{user.time1}<br />
                                    2.　{user.day2}　{user.time2}<br />
                                    3.　{user.day3}　{user.time3}<br />

                                </button>

                            </div>

                        </Link>
                    </div>
                ))}

            </div>
            {showModal2 ? (
                <>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="" key={nowuser!.id}>
                            <div className="flex justify-center items-center">
                                <div
                                    className="fixed inset-0 bg-gray-600 bg-opacity-70 transition-opacity"
                                    onClick={() => setShowModal2(false)}>
                                </div>

                                <div className="fixed px-10 py-2 w-auto h-auto bg-white shadow-xl rounded-xl ">
                                    {/* 解除ボタン */}
                                    <button onClick={() => setShowModal2(false)} className="absolute top-3 right-3">
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
                                    {/* ラジオボタン */}
                                    <div className="flex flex-col">
                                        <div className="mb-5 text-xl text-gray-500">予約確定申請</div>
                                        <div>{nowuser!.name}</div>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm mb-2">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第1希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day1}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm mb-2">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第2希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day2}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="text-gray-700 flex items-start">
                                            <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                            <div className="px-5 border-2 border-gray-300 rounded-lg hover:border-blue-500 shadow-sm">
                                                <span className="flex flex-col p-2 text-xs text-gray-500">第3希望</span>
                                                <div className="flex flex-col">
                                                    <div className="m-1 mb-2 text-gray-500">
                                                        {nowuser!.day3}
                                                    </div>
                                                    <div className="flex flex-row flex-wrap w-full">
                                                        <div className="">
                                                            <div className="flex flex-row justify-center ">
                                                                {[1, 2].map((part) => (
                                                                    <React.Fragment key={part}>
                                                                        <div className="mb-2 w-full">
                                                                            <select
                                                                                className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                defaultValue=""
                                                                            >
                                                                                <option value="" disabled >
                                                                                    選択する
                                                                                </option>
                                                                                {Array.from({ length: 18 }, (_, hour) => {
                                                                                    const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                    const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                        hour12: false,
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                    });

                                                                                    return (
                                                                                        <option key={hour} value={formattedTime}>
                                                                                            {formattedTime}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        {part === 1 && (
                                                                            <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                <p>～</p>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button" className="rounded-lg bg-green-300 my-2 px-3 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">
                                            申請
                                        </button>
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

export default Waiting;