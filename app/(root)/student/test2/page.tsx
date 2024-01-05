"use client";

import useSWR from "swr";
import axios from "axios";
import StaffList from "../../components/StaffList";
import { Staff, StaffNgData } from "@/app/components/types";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  setHours,
  setMinutes,
  addMinutes,
  format,
  isAfter,
  isBefore,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja"; // date-fnsの日本語ロケール
import CustomInput from "@/app/components/inputs/DatePicker";

interface OptionType {
  value: string;
  label: string;
}

interface NGTimeRangesType {
  [key: string]: string[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TimeSelector: React.FC = () => {
  const [selectedStaffMember, setSelectedStaffMember] = useState<string | null>(
    null
  );
  // 選択された日付、時間、オプションの状態管理
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState<OptionType | null>(null);
  const [endTime, setEndTime] = useState<OptionType | null>(null);
  const [timeOptions, setTimeOptions] = useState<OptionType[]>([]);
  const [endTimeOptions, setEndTimeOptions] = useState<OptionType[]>([]);
  const [loadingEndTime, setLoadingEndTime] = useState(false);
  const [excludeDates, setExcludeDates] = useState<Date[]>([]);
  const [NGTimeRanges, setNGTimeRanges] = useState<NGTimeRangesType>({});

  // スタッフデータを取得するためにSWRを使用
  const { data: staffData, error: staffError } = useSWR(
    "/api/student/booking",
    fetcher
  );
  const staff: Staff[] = staffData?.staffUsers || [];

  // 開始時間を更新し、終了時間をリセットするハンドラー
  const handleStartTimeChange = (option: OptionType | null) => {
    setStartTime(option);
    setEndTime(null);
    setLoadingEndTime(true); // 開始時間が選択されたらローディングを開始
  };

  useEffect(() => {
    // 選択されたスタッフに基づいてNG日を取得し更新
    if (selectedStaffMember) {
      fetcher(`/api/student/booking/${selectedStaffMember}`).then((ngData) => {
        const newExcludeDates: Date[] = [];
        const newNGTimeRanges: NGTimeRangesType = {};

        ngData.staffNgData[0]?.staffng.forEach((ngDate: StaffNgData) => {
          const dateParts = ngDate.ymd
            .split("-")
            .map((part) => parseInt(part, 10));
          const dateObj = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2]
          );

          if (ngDate.time.includes("allng")) {
            newExcludeDates.push(dateObj);
          } else {
            newNGTimeRanges[ngDate.ymd] = ngDate.time;
          }
        });

        setExcludeDates(newExcludeDates);
        setNGTimeRanges(newNGTimeRanges);
      });
    }
  }, [selectedStaffMember]);

  // 選択された日付が変更された時に時間オプションを再計算
  useEffect(() => {
    // NG時間を除外して時間オプションを生成する関数を更新
    const generateTimeOptions = (selectedDate: Date): OptionType[] => {
      const options: OptionType[] = [];
      const dateString = format(selectedDate, "yyyy-MM-dd");
      const ngTimes = NGTimeRanges[dateString] || [];
      let time = setHours(setMinutes(new Date(), 0), 9);

      while (time <= setHours(setMinutes(new Date(), 0), 17)) {
        const timeString = format(time, "HH:mm");
        if (!ngTimes.includes(timeString)) {
          options.push({
            value: timeString,
            label: timeString,
          });
        }
        time = addMinutes(time, 30);
      }

      return options;
    };

    setTimeOptions(generateTimeOptions(selectedDate));
    setStartTime(null);
    setEndTime(null);
    setLoadingEndTime(false);
  }, [selectedDate, NGTimeRanges]);

  // 開始時間が選択された時に終了時間のオプションを計算
  useEffect(() => {
    if (!startTime) {
      setEndTimeOptions([]);
      return;
    }
    if (startTime) {
      const selectedTime = new Date(selectedDate);
      const [hour, minute] = startTime.value.split(":").map(Number);
      selectedTime.setHours(hour, minute);

      // 選択された開始時間に基づいて利用可能な終了時間をフィルタリング
      const options = timeOptions.filter((option) => {
        const [optionHour, optionMinute] = option.value.split(":").map(Number);
        const optionTime = new Date(selectedDate);
        optionTime.setHours(optionHour, optionMinute);
        return (
          isAfter(optionTime, addMinutes(selectedTime, 29)) &&
          isBefore(optionTime, addMinutes(selectedTime, 61))
        );
      });

      setEndTimeOptions(options);
      setLoadingEndTime(false); // 終了時間のオプションが設定されたらローディングを終了
    } else {
      setEndTimeOptions([]);
      setLoadingEndTime(false);
    }
  }, [startTime, timeOptions, selectedDate]);

  return (
    <div
      className="p-4 mx-auto bg-white rounded-lg shadow-md flex flex-col space-y-3"
      style={{ minWidth: "300px", maxWidth: "100%" }}
    >
      <h1>面談予約</h1>
      <StaffList
        staff={staff}
        onSelect={setSelectedStaffMember}
        selectedTeacherId={selectedStaffMember}
      />
      {/* 日付ピッカーコンポーネント */}
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        locale={ja}
        minDate={new Date()}
        excludeDates={excludeDates}
        customInput={<CustomInput />}
        className="form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
      {/* 開始時間のためのセレクトコンポーネント */}
      <Select
        id="startselect"
        instanceId="startselect"
        options={timeOptions}
        value={startTime}
        onChange={handleStartTimeChange}
        placeholder="開始時間を選択..."
        className="basic-single"
        classNamePrefix="select"
      />
      {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
      {loadingEndTime ? (
        <p className="text-gray-500">終了時間を計算中...</p>
      ) : startTime ? (
        endTimeOptions.length > 0 ? (
          <Select
            id="endselect"
            instanceId="endselect"
            options={endTimeOptions}
            value={endTime}
            onChange={(option) => setEndTime(option)}
            placeholder="終了時間を選択..."
            className="basic-single"
            classNamePrefix="select"
          />
        ) : (
          <p className="text-red-500">
            選択できる終了時間はありません。
            <br />
            開始時間を変更してください。
          </p>
        )
      ) : (
        <p className="text-gray-500">開始時間を先に選択してください。</p>
      )}
    </div>
  );
};

export default TimeSelector;
