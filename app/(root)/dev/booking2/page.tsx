"use client";
import React, { useState } from 'react';
import Link from 'next/link';


const Booking2= () => {
    const [showMessageBox, setShowMessageBox] = useState(false);

    const handleCompleteButtonClick = () => {
        setShowMessageBox(true);
    };

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    };

    return (

    <div className="h-screen flex justify-center items-center">
        <div className="bg-white border-4 border-blue-400 rounded-lg shadow-sm w-1/2 p-2 text-xs md:text-base ">
            <div className="p-2 px-2 ">
                <table className="w-full">
                    <thead className="">
                        <tr className="">
                            <th className="w-1/2 text-gray-300">内容</th>
                            <th className="w-1/2 text-gray-300">詳細</th>
                        </tr>
                    </thead>
                        <tbody className="border rounded-xl border-gray-400 text-center">
                            <tr className="border-b border-gray-400">
                                <td className="border-r border-gray-400 p-3">面接</td>
                                <td className="p-3">面接練習</td>
                            </tr>
                            <tr className="border-b border-gray-400">
                                <td className="border-r border-gray-400 p-3">担当教員</td>
                                <td className="p-3">〇〇先生</td>
                            </tr>
                            <tr className="border-b border-gray-400">
                                <td className="border-r border-gray-400 p-3">予約日時（第1希望）</td>
                                <td className="p-3">10/12 13:00</td>
                            </tr>
                            <tr className="border-b border-gray-400">
                                <td className="border-r border-gray-400 p-3">予約日時（第2希望）</td>
                                <td className="p-3">10/12 13:00</td>
                            </tr>
                            <tr>
                                <td className="border-r border-gray-400 p-3">予約日時（第3希望）</td>
                                <td className="p-3">10/12 13:00</td>
                            </tr>
                        </tbody>
                </table>
                <div className="flex justify-between pt-5">
                        <Link href="../dev/booking">
                            <button type="button" className="rounded-lg border border-primary-500 bg-red-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white">
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
        </div>

            {/* メッセージボックスが表示されるときに表示する部分 */}
            {showMessageBox && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-blue-500 p-4 flex flex-col rounded-lg">
                        <p className='text-white'>予約完了</p>
                        <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                        <p>予約リクエストを送信しました。<br />
                            予約の確定はホーム画面からご確認お願いします。<br/>
                            <a className="underline decoration-wavy decoration-red-400">当日は、学生証の持参と時間厳守でお願いします。</a>
                        </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleCloseMessageBox}
                                    className="rounded-lg border border-primary-500 bg-red-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white"
                                >
                                閉じる
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
)}

            </div>
        
      
        );
    }
    
    export default Booking2 