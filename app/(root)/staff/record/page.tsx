"use client";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./App.css";

const Record = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null); // ここを修正

  const data = [
    {
      question: "2024/1/19　　履歴書の作成",
      answer: (
        <div>
          <textarea
            className="mt-2 w-full border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
            style={{ resize: "none" }}
          />
          <div className="flex justify-end ">
            <button
              type="button"
              className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
            >
              保存
            </button>
          </div>
        </div>
      ),
    },
    {
      question: "2024/1/12　　履歴書の作成",
      answer: (
        <div>
          <textarea
            className="w-full mt-2 border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
            style={{ resize: "none" }}
          />
          <div className="flex justify-end ">
            <button
              type="button"
              className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
            >
              保存
            </button>
          </div>
        </div>
      ),
    },
    {
      question: "2023/1/10　　面接練習",
      answer: (
        <div>
          <textarea
            className="w-full border-2 mt-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
            style={{ resize: "none" }}
          />
          <div className="flex justify-end ">
            <button
              type="button"
              className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
            >
              保存
            </button>
          </div>
        </div>
      ),
    },
  ];

  const toggle = (i: number) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen); // 状態を反転させる
  };

  return (
    <div className="mt-6">
      <div className="w-full flex justify-center items-center">
        <div className="bg-white md:bg-gray-100 w-full md:w-2/3 rounded-md md:shadow-md mt-5">
          <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
            ■ 学生カルテ
          </div>
          <div className="flex-col text-center mt-5 mb-5">
            <div className="text-gray-900 text-3xl">電子太郎</div>
            <div className="text-gray-900 mt-2 mb-2 flex flex-row">
              <div className="w-full ">学籍番号 ： 1111111</div>
            </div>
          </div>

          <div className="flex flex-wrap flex-col justify-center items-center">
            <div className="flex flex-col w-4/5 bg-white rounded-md ">
              <div
                className="bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex justify-between items-center"
                onClick={toggleProfile}
              >
                プロフィール
                <span>
                  {profileOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </span>
              </div>
              {profileOpen && (
                <div className="p-2 ml-5 mr-5 pb-5 pt-5 text-gray-700 px-2 text-sm md:text-base">
                  <div className="px-5 mb-1 flex flex-row">
                    <div className="w-1/3 text-right">学科・学年　/</div>

                    <div className="w-2/3 px-4">ITエキスパート 3年</div>
                  </div>
                  <div className="px-5 mb-1 flex flex-row">
                    <div className="w-1/3 text-right">卒業予定　/</div>

                    <div className="w-2/3 px-4">2025年</div>
                  </div>
                  <div className="px-5 mb-1 flex flex-row">
                    <div className="w-1/3 text-right">電話番号　/</div>

                    <div className="w-2/3 px-4">090-0000-0000</div>
                  </div>
                  <div className="px-5 mb-1 flex flex-row">
                    <div className="w-1/3 text-right">志望勤務地　/</div>

                    <div className="w-2/3 px-4">大阪府</div>
                  </div>
                  <div className="px-5 mb-1 flex flex-row">
                    <div className="w-1/3 text-right">保有資格　/</div>

                    <div className="w-2/3 px-4">基本情報技術者</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col w-4/5 bg-white rounded-md mt-5 mb-5">
              <div className="flex bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex-row justify-between">
                <div className="">話し合いメモ</div>
              </div>

              <div className="mx-5 p-2 mt-2 pt-3 pb-3 text-gray-700 px-2 text-sm sm:text-base">
                <div>
                  <div className="wrapper">
                    <div className="accordion">
                      {data.map((item, i) => (
                        <div className="item" key={i}>
                          <div className="title" onClick={() => toggle(i)}>
                            <h2>{item.question}</h2>
                            <span>
                              {selected === i ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </span>
                          </div>
                          <div
                            className={
                              selected === i ? "content show" : "content"
                            }
                          >
                            {item.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
