"use client";
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './App.css';

const data = [
    {
        question: "2023/9/14　　履歴書の作成",
        answer:
            <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-1 px-5"
            />
    },
    {
        question: "2023/9/19　　履歴書の作成",
        answer:
            <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-1 px-5"
            />
    },
    {
        question: "2023/10/3　　面接練習",
        answer:
            <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-1 px-5"
            />
    }
]

const Record = () => {
    const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }


    return (

        <div className="bg-white h-screen w-full">
            <div className="bg-white flex-col text-center mt-10 mb-10">
                <div className="text-gray-900">
                    コウベ タロウ
                </div>
                <div className="text-gray-900 text-3xl">
                    神戸 太郎
                </div>
                <div className="text-gray-900 mt-2 flex flex-row">
                    <div className="w-full ">ITエキスパート学科 / 2023年3月</div>
                </div>
            </div>

            <div className="bg-white flex flex-row">
                <div className="bg-blue-400 w-1/2 p-2 ml-5 border-4 border-blue-400 rounded-lg text-white">
                    プロフィール
                </div>
                <div className="bg-blue-400 w-1/2 p-2 ml-5  border-4 border-blue-400 rounded-lg text-white">
                    話し合いメモ
                </div>
            </div>

            <div className="bg-white flex flex-row mt-2">
                <div className="bg-white w-1/2 p-2 ml-5 text-gray-700 px-2">
                    <div className="px-5 mb-1 flex flex-row mt-2">
                        <div className="w-1/3 text-right">電話番号 /</div>
                        <div className="w-2/3 px-4">000-0000-0000</div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                        <div className="w-1/3 text-right">性別 /</div>
                        <div className="w-2/3 px-4">男性</div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                        <div className="w-1/3 text-right">得意なこと /</div>
                        <div className="w-2/3 px-4">スポーツ</div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                        <div className="w-1/3 text-right">趣味 /</div>
                        <div className="w-2/3 px-4">映画鑑賞</div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                        <div className="w-1/3 text-right">保有資格 /</div>
                        <div className="w-2/3 px-4">基本情報技術者試験</div>
                    </div>
                </div>

                <div className="bg-white w-1/2 p-2 ml-5 text-gray-700 px-2">
                    <div>
                        <div className="wrapper">
                            <div className="accordion">
                                {data.map((item, i) =>
                                    <div className="item">
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
    );
}

export default Record