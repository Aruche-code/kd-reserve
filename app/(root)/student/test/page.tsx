"use client";

// 12月を表すために11を使用する理由？
// JavaScriptでは、月のインデックスは0ベースです。つまり、1月が0、2月が1、と続き、12月は11になります。

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
import ja from "date-fns/locale/ja";
import CustomInput from "@/app/components/inputs/DatePicker";

type OptionType = {
  value: string;
  label: string;
};

type NGTimeRangesType = {
  [key: string]: string[]; // インデックスシグネチャ
};

// 終日NGの配列（将来的にはAPIから取得する）
const excludeDatesArray = [
  new Date(2023, 11, 29), // 2023年12月30日
  new Date(2024, 0, 5), // 2023年12月31日
];
// NG日時の配列（将来的にはこの形に加工してAPIから取得する）
const NGTimeRanges: NGTimeRangesType = {
  "2023-12-30": ["10:00", "10:30", "11:00", "11:30", "12:00"],
  "2023-12-31": ["14:00", "14:30", "15:00", "15:30", "16:00"],
};

//NG時間を考慮したリストを作成する関数
const generateTimeOptions = (selectedDate: Date): OptionType[] => {
  const options: OptionType[] = [];
  const dateString = format(selectedDate, "yyyy-MM-dd"); // 選択された日付の文字列
  const ngTimes = NGTimeRanges[dateString] || []; // 選択された日付に対するNG時間の配列

  let time = setHours(setMinutes(new Date(), 0), 9); // 9:00からスタート

  while (time <= setHours(setMinutes(new Date(), 0), 17)) {
    // 17:00まで
    const timeString = format(time, "HH:mm");
    if (!ngTimes.includes(timeString)) {
      // NG時間に含まれていない場合
      options.push({
        value: timeString,
        label: timeString,
      });
    }
    time = addMinutes(time, 30); // 30分加算
  }

  return options;
};

const TimeSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState<OptionType | null>(null);
  const [endTime, setEndTime] = useState<OptionType | null>(null);
  const [timeOptions, setTimeOptions] = useState<OptionType[]>([]);
  const [endTimeOptions, setEndTimeOptions] = useState<OptionType[]>([]);

  const handleStartTimeChange = (option: OptionType | null) => {
    setStartTime(option); // 開始時間を更新
    setEndTime(null); // 終了時間をリセット
  };

  useEffect(() => {
    setTimeOptions(generateTimeOptions(selectedDate));
    setStartTime(null);
    setEndTime(null);
  }, [selectedDate]);

  useEffect(() => {
    if (startTime) {
      const selectedTime = new Date(selectedDate);
      const [hour, minute] = startTime.value.split(":").map(Number);
      selectedTime.setHours(hour, minute);

      // 終了時間のオプションを生成
      const options = timeOptions.filter((option) => {
        const [optionHour, optionMinute] = option.value.split(":").map(Number);
        const optionTime = new Date(selectedDate);
        optionTime.setHours(optionHour, optionMinute);
        return (
          isAfter(optionTime, addMinutes(selectedTime, 29)) &&
          isBefore(optionTime, addMinutes(selectedTime, 61))
        );
      });

      // NG時間とのバッティングをチェック
      if (options.length > 0) {
        setEndTimeOptions(options);
      } else {
        setEndTimeOptions([]);
      }
    } else {
      setEndTimeOptions([]);
    }
  }, [startTime, timeOptions]);

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md flex flex-col space-y-3">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        locale={ja}
        minDate={new Date()}
        excludeDates={excludeDatesArray}
        customInput={<CustomInput />}
        className="form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
      <Select
        id="selectbox"
        instanceId="selectbox"
        options={timeOptions}
        value={startTime}
        onChange={handleStartTimeChange}
        placeholder="開始時間を選択..."
        className="basic-single"
        classNamePrefix="select"
      />
      {startTime ? (
        endTimeOptions.length > 0 ? (
          <Select
            id="selectbox2"
            instanceId="selectbox2"
            options={endTimeOptions}
            value={endTime}
            onChange={(option) => setEndTime(option)}
            placeholder="終了時間を選択..."
            className="basic-single"
            classNamePrefix="select"
          />
        ) : (
          <p className="text-red-500">
            選択できる終了時間はありません。開始時間を変更してください。
          </p>
        )
      ) : (
        <p className="text-gray-500">開始時間を先に選択してください。</p>
      )}
    </div>
  );
};

export default TimeSelector;
