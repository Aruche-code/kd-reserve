"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Staff, StaffNgData } from "@/app/components/types";
import { customSelectStyles } from "@/app/components/styles/ApprovalSelect";
import { toast } from "react-hot-toast";
import Select from "react-select";
import {
  setHours,
  setMinutes,
  addMinutes,
  format,
} from "date-fns";

interface TimeSelectMenuProps {
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
interface OptionType {
  value: string;
  label: string;
  id: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Approval = () => {

  // stateでtimeRangesを保持
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>({});
  const [EndTimeOptions, setEndTimeOptions] = useState<OptionType[]>([]);
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
    if(startMinute != 0){
      time = addMinutes(time, 30);
    }
    time = addMinutes(time, 30)
    const timeString = format(time, "HH:mm");
    setEndTimeOptions(TimeSelectMenu(timeString.toString(),selectedTimes[selectedOption.id][2],selectedOption.id));

    //送信用starttimeの変更
    setSelectedTimes((prev) => ({
      ...prev,
      [selectedOption.id]: [selectedTimes[selectedOption.id][0], selectedOption.label, selectedTimes[selectedOption.id][2]],
    }));

    console.log(selectedTimes)
  }

  //endtimeの選択
  const setEndTime = (selectedOption: OptionType) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [selectedOption.id]: [selectedTimes[selectedOption.id][0], selectedTimes[selectedOption.id][1],  selectedOption.label],
    }));
    console.log(selectedTimes)
  }

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
    console.log(selectedTimes)
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
  const TimeSelectMenu = (firsttime: string, endtime: string, id:string) => {
    const startParts = firsttime.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);

    const endParts = endtime.split(":");
    const endHour = parseInt(endParts[0], 10);
    const endMinute = parseInt(endParts[1], 10);

    const options: OptionType[] = [];
    let time = setHours(setMinutes(new Date(), 0), startHour);
    if(startMinute != 0){
      time = addMinutes(time, 30);
    }

    while (time <= setHours(setMinutes(new Date(), 0), endHour)) {
      const timeString = format(time, "HH:mm");
      options.push({
        value: timeString,
        label: timeString,
        id:id,
      });
      time = addMinutes(time, 30);
    }

    if(endMinute != 0){
      time = addMinutes(time, 30);
    }

    
    return options;
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
      const staff: Staff[] = staffData?.wait.staffList || [];

      //waitinglistの取得
      const waitinglist: WaitingList[] = staffData?.wait.waitingList || [];
      const noNominationList: WaitingList[] = staffData?.wait.noNominationList || [];
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
                            <div className="m-2 w-full">
                              <Select
                                options={TimeSelectMenu(getFirstTime(user.id),getEndTime(user.id),user.id)} 
                                placeholder="開始時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) => setStartTime(selectedOption as OptionType)} 
                              />
                            </div>
                            <div className="m-2 w-full">
                              <Select
                                options={EndTimeOptions} 
                                placeholder="終了時間を選択..."
                                styles={customSelectStyles}
                                onChange={(selectedOption) => setEndTime(selectedOption as OptionType)} 
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
                              <div className="m-2 w-full">
                                <Select
                                  options={TimeSelectMenu(getFirstTime(user.id),getEndTime(user.id),user.id)} 
                                  placeholder="開始時間を選択..."
                                  styles={customSelectStyles}
                                  onChange={(selectedOption) => setStartTime(selectedOption as OptionType)} 
                                />
                              </div>
                              <div className="m-2 w-full">
                                <Select
                                  options={EndTimeOptions} 
                                  placeholder="終了時間を選択..."
                                  styles={customSelectStyles}
                                  onChange={(selectedOption) => setEndTime(selectedOption as OptionType)} 
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
