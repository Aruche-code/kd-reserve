// React モジュールと useState 関数をインポート
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// TeacherItem コンポーネントの定義
interface Teacher {
    id: string;
    name: string;
    seibetu: string;
    tokui: string;
    syumi: string;
    reki: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    index: number;
    onClick: () => void;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, index, onClick }) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    const handleCollapseToggle = () => {
        setIsCollapseOpen((prev) => !prev);
    };

    return (
        <div key={teacher.id} className="w-full mb-2 sm:w-1/2 sm:p-1 md:w-1/3 md:p-1 lg:w-1/6 lg:p-1 xl:w-1/6 xl:p-2">
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
                className="flex items-center justify-between w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100" onClick={() => onClick()}
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
                        <div className="text-xs p-2">{teacher.name}</div>
                    </div>
                    {teacher.name !== '指名なし' && (
                        <>
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
                                                ['性別', teacher.seibetu],
                                                ['得意なこと', teacher.tokui],
                                                ['趣味', teacher.syumi],
                                                ['勤務歴', teacher.reki],
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
                        </>
                    )}
                </div>
            </label>
        </div>
    );
};

// Booking コンポーネントの定義
const Booking = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [showModal, setShowModal] = useState(false);

    const hostingOptions = [
        '面談',
        '履歴書の作成・添削',
        'エントリーシート作成',
        '企業探し',
        '企業の相談',
        'その他',
    ];

    const testTeachars: Teacher[] = [
        {
            id: '601b92ee95861639c3e2c44a',
            name: '田中先生',
            seibetu: '女性',
            tokui: 'スポーツ',
            syumi: '映画鑑賞',
            reki: '4年',
        },
        {
            id: '601b92ee95861639c3e2c44b',
            name: '山本先生',
            seibetu: '男性',
            tokui: 'サッカー',
            syumi: 'サウナ',
            reki: '10年',
        },
        {
            id: '601b92ee95861639c3e2c44c',
            name: '鈴木先生',
            seibetu: '男性',
            tokui: 'フラフープ',
            syumi: 'マラソン',
            reki: '3年',
        },
        {
            id: '601b92ee95861639c3e2c44d',
            name: '小林先生',
            seibetu: '女性',
            tokui: '食べること',
            syumi: '晩酌',
            reki: '7年',
        },
        {
            id: '601b92ee95861639c3e2c44e',
            name: '中村先生',
            seibetu: '女性',
            tokui: 'すぐに寝れる',
            syumi: '旅行',
            reki: '2年',
        },
        {
            id: '601b92ee95861639c3e2c44f',
            name: '高橋先生',
            seibetu: '男性',
            tokui: 'プログラミング',
            syumi: '人間観察',
            reki: '15年',
        },
        {
            id: '601b92ee95861639c3e2c44f',
            name: '指名なし',
            seibetu: '',
            tokui: '',
            syumi: '',
            reki: '',
        }
    ];

    const [showMessageBox, setShowMessageBox] = useState(false);

    const handleCompleteButtonClick = () => {
        setShowMessageBox(true);
    };

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    };

    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            teachername: selectedTeacher ? selectedTeacher.name : '未選択',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00',
            subject: selectedOption,
        }
    ];

    return (
        <div className="w-full h-full font-banana relative p-2">
            <div className="p-2">
                <p className="mb-2 text-1xl">1. 予約内容を選択してください</p>
                <div className="flex flex-row flex-wrap">
                    {hostingOptions.map((option, index) => (
                        <li
                            key={index}
                            className="list-none w-full p-1 sm:w-1/2 sm:p-1 md:w-1/3 lg:w-1/6 lg:p-2 xl:w-1/6 xl:p-2"
                        >
                            <input
                                type="radio"
                                id={`hosting-${index + 1}`}
                                name="hosting"
                                value={`hosting-${index + 1}`}
                                className="hidden peer"
                                required={index === 0 || index === 3}
                                onChange={() => setSelectedOption(option)}
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
            </div>
            <div className="">
                <div className="bg-white p-2">
                    <p className="mb-2 text-1xl">2. 担当教員を選択してください</p>
                    <div className="flex flex-row flex-wrap">
                        {testTeachars.map((teacher, index) => (
                            <TeacherItem key={index} teacher={teacher} index={index}
                                onClick={() => setSelectedTeacher(teacher)} />))}
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className=" p-2">
                    <p className="mb-2 text-1xl">3. 日時を選択してください</p>
                    <div className="flex flex-row flex-wrap w-full">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="flex flex-col w-full md:w-auto border border-gray-200 rounded-lg p-2 m-1">
                                <div className="">
                                    <p className="p-2 text-xs mb-1 text-gray-500">{`第${index}希望を選択してください`}</p>
                                    <div className="mb-3">
                                        <select className="p-1 text-xs px-4 bg-gray-100 border-transparent rounded-lg">
                                            <option value=""></option>
                                            {Array.from({ length: 12 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                        <label className="ms-2 me-2 text-xs text-gray-900">月</label>
                                        <select className="p-1 text-xs px-4 bg-gray-100 border-transparent rounded-lg">
                                            <option value=""></option>
                                            {Array.from({ length: 31 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                        <label className="ms-2 text-xs text-gray-900">日</label>
                                    </div>
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

            <div className="flex justify-end px-3">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="rounded-lg border border-primary-500 bg-green-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
                >
                    確認
                </button>
            </div>

            {showModal ? (
                <>
                    <div className="bg-white h-full flex justify-center items-center absolute top-0 left-0 w-full">
                        <div className="bg-white border-4 border-blue-400 rounded-lg shadow-sm w-1/2 p-2 text-xs md:text-base ">
                            {testUsers.map(user => (
                                <div className="p-2 px-2" key={user.id}>
                                    <div className="flex justify-center items-center">
                                        <h2 className="text-gray-400 font-bold mb-2">予約内容確認</h2>
                                    </div>
                                    <table className="w-full">
                                        <tbody className="border rounded-xl border-gray-400 text-center">
                                            <tr className="border-b border-gray-400">
                                                <td className="border-r border-gray-400 p-3">内容</td>
                                                <td className="p-3">{user.subject}</td>
                                            </tr>
                                            <tr className="border-b border-gray-400">
                                                <td className="border-r border-gray-400 p-3">担当教員</td>
                                                <td className="p-3">{user.teachername}</td>
                                            </tr>
                                            <tr className="border-b border-gray-400">
                                                <td className="border-r border-gray-400 p-3">予約日時（第1希望）</td>
                                                <td className="p-3">{user.day1} {user.time1}</td>
                                            </tr>
                                            <tr className="border-b border-gray-400">
                                                <td className="border-r border-gray-400 p-3">予約日時（第2希望）</td>
                                                <td className="p-3">{user.day2} {user.time2}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-r border-gray-400 p-3">予約日時（第3希望）</td>
                                                <td className="p-3">{user.day3} {user.time3}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="flex justify-between pt-5">
                                        <Link href="../dev/booking">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                type="button" className="rounded-lg border border-primary-500 bg-red-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white">
                                                戻る
                                            </button>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleCompleteButtonClick}
                                            className="rounded-lg border border-primary-500 bg-green-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
                                        >
                                            完了
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* メッセージボックスが表示されるときに表示する部分 */}
                        {showMessageBox && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <div className="bg-blue-500 p-4 flex flex-col rounded-lg">
                                    <p className='text-white'>予約完了</p>
                                    <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                                        <p>予約リクエストを送信しました。<br />
                                            予約の確定はホーム画面からご確認お願いします。<br />
                                            <a className="underline decoration-wavy decoration-red-400">当日は、学生証の持参と時間厳守でお願いします。</a>
                                        </p>
                                        <div className="flex justify-end mt-4">
                                            <Link href="../dev/homest">
                                                <button
                                                    // onClick={handleCloseMessageBox}
                                                    className="rounded-lg border border-primary-500 bg-red-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white"
                                                >
                                                    閉じる
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Booking;
