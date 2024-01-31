"use client";

import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import { customSelectStyles } from "@/app/components/styles/ApprovalSelect";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { setHours, setMinutes, addMinutes, format } from "date-fns";
import { useSession } from "next-auth/react";
interface WaitingList {
  details: string;
  firstEndTime: string;
  firstStartTime: string;
  firstYmd: string;
  id: string;
  secondEndTime: string;
  secondStartTime: string;
  secondYmd: string;
  staffName: string;
  thirdEndTime: string;
  thirdStartTime: string;
  thirdYmd: string;
  studentName: string;
  studentUserId: string;
}
interface OptionType {
  value: string;
  label: string;
  id: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Approval = () => {
  const { data: session } = useSession();
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>(
    {}
  );
  const [EndTimeOptions, setEndTimeOptions] = useState<OptionType[]>([]);

  // データを取得
  const {
    data: staffData,
    error: staffError,
    mutate,
  } = useSWR("/api/staff/approvallist", fetcher);

  //waitinglistの取得
  const waitinglist: WaitingList[] = staffData?.wait.waitingList || [];
  const noNominationList: WaitingList[] =
    staffData?.wait.noNominationList || [];
  //選択済みの入れ替え
  const clearTimeRanges = () => {
    setSelectedTimes({});
    setEndTimeOptions([]);
  };

  //starttimeの選択
  const setStartTime = (selectedOption: OptionType) => {
    //endtimeの設定
    const startParts = selectedOption.label.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);
    let time = setHours(setMinutes(new Date(), 0), startHour);
    if (startMinute != 0) {
      time = addMinutes(time, 30);
    }
    time = addMinutes(time, 30);
    const timeString = format(time, "HH:mm");
    setEndTimeOptions(
      TimeSelectMenu(
        timeString.toString(),
        selectedTimes[selectedOption.id][2],
        selectedOption.id
      )
    );

    //送信用starttimeの変更
    setSelectedTimes((prev) => ({
      ...prev,
      [selectedOption.id]: [
        selectedTimes[selectedOption.id][0],
        selectedOption.label,
        selectedTimes[selectedOption.id][2],
      ],
    }));
  };

