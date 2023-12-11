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

    const [selected, setSelected] = useState(0);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }


    return (

        <div className="bg-white h-screen w-full">
            <div className="bg-white flex-col text-center mt-10 mb-10">
                <div className="text-gray-900">
                    コウベタロウ
                </div>
                <div className="text-gray-900 text-3xl">
                    神戸太郎
                </div>
                <div className="text-gray-900 mt-2 flex flex-row">
                    <div className="w-full ">学籍番号 ： 1111111</div>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="bg-white flex flex-col w-1/2">
                    <div className="bg-blue-400 p-2 ml-5 border-4 border-blue-400 rounded-lg text-white">
                        プロフィール
                    </div>
                    <div className="bg-white p-2 ml-5 mr-5 text-gray-700 px-2">
                        <div className="px-5 mb-1 flex flex-row mt-2">
                            <div className="w-1/3 text-right">学科・学年 /</div>
                            <div className="w-2/3 px-4">ITエキスパート学科 3年</div>
                        </div>
                        <div className="px-5 mb-1 flex flex-row">
                            <div className="w-1/3 text-right">卒業予定 /</div>
                            <div className="w-2/3 px-4">2025年3月</div>
                        </div>
                        <div className="px-5 mb-1 flex flex-row">
                            <div className="w-1/3 text-right">電話番号 /</div>
                            <div className="w-2/3 px-4">000-0000-0000</div>
                        </div>
                        <div className="px-5 mb-1 flex flex-row">
                            <div className="w-1/3 text-right">志望業界 /</div>
                            <div className="w-2/3 px-4">IT業界</div>
                        </div>
                        <div className="px-5 mb-1 flex flex-row">
                            <div className="w-1/3 text-right">志望勤務地 /</div>
                            <div className="w-2/3 px-4">兵庫県</div>
                        </div>
                        <div className="px-5 mb-1 flex flex-row">
                            <div className="w-1/3 text-right">保有資格 /</div>
                            <div className="w-2/3 px-4">基本情報技術者試験</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white flex flex-col w-1/2">

                    <div className="bg-blue-400 p-2 ml-5  border-4 border-blue-400 rounded-lg text-white">
                        話し合いメモ
                    </div>
                    <div className="bg-white p-2 mt-2 ml-5 mr-5 text-gray-700 px-2">
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
    );
}

export default Record