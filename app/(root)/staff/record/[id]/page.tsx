"use client";
import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePathname } from "next/navigation";
import axios from "axios";
import useSWR, { mutate } from "swr";
type StudentRecordItem = {
  content: string;
  progress: null | string;
  recordId: string;
  ymd: string;
};

const Record = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const pathname = usePathname();
  const studentId = pathname ? pathname.split("/").pop() : "不明";
  const responseRef = useRef<any>(null);

  //ローディングフラグ
  const [isLoading, setIsLoading] = useState(true);
  const [number, setnumber] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [studentProfile, setStudentProfile] = useState({
    department: "",
    graduationYear: "",
    qualification: "",
    schoolYear: "",
    tel: "",
    workLocation: "",
  });
  const [studentRecord, setStudentRecord] = useState<
    StudentRecordItem[] | null
  >(null);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: response, error } = useSWR(
    `/api/staff/record/${studentId}`,
    fetcher
  );
  const getdata = () => {
    if (!response.responseData) {
      setIsLoading(false);
    } else {
      setnumber(response.responseData[0].email.substring(2, 9));
      setId(response.responseData[0].id);
      setName(response.responseData[0].name);
      const { studentProfile, records } = response.responseData[0];
      setStudentProfile(studentProfile);
      setStudentRecord(records);
    }
  };

  useEffect(() => {
    if (response) {
      getdata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
            <div className="text-gray-900 text-3xl">{name}</div>
            <div className="text-gray-900 mt-2 mb-2 flex flex-row">
              <div className="w-full ">学籍番号 ： {number}</div>
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
              {profileOpen &&
                (studentProfile ? (
                  <div className="p-2 ml-5 mr-5 pb-5 pt-5 text-gray-700 px-2 text-sm md:text-base">
                    <div className="px-5 mb-1 flex flex-row">
                      <div className="w-1/3 text-right">学科・学年　/</div>

                      <div className="w-2/3 px-4">
                        {studentProfile.department
                          ? studentProfile.department
                          : "未指定"}{" "}
                        /{" "}
                        {studentProfile.schoolYear
                          ? studentProfile.schoolYear + "年"
                          : "未指定"}
                      </div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                      <div className="w-1/3 text-right">卒業予定　/</div>

                      <div className="w-2/3 px-4">
                        {studentProfile.graduationYear
                          ? studentProfile.graduationYear + "年"
                          : "未指定"}
                      </div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                      <div className="w-1/3 text-right">電話番号　/</div>

                      <div className="w-2/3 px-4">
                        {studentProfile.tel ? studentProfile.tel : "未指定"}
                      </div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                      <div className="w-1/3 text-right">志望勤務地　/</div>

                      <div className="w-2/3 px-4">
                        {studentProfile.workLocation
                          ? studentProfile.workLocation
                          : "未指定"}
                      </div>
                    </div>
                    <div className="px-5 mb-1 flex flex-row">
                      <div className="w-1/3 text-right">保有資格　/</div>

                      <div className="w-2/3 px-4">
                        {studentProfile.qualification
                          ? studentProfile.qualification
                          : "未指定"}
                      </div>
                    </div>
                  </div>
                ) : null)}
            </div>

            <div className="flex flex-col w-4/5 bg-white rounded-md mt-5 mb-5">
              <div className="flex bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex-row justify-between">
                <div className="">話し合いメモ</div>
              </div>

              <div className="mx-5 p-2 mt-2 pt-3 pb-3 text-gray-700 px-2 text-sm sm:text-base">
                <div>
                  <div className="wrapper7">
                    <div className="accordion7">
                      {studentRecord
                        ? studentRecord.map((item: any, i) => (
                            <div className="item7" key={i}>
                              <div className="title7" onClick={() => toggle(i)}>
                                <h2>
                                  {item.ymd}　{item.content}
                                </h2>
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
                                  selected === i ? "content show7" : "content7"
                                }
                              >
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
                              </div>
                            </div>
                          ))
                        : null}
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
