"use client";
import React, { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Booking= () => {

    const [date, setDate] = useState(new Date());

    const daysInWeek = ['日', '月', '火', '水', '木', '金', '土'];

    const daysInMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const days = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from({ length: days + firstDayOfWeek }, (_, i) => {
            if (i < firstDayOfWeek) {
                return null; // 空白のセル
            }
            return i - firstDayOfWeek + 1;
        });
        return daysArray;
    };

    // 月を前に１つ戻す
    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };

    // 月を後に１つ進める
    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };
    

    return (
        <div className='w-full h-screen bg-white'>
        <div className="flex flex-wrap -mx-2">
            


            {/* <!-- Side container --> */}
                <div className="w-full lg:w-1/2 px-2">
                    <div className="flex flex-col -mx-2">
                        <div className="px-2 mb-4">
                            <div className="bg-white p-4">
						        {/* 内容 */}
                                <h1 className="mt-1 mb-3">1. 予約内容を選択してください</h1>
                                <div className="flex flex-wrap -mx-2">

                                <ul className="grid w-full gap-6 md:grid-cols-3">
                                    <li>
                                        <input type="radio" id="hosting-1" name="hosting" value="hosting-1" className="hidden peer" required />
                                            <label htmlFor="hosting-1" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">面談</div>
                                                </div>
                                            </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="hosting-2" name="hosting" value="hosting-2" className="hidden peer" />
                                            <label htmlFor="hosting-2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">履歴書の作成・添削</div>
                                                </div>
                                                            
                                            </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="hosting-3" name="hosting" value="hosting-3" className="hidden peer" />
                                            <label htmlFor="hosting-3" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">エントリーシートの作成</div>
                                                </div>
                                                    
                                            </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="hosting-4" name="hosting" value="hosting-1" className="hidden peer" required />
                                            <label htmlFor="hosting-4" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">企業探し</div>
                                                </div>
                                            </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="hosting-5" name="hosting" value="hosting-1" className="hidden peer" required />
                                            <label htmlFor="hosting-5" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">企業の相談</div>
                                                </div>
                                            </label>
                                    </li>
                                    <li>
                                    <li>
                                        <input type="radio" id="hosting-6" name="hosting" value="hosting-1" className="hidden peer" required />
                                            <label htmlFor="hosting-6" className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">0-50 MB</div>
                                                </div>
                                            </label>
                                    </li>

                                    </li>
                                </ul>
                                </div>
                                
                                
				            </div>
                        </div>
                        
                        <div className="px-2 mb-1">
                            <div className="bg-white p-4">
						        {/* 内容 */}
                                <h1 className="mb-3">2. 担当教員を選択してください</h1>
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-blue-400 hover:text-gray-500 p-3 mb-3">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-red-400 hover:text-gray-500 p-3 mb-3">
                                            
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-red-400 hover:text-gray-500 p-3 mb-3">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-1000 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-red-400 hover:text-gray-500 p-3 mb-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-red-400 hover:text-gray-500 p-3 mb-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2">
                                        <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900 hover:bg-red-400 hover:text-gray-500 p-3 mb-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                    <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                    </svg>
                                                </div>
                                                    <p className="text-xl">〇〇先生</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200">性別</td>
                                                                <td className="border border-slate-200">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">得意なこと</td>
                                                                <td className="border border-slate-200">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">趣味</td>
                                                                <td className="border border-slate-200">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200">勤務歴</td>
                                                                <td className="border border-slate-200">4年</td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                
				            </div>
                        </div>
                        
                    </div>
                </div>
            {/* <!-- Main container --> */}
                <div className="w-full lg:w-1/2 px-2">
                    <div className="h-screen bg-white p-4">
		                {/* 内容 */}
                        <h1 className="mt-1 mb-3">3. 日時を選択してください</h1>

                        <div className="flex h-full w-full">
            <div className="ml-8 mt-0 w-full pr-5">
                <div className="text-3xl">{date.getFullYear()}年</div>
                <div className="flex justify-start items-center mb-4">
                    <ArrowCircleLeftIcon onClick={prevMonth} className="mr-5" />
                    <h2 className="text-5xl font-bold">
                        {date.getMonth() + 1}月
                    </h2>
                    <ArrowCircleRightIcon onClick={nextMonth} className="mx-5" />
                </div>
                <div className="grid grid-cols-7 w-11/12 mx-auto">
                    {daysInWeek.map(day => (
                        <div key={day} className="text-center font-bold">{day}</div>
                    ))}
                    {daysInMonth().map((day, index) => (
                        <div key={index} className={`text-center border-2 h-20 cursor-pointer ${day ? 'hover:border-cyan-400' : ''}`}>
                            {day || ''}
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="flex-auto h-full bg-red-100"></div> */}
        </div>

                        </div>       
                            </div>
                        </div> 

                        
        {/* ボタン */}
                                    <div className="flex justify-end gap-3 bg-secondary-50 px-6 py-8">
                                        <button type="button" className="rounded-lg border border-primary-500 bg-green-300 px-10 py-2 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">
                                        確認
                                        </button>
                                    </div>
        
    </div>
    );
}

export default Booking