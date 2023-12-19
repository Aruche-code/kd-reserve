"use client";

import React, { useState } from "react";
import Link from "next/link";

interface YourComponentProps {
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
    }[];
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
    }[];
}

const YourComponent: React.FC<YourComponentProps> = ({ testUsers, testUsers2 }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedTimes, setSelectedTimes] = useState<string[]>(["", "", ""]);

    const handleTimeChange = (index: number, selectedTime: string) => {
        setSelectedTimes((prevTimes) => {
            const newTimes = [...prevTimes];
            newTimes[index] = selectedTime;
            return newTimes;
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const selectedData = selectedOption === "firstChoice" ? testUsers : testUsers2;

    

    return (
        <div className="flex flex-col">
            <label>
                <div className="flex flex-row items-start">
                    <input
                        type="radio"
                        value="firstChoice"
                        checked={selectedOption === "firstChoice"}
                        onChange={handleRadioChange}
                    />
                    {selectedData.map((user, index) => (
                        <div key={user.id} className="flex flex-row ml-2 mb-2 border-2 border-gray-300 rounded-lg">
                            <span className="flex flex-col mx-2 p-2 text-xs text-gray-500">第1希望</span>
                            <div className="flex flex-col">
                                <div className="m-1">{user.day1}</div>
                                <div>
                                    <div className="m-4">
                                        <div className="flex flex-row justify-center ">
                                            {[1, 2].map((part) => (
                                                <React.Fragment key={part}>
                                                    <div className="bg-white w-full">
                                                        <select
                                                            className="py-1 px-3 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            defaultValue={selectedTimes[index]}  // ここで value を指定
                                                            onChange={(e) => handleTimeChange(index, e.target.value)}  // ここで onChange ハンドラを指定
                                                        >
                                                            <option value="" disabled >
                                                                選択する
                                                            </option>
                                                            {Array.from({ length: 18 }, (_, hour) => {
                                                                const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                const formattedTime = timeValue.toLocaleTimeString("ja-JP", {
                                                                    hour12: false,
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
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
                                                        <div className="bg-white text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 flex justify-center">
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
                    ))}
                </div>
            </label >


            <label>
                <div className="flex flex-row items-start">
                    <input
                        type="radio"
                        value="secondChoice"
                        checked={selectedOption === "secondChoice"}
                        onChange={handleRadioChange}
                    />
                    {selectedData.map((user) => (
                        <div className="flex flex-row ml-2 mb-2 border-2 border-gray-300 rounded-lg" key={user.id}>
                            <span className="flex flex-col mx-2 p-2 text-xs text-gray-500">第2希望</span>
                            <div className="flex flex-col">
                                <div className="m-1">{user.day2}</div>
                                <div>
                                    <div className="m-4">
                                        <div className="flex flex-row justify-center ">
                                            {[1, 2].map((part) => (
                                                <React.Fragment key={part}>
                                                    <div className="bg-white w-full">
                                                        <select
                                                            className="py-1 px-3 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
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
                                                        <div className="bg-white text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 flex justify-center">
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
                    ))}
                </div>
            </label>
            <label>
                <div className="flex flex-row items-start">
                    <input
                        type="radio"
                        value="thirdChoice"
                        checked={selectedOption === "thirdChoice"}
                        onChange={handleRadioChange}
                    />
                    {selectedData.map((user) => (
                        <div className="flex flex-row ml-2 mb-2 border-2 border-gray-300 rounded-lg" key={user.id}>
                            <span className="flex flex-col mx-2 p-2 text-xs text-gray-500">第3希望</span>
                            <div className="flex flex-col">
                                <div className="m-1">{user.day3}</div>
                                <div>
                                    <div className="m-4">
                                        <div className="flex flex-row justify-center ">
                                            {[1, 2].map((part) => (
                                                <React.Fragment key={part}>
                                                    <div className="bg-white w-full">
                                                        <select
                                                            className="py-1 px-3 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
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
                                                        <div className="bg-white text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 flex justify-center">
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
                    ))}
                </div>
            </label>
        </div >
    );
};



const Waiting = () => {
    //モーダルウィンドウ
    const [showModal, setShowModal] = useState(false);


    const testUsers = [
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
                                onClick={() => setShowModal(true)}
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
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                        onClick={() => setShowModal(false)}>
                    </div>

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
                        <YourComponent testUsers={testUsers} testUsers2={testUsers2} />

                    </div>
                </>
            ) : null}

            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-orange-300 p-2 mx-4 border-4 border-orange-300 rounded-lg text-white">
                    指名なし
                </div>
                {testUsers2.map(user => (
                    <div className="mt-2">
                        <Link href="" key={user.id}>
                            <div className="flex items-center justify-center">
                                <button onClick={() => setShowModal(true)}
                                    className="mt-5 p-3 w-5/6 border-2 border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-orange-200">
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
                    <div
                        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
                        onClick={() => setShowModal(false)}>
                    </div>

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


                        <YourComponent testUsers={testUsers} testUsers2={testUsers2} />

                    </div>
                </>
            ) : null}
        </div>

    );

}

export default Waiting;