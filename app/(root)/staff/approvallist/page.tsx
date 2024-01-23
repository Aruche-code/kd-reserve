"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Staff, StaffNgData } from "@/app/components/types";
import { toast } from "react-hot-toast";

interface TimeSelectMenuProps {
  id:string;
  timeType:string;
  firsttime: string;
  endtime: string;
}
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Approval = () => {

  // stateでtimeRangesを保持
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>({});
  //選択済みの入れ替え
  const clearTimeRanges = () => {
    setSelectedTimes({});
  };

  //timeRangesが変化時にstateを更新
  // useEffect(() => {
  //   setSelectedTimes(timeRanges);
  // }, [timeRanges]);

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
  const TimeSelectMenu: React.FC<TimeSelectMenuProps> = ({
    id,
    timeType,
    firsttime,
    endtime,
  }) => {
    const startParts = firsttime.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);
    //console.log(firsttime)

    const endParts = endtime.split(":");
    const endHour = parseInt(endParts[0], 10);
    const endMinute = parseInt(endParts[1], 10);

    const timeOptions = [];

    //時間変更した際の処理
  const handleTimeSelect = (id: string, timeType: string, event: any) => {
    const time = event.target.value;
    timeType === "firstTime" ? (
      setSelectedTimes({
        ...selectedTimes,
        [id]: [
          ...selectedTimes[id].slice(0, 1), // firstTimeはそのまま
          time // index 2を新しいtimeに更新
        ]
      })
    ) : (
      setSelectedTimes({
        ...selectedTimes,
        [id]: [
          ...selectedTimes[id].slice(0, 2), // endTimeはそのまま
          time // index 3を新しいtimeに更新
        ]
      })
    )
    console.log(selectedTimes)
  }

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === startHour && minute < startMinute) {
          continue;
        }
        if (hour === endHour && minute > endMinute) {
          break;
        }

        const timeValue = new Date(0, 0, 0, hour, minute);
        const formattedTime = timeValue.toLocaleTimeString("ja-JP", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });

        timeOptions.push(
          <option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
            {formattedTime}
          </option>
        );
      }
    }

    return (
      <select className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"> 
      {/* onchangeを実行するとエラー発生。もう少しで行けそう */}
      {/* onChange={(event) => handleTimeSelect(id,timeType,event)} */}
        {timeOptions}
      </select>
    );
  };

  // データを取得(GET){
  const { data: staffData, error: staffError } = useSWR(
    "/api/staff/approvallist",
    fetcher
  );

  //staffデータの取得
  const staff: Staff[] = staffData?.wait.staffList || [];

  //waitinglistの取得
  const waitinglist: WaitingList[] = staffData?.wait.waitingList || [];
  const noNominationList: WaitingList[] = staffData?.wait.noNominationList || [];

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

    //console.log(body)
    const response = await axios.post("/api/staff/approvallist", body);

    if (response.status === 201) {
      toast.success("保存できました");
    } else {
      toast.error("保存できませんでした");
    }

  };

  //staffの選択状況
  const [selectValue, setSelectValue] = useState("");
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

    const response = await axios.post("/api/staff/approvallist", body);

    if (response.status === 201) {
      toast.success("保存できました");
    } else {
      toast.error("保存できませんでした");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full bg-gray-100">
      <div className=" flex w-full items-center justify-center mt-10">
        <div className="flex flex-row justify-center fixed w-9/12 z-20 rounded-r-lg">
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
      <div className="mt-12 w-full bg-gray-100 h-auto">
        <div className="flex flex-col items-center h-full">

          {isNominationSelected ? (
            waitinglist?.length === 0 ? ( 
              <div className="text-center">指名ありの承認待ちはありません</div>
            ) : (
              waitinglist?.map((user, index) => (
                <div className="mt-2" key={user.id}>
                  <div>
                    <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                      <div className="flex flex-row ">
                        <div
                          className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center"
                          key={user.id}
                        >
                          {user.studentName}
                          <br />
                        </div>
                        <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                          <div
                            className="border-b-2 cursor-pointer border-gray-200"
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
                            className="border-b-2 cursor-pointer border-gray-200"
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
                            className="border-b-2 cursor-pointer border-gray-200"
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
                        <div className="p-3 px-5 mx-2 my-2 border-l-2">
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
                            <div className="m-2 w-24">
                              <TimeSelectMenu
                                id={user.id}
                                timeType="firstTime"
                                firsttime={getFirstTime(user.id)}
                                endtime={getEndTime(user.id)}
                              />
                            </div>
                            <div className="m-1 mt-2">～</div>
                            <div className="m-2 w-24">
                            <TimeSelectMenu
                                id={user.id}
                                timeType="endTime"
                                firsttime={getFirstTime(user.id)}
                                endtime={getEndTime(user.id)}
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
          ) : (
            noNominationList?.length === 0 ? ( 
              <div className="text-center">指名なしの承認待ちはありません</div>
            ) : (
              noNominationList?.map((user, index) => (
                  <div className="mt-2" key={user.id}>
                    <div>
                      <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                        <div className="flex flex-row ">
                          <div className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center">
                            {user.studentName}
                            <br />
                          </div>
                          <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                            <div
                              className="border-b-2 cursor-pointer border-gray-200"
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
                              className="border-b-2 cursor-pointer border-gray-200"
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
                              className="border-b-2 cursor-pointer border-gray-200"
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
                          <div className="p-3 px-5 mx-2 my-2 border-l-2">
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
                              <div className="m-2 w-24">
                                <TimeSelectMenu
                                  id={user.id}
                                  timeType="firstTime"
                                  firsttime={getFirstTime(user.id)}
                                  endtime={getEndTime(user.id)}
                                />
                              </div>
                              <div className="m-1 mt-2">～</div>
                              <div className="m-2 w-24">
                                <TimeSelectMenu
                                  id={user.id}
                                  timeType="endTime"
                                  firsttime={getFirstTime(user.id)}
                                  endtime={getEndTime(user.id)}
                                />
                              </div>
                            </div>
                            {/* endtimeselect */}
                            <div className="flex justify-end">
                              <select
                                onChange={(e) => setSelectValue(e.target.value)}
                                className="px-2 py-1 mt-3 mr-3 w-32 text-sm border-gray-400 border rounded-md"
                              >
                                {staff.map((staff) => (
                                  <option
                                    className="text-sm"
                                    key={staff.name}
                                    value={staff.name}
                                  >
                                    {staff.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs"
                                onClick={() => {
                                  const selectedStaffName = selectValue;
                                  addNominationBooking(
                                    user.id,
                                    selectedStaffName,
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Approval;
