// React モジュールと useState 関数をインポート
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// TeacherItem コンポーネントの定義
interface TeacherItemProps {
    index: number;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ index }) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    const handleCollapseToggle = () => {
        setIsCollapseOpen((prev) => !prev);
    };

    if (index !== 6) { 
        
    }
    else{
        
    }


    return (
        <div className="w-full mb-2 sm:w-1/2 sm:p-1 md:w-1/3 md:p-1 lg:w-1/6 lg:p-1 xl:w-1/6 xl:p-2">
            <input
                type="radio"
                id={`t-${index + 1}`}
                name="teacher"
                value={`t-${index + 1}`}
                className="hidden peer"
                required
            />
            <label
                htmlFor={`t-${index + 1}`}
                className="flex items-center justify-between w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
                <div className="w-full text-lg">
                    <div className="flex flex-row justify-between items-center">
                        <div className="bg-gray-100 flex items-center justify-center h-10 w-10 rounded-full">
                            <svg
                                className="h-1/2 w-1/2 text-secondary-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                            </svg>
                        </div>
                        <div className="text-xs p-2">{`先生 ${index + 1}`}</div>
                    </div>
                    <button
                        type="button"
                        className="hs-collapse-toggle px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-sm bg-gray-200 text-gray-400 hover:bg-blue-500"
                        onClick={handleCollapseToggle}
                        aria-expanded={isCollapseOpen}
                        aria-controls={`hs-basic-collapse-heading-${index}`}
                    >
                        詳細
                        <svg
                            className={`hs-collapse-open:${isCollapseOpen ? 'rotate-180' : ''} flex-shrink-0 w-4 h-4 text-white`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                    <div
                        id={`hs-basic-collapse-heading-${index}`}
                        className={`hs-collapse ${isCollapseOpen ? '' : 'hidden'} w-full overflow-hidden transition-[height] duration-300`}
                        aria-labelledby={`hs-basic-collapse-${index}`}
                    >
                        <div className="text-center bg-gray-50 w-full border rounded-lg mt-2">
                            <table className="w-full divide-gray-200">
                                <thead>
                                    {[
                                        ['性別', '女性'],
                                        ['得意なこと', 'スポーツ'],
                                        ['趣味', '映画鑑賞'],
                                        ['勤務歴', '4年'],
                                    ].map(([label, value], i) => (
                                        <tr key={i}>
                                            <td className="border border-slate-200 text-xs">{label}</td>
                                            <td className="border border-slate-200 text-xs">{value}</td>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
};

// Booking コンポーネントの定義
const Booking = () => {
    const hostingOptions = [
        '面談',
        '履歴書の作成・添削',
        'エントリーシートの作成',
        '企業探し',
        '企業の相談',
        'その他',
    ];

    return (
        <div className="w-full h-screen font-banana p-2">
            <p className="mt-0 mb-2 text-1xl">1. 予約内容を選択してください</p>
            <div className="flex flex-row p-2 flex-wrap">
                {hostingOptions.map((option, index) => (
                    <li
                        key={index}
                        className="list-none mb-2 w-full sm:w-1/2 sm:p-1 md:w-1/3 lg:w-1/6 lg:p-2 xl:w-1/6 xl:p-2"
                    >
                        <input
                            type="radio"
                            id={`hosting-${index + 1}`}
                            name="hosting"
                            value={`hosting-${index + 1}`}
                            className="hidden peer"
                            required={index === 0 || index === 3}
                        />
                        <label
                            htmlFor={`hosting-${index + 1}`}
                            className={`inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                        >
                            <div className="block">
                                <div className="text-xs">{option}</div>
                            </div>
                        </label>
                    </li>
                ))}
            </div>

            <div className="">
                <div className="bg-white p-2">
                    <p className="mb-3 text-1xl">2. 担当教員を選択してください</p>
                    <div className="flex flex-row flex-wrap">
                        {[...Array(7)].map((_, index) => (
                            <TeacherItem key={index} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className=" p-2">
                    <p className="mb-3 text-1xl">3. 日時を選択してください</p>
                    <div className="flex flex-row flex-wrap w-full">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="flex flex-col w-full md:w-auto border border-gray-200 rounded-lg p-2 m-1">
                                <div className="">
                                    <p className="p-2 text-xs mb-4 text-gray-500">{`第${index}希望を選択してください`}</p>
                                </div>
                                <div className="">
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
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end px-3 py-4">
                <Link href="../dev/booking2">
                    <button
                        type="button"
                        className="rounded-lg border border-primary-500 bg-green-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
                    >
                        確認
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Booking;