  //endtimeの選択
  const setEndTime = (selectedOption: OptionType) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [selectedOption.id]: [
        selectedTimes[selectedOption.id][0],
        selectedTimes[selectedOption.id][1],
        selectedOption.label,
      ],
    }));
  };

  // ユーザー選択時のハンドラ
  const handleSelect = (
    id: string,
    index: string,
    firsttime: string,
    endtime: string
  ) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [id]: [index, firsttime, endtime],
    }));
    console.log(selectedTimes);
  };

  const getIndex = (id: string): string => {
    return selectedTimes[id] ? selectedTimes[id][0] : "";
  };

  const getFirstTime = (id: string): string => {
    return selectedTimes[id] ? selectedTimes[id][1] : "";
  };

  const getEndTime = (id: string): string => {
    return selectedTimes[id] ? selectedTimes[id][2] : "";
  };

  const [isNominationSelected, setIsNominationSelected] = useState(true);

  //選択時間のプルダウンのコンポーネント
  const TimeSelectMenu = (firsttime: string, endtime: string, id: string) => {
    const startParts = firsttime.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);

    const endParts = endtime.split(":");
    const endHour = parseInt(endParts[0], 10);
    const endMinute = parseInt(endParts[1], 10);

    const options: OptionType[] = [];
    let time = setHours(setMinutes(new Date(), 0), startHour);
    if (startMinute != 0) {
      time = addMinutes(time, 30);
    }

    while (time <= setHours(setMinutes(new Date(), 0), endHour)) {
      const timeString = format(time, "HH:mm");
      options.push({
        value: timeString,
        label: timeString,
        id: id,
      });
      time = addMinutes(time, 30);
    }

    if (endMinute != 0) {
      time = addMinutes(time, 30);
    }

    return options;
  };

  //bookingに追加(指名あり)
  const addBooking = async (
    id: string,
    studentId: string,
    ymd: string,
    firsttime: string,
    endtime: string,
    detail: string
  ) => {
    var time = [firsttime + "-" + endtime];
    const body = {
      id: id,
      studentUserId: studentId,
      ymd: ymd,
      time: time,
      details: detail,
    };

    const response = await axios.post("/api/staff/approvallist", body);

    if (response.status === 201) {
      toast.success("保存できました");
      mutate();
    } else {
      toast.error("保存できませんでした");
    }
  };

  //bookingに追加(指名なし)
  const addNominationBooking = async (
    id: string,
    staffName: string,
    studentId: string,
    ymd: string,
    firsttime: string,
    endtime: string,
    detail: string
  ) => {
    var time = [firsttime + "-" + endtime];
    const body = {
      id: id,
      staffName: staffName,
      studentUserId: studentId,
      ymd: ymd,
      time: time,
      details: detail,
    };

    const response = await axios.post(
      "/api/staff/approvallist/nonominationList",
      body
    );

    if (response.status === 201) {
      toast.success("保存できました");
      mutate();
    } else {
      toast.error("保存できませんでした");
    }
  };

  const MobileApprovallist = () => (
    <div className="bg-white rounded-lg shadow-md w-full mt-5">
      {/* <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
          ■ 承認待ち一覧
        </div> */}
      <div className=" flex w-full items-center justify-cente">
        <div className="flex flex-row justify-center w-full z-20 rounded-r-lg">
          <button
            className={`w-1/2 p-3 pb-5 shadow-lg border rounded-l-lg ${
              isNominationSelected
                ? "border-kd-sub2-cl bg-kd-sub2-cl text-white"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => (setIsNominationSelected(true), clearTimeRanges())}
          >
            指名あり
          </button>
          <button
            className={`w-1/2 p-3 pb-5 shadow-lg border rounded-r-lg ${
              !isNominationSelected
                ? "border-kd-sub2-cl bg-kd-sub2-cl text-white"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => (setIsNominationSelected(false), clearTimeRanges())}
          >
            指名なし
          </button>
        </div>
      </div>
      <div className="bg-gray-100 mt-0 m-4 rounded-lg">
        <div className="mt-6 w-full bg-gray-100 h-auto rounded-lg">
          <div className="flex flex-col items-center h-full">
            {isNominationSelected ? (
              waitinglist?.length === 0 ? (
                <div className="py-3 text-center">
                  指名ありの承認待ちはありません
                </div>
              ) : (
                waitinglist?.map((user, index) => (
                  <div className="mt-2 w-11/12" key={user.id}>
                    <div>
                      <div className="mt-3 mb-5 w-full bg-white rounded-lg">
                        {/* <div className="flex flex-col"> */}
                        <div className="flex flex-col justify-center items-center text-center">
                          <div
                            className="w-1/3 text-base p-3 px-5 mb-0 mx-2 my-2 flex justify-center items-center"
                            key={user.id}
                          >
                            {user.studentName}
                            <br />
                          </div>
                          <div className="w-2/3 mt-0 mx-2 my-2 flex justify-center items-center flex-col">
                            <button
                              className="rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() =>
                                handleSelect(
                                  user.id,
                                  user.firstYmd,
                                  user.firstStartTime,
                                  user.firstEndTime
                                )
                              }
                            >
                              1. {user.firstYmd}
                              {"　"}
                              {user.firstStartTime} ~ {user.firstEndTime}
                            </button>
                            {/* 2. */}
                            <div
                              className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() => {
                                if (user.secondYmd) {
                                  handleSelect(
                                    user.id,
                                    user.secondYmd,
                                    user.secondStartTime,
                                    user.secondEndTime
                                  );
                                } else {
                                }
                              }}
                            >
                              2.{" "}
                              {user.secondYmd
                                ? `${user.secondYmd}　${user.secondStartTime} ~ ${user.secondEndTime}`
                                : "希望日がありません"}
                            </div>

                            {/* 3. */}
                            <div
                              className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() => {
                                if (user.thirdYmd) {
                                  handleSelect(
                                    user.id,
                                    user.thirdYmd,
                                    user.thirdStartTime,
                                    user.thirdEndTime
                                  );
                                } else {
                                }
                              }}
                            >
                              3.{" "}
                              {user.thirdYmd
                                ? `${user.thirdYmd}　${user.thirdStartTime} ~ ${user.thirdEndTime}`
                                : "希望日がありません"}
                            </div>
                          </div>
                        </div>
                        <div className="w-full p-3 px-5 mx-2 my-2 border-t-2">
                          <div className="flex flex-row">
                            {getIndex(user.id) ? (
                              <div>
                                {getIndex(user.id)}　[{user.details}]
                              </div>
                            ) : (
                              <div>{user.details}</div>
                            )}
                          </div>
                          {/* firsttimeselect */}
                          <div className="flex flex-col justify-center items-center text-center">
                            <div className="mt-4 w-1/2">
                              <Select
                                options={TimeSelectMenu(
                                  getFirstTime(user.id),
                                  getEndTime(user.id),
                                  user.id
                                )}
                                placeholder="開始時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) =>
                                  setStartTime(selectedOption as OptionType)
                                }
                              />
                            </div>
                            <div className="mt-3 w-1/2">
                              <Select
                                options={EndTimeOptions}
                                placeholder="終了時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) =>
                                  setEndTime(selectedOption as OptionType)
                                }
                              />
                            </div>
                          </div>
                          {/* endtimeselect */}
                          <div className="flex justify-end">
                            <button
                              className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs"
                              onClick={() => {
                                addBooking(
                                  user.id,
                                  user.studentUserId,
                                  getIndex(user.id),
                                  getFirstTime(user.id),
                                  getEndTime(user.id),
                                  user.details
                                );
                              }}
                            >
                              承認
                            </button>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : noNominationList?.length === 0 ? (
              <div className="py-3 text-center">
                指名なしの承認待ちはありません
              </div>
            ) : (
              noNominationList?.map((user) => (
                <div className="mt-2 w-11/12" key={user.id}>
                  <div>
                    <div className="mt-3 mb-5 w-full bg-white rounded-lg">
                      {/* <div className="flex flex-col"> */}
                      <div className="flex flex-col justify-center items-center text-center">
                        <div
                          className="w-1/3 text-base p-3 px-5 mb-0 mx-2 my-2 flex justify-center items-center"
                          key={user.id}
                        >
                          {user.studentName}
                          <br />
                        </div>
                        <div className="w-2/3 mt-0 mx-2 my-2 flex justify-center items-center flex-col">
                          <div
                            className="rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() =>
                              handleSelect(
                                user.id,
                                user.firstYmd,
                                user.firstStartTime,
                                user.firstEndTime
                              )
                            }
                          >
                            1. {user.firstYmd}
                            {"　"}
                            {user.firstStartTime} ~ {user.firstEndTime}
                          </div>
                          {/* 2. */}
                          <div
                            className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() => {
                              if (user.secondYmd) {
                                handleSelect(
                                  user.id,
                                  user.secondYmd,
                                  user.secondStartTime,
                                  user.secondEndTime
                                );
                              } else {
                              }
                            }}
                          >
                            2.{" "}
                            {user.secondYmd
                              ? `${user.secondYmd}　${user.secondStartTime} ~ ${user.secondEndTime}`
                              : "希望日がありません"}
                          </div>

                          {/* 3. */}
                          <div
                            className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() => {
                              if (user.thirdYmd) {
                                handleSelect(
                                  user.id,
                                  user.thirdYmd,
                                  user.thirdStartTime,
                                  user.thirdEndTime
                                );
                              } else {
                              }
                            }}
                          >
                            3.{" "}
                            {user.thirdYmd
                              ? `${user.thirdYmd}　${user.thirdStartTime} ~ ${user.thirdEndTime}`
                              : "希望日がありません"}
                          </div>
                        </div>
                      </div>
                      <div className="w-full p-3 px-5 mx-2 my-2 border-t-2">
                        <div className="flex flex-row">
                          {getIndex(user.id) ? (
                            <div>
                              {getIndex(user.id)}　[{user.details}]
                            </div>
                          ) : (
                            <div>{user.details}</div>
                          )}
                        </div>
                        {/* firsttimeselect */}
                        <div className="flex flex-col justify-center items-center text-center">
                          <div className="mt-4 w-1/2">
                            <Select
                              options={TimeSelectMenu(
                                getFirstTime(user.id),
                                getEndTime(user.id),
                                user.id
                              )}
                              placeholder="開始時間を選択..."
                              styles={customSelectStyles}
                              onChange={(selectedOption) =>
                                setStartTime(selectedOption as OptionType)
                              }
                            />
                          </div>
                          <div className="mt-3 w-1/2">
                            <Select
                              options={EndTimeOptions}
                              placeholder="終了時間を選択..."
                              styles={customSelectStyles}
                              onChange={(selectedOption) =>
                                setEndTime(selectedOption as OptionType)
                              }
                            />
                          </div>
                        </div>
                        {/* endtimeselect */}
                        <div className="flex justify-end">
                          <button
                            className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs"
                            onClick={() => {
                              addNominationBooking(
                                user.id,
                                session?.user.name,
                                user.studentUserId,
                                getIndex(user.id),
                                getFirstTime(user.id),
                                getEndTime(user.id),
                                user.details
                              );
                            }}
                          >
                            承認
                          </button>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const PcApprovallist = () => (
    <div className="bg-white rounded-lg shadow-md w-4/5 mt-5">
      {/* <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
      ■ 承認待ち一覧
    </div> */}
      <div className=" flex w-full items-center justify-cente">
        <div className="flex flex-row justify-center w-full z-20 rounded-r-lg">
          <button
            className={`w-1/2 p-3 pb-5 shadow-lg border rounded-l-lg ${
              isNominationSelected
                ? "border-kd-sub2-cl bg-kd-sub2-cl text-white"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => (setIsNominationSelected(true), clearTimeRanges())}
          >
            指名あり
          </button>
          <button
            className={`w-1/2 p-3 pb-5 shadow-lg border rounded-r-lg ${
              !isNominationSelected
                ? "border-kd-sub2-cl bg-kd-sub2-cl text-white"
                : "border-gray-200 bg-gray-50"
            }`}
            onClick={() => (setIsNominationSelected(false), clearTimeRanges())}
          >
            指名なし
          </button>
        </div>
      </div>
      <div className="bg-gray-100 mt-0 m-4 rounded-lg">
        <div className="mt-6 w-full bg-gray-100 h-auto rounded-lg">
          <div className="flex flex-col items-center h-full">
            {isNominationSelected ? (
              waitinglist?.length === 0 ? (
                <div className="py-3 text-center">
                  指名ありの承認待ちはありません
                </div>
              ) : (
                waitinglist?.map((user) => (
                  <div className="mt-2 w-11/12" key={user.id}>
                    <div>
                      <div className="mt-3 mb-5 w-full bg-white rounded-lg">
                        <div className="flex flex-row ">
                          <div
                            className="w-1/6 text-base p-3 px-5 mx-2 my-2 flex justify-center items-center"
                            key={user.id}
                          >
                            {user.studentName}
                            <br />
                          </div>
                          <div className="w-2/6 p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                            <div
                              className="rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() =>
                                handleSelect(
                                  user.id,
                                  user.firstYmd,
                                  user.firstStartTime,
                                  user.firstEndTime
                                )
                              }
                            >
                              1. {user.firstYmd}
                              {"　"}
                              {user.firstStartTime} ~ {user.firstEndTime}
                            </div>
                            {/* 2. */}
                            <div
                              className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() => {
                                if (user.secondYmd) {
                                  handleSelect(
                                    user.id,
                                    user.secondYmd,
                                    user.secondStartTime,
                                    user.secondEndTime
                                  );
                                } else {
                                }
                              }}
                            >
                              2.{" "}
                              {user.secondYmd
                                ? `${user.secondYmd}　${user.secondStartTime} ~ ${user.secondEndTime}`
                                : "希望日がありません"}
                            </div>

                            {/* 3. */}
                            <div
                              className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                              onClick={() => {
                                if (user.thirdYmd) {
                                  handleSelect(
                                    user.id,
                                    user.thirdYmd,
                                    user.thirdStartTime,
                                    user.thirdEndTime
                                  );
                                } else {
                                }
                              }}
                            >
                              3.{" "}
                              {user.thirdYmd
                                ? `${user.thirdYmd}　${user.thirdStartTime} ~ ${user.thirdEndTime}`
                                : "希望日がありません"}
                            </div>
                          </div>
                          <div className="w-3/6 p-3 px-5 mx-2 my-2 border-l-2">
                            <div className="flex flex-row">
                              {getIndex(user.id) ? (
                                <div>
                                  {getIndex(user.id)}　[{user.details}]
                                </div>
                              ) : (
                                <div>{user.details}</div>
                              )}
                            </div>
                            {/* firsttimeselect */}
                            <div className="flex flex-row">
                              <div className="m-2 w-full">
                                <Select
                                  options={TimeSelectMenu(
                                    getFirstTime(user.id),
                                    getEndTime(user.id),
                                    user.id
                                  )}
                                  placeholder="開始時間を選択..."
                                  styles={customSelectStyles}
                                  onChange={(selectedOption) =>
                                    setStartTime(selectedOption as OptionType)
                                  }
                                />
                              </div>
                              <div className="m-2 w-full">
                                <Select
                                  options={EndTimeOptions}
                                  placeholder="終了時間を選択..."
                                  styles={customSelectStyles}
                                  onChange={(selectedOption) =>
                                    setEndTime(selectedOption as OptionType)
                                  }
                                />
                              </div>
                            </div>
                            {/* endtimeselect */}
                            <div className="flex justify-end">
                              <button
                                className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs"
                                onClick={() => {
                                  addBooking(
                                    user.id,
                                    user.studentUserId,
                                    getIndex(user.id),
                                    getFirstTime(user.id),
                                    getEndTime(user.id),
                                    user.details
                                  );
                                }}
                              >
                                承認
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : noNominationList?.length === 0 ? (
              <div className="py-3 text-center">
                指名なしの承認待ちはありません
              </div>
            ) : (
              noNominationList?.map((user, index) => (
                <div className="mt-2 w-11/12" key={user.id}>
                  <div>
                    <div className="mt-3 mb-5 w-full bg-white rounded-lg">
                      <div className="flex flex-row ">
                        <div
                          className="w-1/6 text-base p-3 px-5 mx-2 my-2 flex justify-center items-center"
                          key={user.id}
                        >
                          {user.studentName}
                          <br />
                        </div>
                        <div className="w-2/6 p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                          <div
                            className="rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() =>
                              handleSelect(
                                user.id,
                                user.firstYmd,
                                user.firstStartTime,
                                user.firstEndTime
                              )
                            }
                          >
                            1. {user.firstYmd}
                            {"　"}
                            {user.firstStartTime} ~ {user.firstEndTime}
                          </div>
                          {/* 2. */}
                          <div
                            className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() => {
                              if (user.secondYmd) {
                                handleSelect(
                                  user.id,
                                  user.secondYmd,
                                  user.secondStartTime,
                                  user.secondEndTime
                                );
                              } else {
                              }
                            }}
                          >
                            2.{" "}
                            {user.secondYmd
                              ? `${user.secondYmd}　${user.secondStartTime} ~ ${user.secondEndTime}`
                              : "希望日がありません"}
                          </div>

                          {/* 3. */}
                          <div
                            className="mt-1 rounded-lg border border-primary-500 px-2 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 cursor-pointer bg-gray-50"
                            onClick={() => {
                              if (user.thirdYmd) {
                                handleSelect(
                                  user.id,
                                  user.thirdYmd,
                                  user.thirdStartTime,
                                  user.thirdEndTime
                                );
                              } else {
                              }
                            }}
                          >
                            3.{" "}
                            {user.thirdYmd
                              ? `${user.thirdYmd}　${user.thirdStartTime} ~ ${user.thirdEndTime}`
                              : "希望日がありません"}
                          </div>
                        </div>
                        <div className="w-3/6 p-3 px-5 mx-2 my-2 border-l-2">
                          <div className="flex flex-row">
                            {getIndex(user.id) ? (
                              <div>
                                {getIndex(user.id)}　[{user.details}]
                              </div>
                            ) : (
                              <div>{user.details}</div>
                            )}
                          </div>
                          {/* firsttimeselect */}
                          <div className="flex flex-row">
                            <div className="m-2 w-full">
                              <Select
                                options={TimeSelectMenu(
                                  getFirstTime(user.id),
                                  getEndTime(user.id),
                                  user.id
                                )}
                                placeholder="開始時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) =>
                                  setStartTime(selectedOption as OptionType)
                                }
                              />
                            </div>
                            <div className="m-2 w-full">
                              <Select
                                options={EndTimeOptions}
                                placeholder="終了時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) =>
                                  setEndTime(selectedOption as OptionType)
                                }
                              />
                            </div>
                          </div>
                          {/* endtimeselect */}
                          <div className="flex justify-end">
                            <button
                              className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs"
                              onClick={() => {
                                addNominationBooking(
                                  user.id,
                                  session?.user.name,
                                  user.studentUserId,
                                  getIndex(user.id),
                                  getFirstTime(user.id),
                                  getEndTime(user.id),
                                  user.details
                                );
                              }}
                            >
                              承認
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* モバイル向けナビゲーションバー（mdブレークポイント以下でのみ表示） */}
      <div className="md:hidden h-full flex flex-col items-center min-h-full mt-6">
        {MobileApprovallist()}
      </div>

      {/* デスクトップ向けサイドバー（mdブレークポイント以上でのみ表示） */}
      <div className="hidden md:flex h-full flex-col items-center min-h-full mt-6">
        {PcApprovallist()}
      </div>
    </>
  );
};

export default Approval;
