
"use client";
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './App.css';

const data = [
    {
        question: "2023/10/3　　履歴書の作成",
        answer:
            <div>
                <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
                    style={{ resize: "none" }}
                />
                <div className="flex justify-end ">
                    <button type="button" className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">保存</button>
                </div>
            </div>
    },
    {
        question: "2023/9/19　　履歴書の作成",
        answer:
            <div>
                <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
                    style={{ resize: "none" }}
                />
                <div className="flex justify-end ">
                    <button type="button" className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">保存</button>
                </div>
            </div>
    },
    {
        question: "2023/9/14　　面接練習",
        answer:
            <div>
                <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
                    style={{ resize: "none" }}
                />
                <div className="flex justify-end ">
                    <button type="button" className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">保存</button>
                </div>
            </div>
    }
]

const Record = () => {

    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            gakuseki: '1111111',
            name: "杉浦怜奈",
            kana: "スギウラレイナ",
            tel: "000-0000-0000",
            department: "ITエキスパート",
            grade: "3年",
            graduationYear: "2025年",
            industry: "IT系",
            workLocation: "兵庫県",
            qualifications: "基本情報技術者試験",
        }
    ];

    const [selected, setSelected] = useState(0);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }


    return (
        <div>
            {testUsers.map(user => (
                <div className="bg-white h-screen w-full" key={user.id}>

                    <div className="bg-white flex-col text-center mt-10 mb-10">
                        <div className="text-gray-900">
                            {user.kana}
                        </div>
                        <div className="text-gray-900 text-3xl">
                            {user.name}
                        </div>
                        <div className="text-gray-900 mt-2 flex flex-row">
                            <div className="w-full ">学籍番号 ： {user.gakuseki}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="bg-white flex flex-col w-full lg:w-1/2">
                            <div className="bg-blue-400 p-2 mx-4 border-4 border-blue-400 rounded-lg text-white">
                                プロフィール
                            </div>
                            <div className="bg-white p-2 ml-5 mr-5 text-gray-700 px-2 text-sm md:text-base">
                                <div className="px-5 mb-1 flex flex-row mt-2">
                                    <div className="w-1/3 text-right">学科・学年 /</div>
                                    <div className="w-2/3 px-4">{user.department}{user.grade}</div>
                                </div>
                                <div className="px-5 mb-1 flex flex-row">
                                    <div className="w-1/3 text-right">卒業予定 /</div>
                                    <div className="w-2/3 px-4">{user.graduationYear}</div>
                                </div>
                                <div className="px-5 mb-1 flex flex-row">
                                    <div className="w-1/3 text-right">電話番号 /</div>
                                    <div className="w-2/3 px-4">{user.tel}</div>
                                </div>
                                <div className="px-5 mb-1 flex flex-row">
                                    <div className="w-1/3 text-right">志望業界 /</div>
                                    <div className="w-2/3 px-4">{user.industry}</div>
                                </div>
                                <div className="px-5 mb-1 flex flex-row">
                                    <div className="w-1/3 text-right">志望勤務地 /</div>
                                    <div className="w-2/3 px-4">{user.workLocation}</div>
                                </div>
                                <div className="px-5 mb-1 flex flex-row">
                                    <div className="w-1/3 text-right">保有資格 /</div>
                                    <div className="w-2/3 px-4">{user.qualifications}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full lg:w-1/2">

                            <div className="bg-blue-400 p-2 mx-5 border-4 border-blue-400 rounded-lg text-white">
                                話し合いメモ
                            </div>
                            <div className=" p-2 mt-2 mx-5 text-gray-700 px-2 text-sm md:text-base">
                                <div>
                                    <div className="wrapper">
                                        <div className="accordion">
                                            {data.map((item, i) =>
                                                <div className="item" key={i}>
                                                    <div className='title' onClick={() => toggle(i)}>
                                                        <h2>{item.question}</h2>
                                                        <span>{selected === i ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            selected === i ? "content show" : "content"
                                                        }
                                                    >
                                                        {item.answer}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Record
