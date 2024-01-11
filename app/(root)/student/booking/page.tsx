"use client";

import useSWR from "swr";
import axios from "axios";
import StaffList from "../../components/StaffList";
import ReservationTags from "../../components/ReservationTags";
import BookingPost from "../../components/BookingPost";
import { Staff, StaffNgData } from "@/app/components/types";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { customSelectStyles } from "@/app/components/styles/ReactSelect";
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
import CustomInput from "@/app/components/styles/DatePicker";

interface OptionType {
  value: string;
  label: string;
}

interface NGTimeRangesType {
  [key: string]: string[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const InterviewScheduler: React.FC = () => {
  // 選択された予約内容、職員、日付、時間、オプションの状態管理
  const [selectedStaffMember, setSelectedStaffMember] = useState<string | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  //------------------------------------------------
  const [firstPreferenceDate, setFirstPreferenceDate] = useState(new Date());
  const [firstPreferenceStartTime, setFirstPreferenceStartTime] =
    useState<OptionType | null>(null);
  const [firstPreferenceEndTime, setFirstPreferenceEndTime] =
    useState<OptionType | null>(null);
  const [firstTimeOptions, setFirstTimeOptions] = useState<OptionType[]>([]);
  const [firstEndTimeOptions, setFirstEndTimeOptions] = useState<OptionType[]>(
    []
  );
  //--------------------------------------------------

  const [secondPreferenceDate, setSecondPreferenceDate] = useState(new Date());
  const [secondPreferenceStartTime, setSecondPreferenceStartTime] =
    useState<OptionType | null>(null);
  const [secondPreferenceEndTime, setSecondPreferenceEndTime] =
    useState<OptionType | null>(null);
  const [secondTimeOptions, setSecondTimeOptions] = useState<OptionType[]>([]);
  const [secondEndTimeOptions, setSecondEndTimeOptions] = useState<
    OptionType[]
  >([]);

  const [loadingEndTime, setLoadingEndTime] = useState(false);
  const [excludeDates, setExcludeDates] = useState<Date[]>([]);
  const [NGTimeRanges, setNGTimeRanges] = useState<NGTimeRangesType>({});

  // スタッフデータを取得
  const { data: staffData, error: staffError } = useSWR(
    "/api/student/booking",
    fetcher
  );

  // スタッフNG日時データを取得
  const { data: ngData, error: ngError } = useSWR(
    selectedStaffMember ? `/api/student/booking/${selectedStaffMember}` : null,
    fetcher
  );

  //送信完了時リセット
  const resetAll = () => {
    setSelectedStaffMember(null);
    setSelectedTag(null);
    setFirstPreferenceDate(new Date()); // 現在の日付または適当な初期日付
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
    // 他の必要な状態をリセット
  };

  // 開始時間を更新し、終了時間をリセットするハンドラー1
  const handleFirstStartTimeChange = (option: OptionType | null) => {
    setFirstPreferenceStartTime(option);
    setFirstPreferenceEndTime(null);
    setLoadingEndTime(true); // 開始時間が選択されたらローディングを開始
  };

  // 開始時間を更新し、終了時間をリセットするハンドラー2
  const handleSecondStartTimeChange = (option: OptionType | null) => {
    setSecondPreferenceStartTime(option);
    setSecondPreferenceEndTime(null);
    setLoadingEndTime(true); // 開始時間が選択されたらローディングを開始
  };

  useEffect(() => {
    // 選択されたスタッフに基づいてNG日を取得し更新
    if (ngData) {
      const newExcludeDates: Date[] = [];
      const newNGTimeRanges: NGTimeRangesType = {};

      ngData.staffNgData[0]?.staffng.forEach((ngDate: StaffNgData) => {
        const dateParts = ngDate.ymd
          .split("-")
          .map((part) => parseInt(part, 10));
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

        if (ngDate.time.includes("allng")) {
          newExcludeDates.push(dateObj);
        } else {
          newNGTimeRanges[ngDate.ymd] = ngDate.time;
        }
      });

      setExcludeDates(newExcludeDates);
      setNGTimeRanges(newNGTimeRanges);
    }
  }, [ngData]);

  //-------------------------------------1----------------------------------------
  // 選択された日付が変更された時に時間オプションを再計算
  useEffect(() => {
    // NG時間を除外して時間オプションを生成する関数を更新
    const generateTimeOptions = (firstPreferenceDate: Date): OptionType[] => {
      const options: OptionType[] = [];
      const dateString = format(firstPreferenceDate, "yyyy-MM-dd");
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

    setFirstTimeOptions(generateTimeOptions(firstPreferenceDate));
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
    setLoadingEndTime(false);
  }, [firstPreferenceDate, NGTimeRanges]);

  // 開始時間が選択された時に終了時間のオプションを計算
  useEffect(() => {
    if (!firstPreferenceStartTime) {
      setFirstEndTimeOptions([]);
      return;
    }
    if (firstPreferenceStartTime) {
      const selectedTime = new Date(firstPreferenceDate);
      const [hour, minute] = firstPreferenceStartTime.value
        .split(":")
        .map(Number);
      selectedTime.setHours(hour, minute);

      // 選択された開始時間に基づいて利用可能な終了時間をフィルタリング
      const options = firstTimeOptions.filter((option) => {
        const [optionHour, optionMinute] = option.value.split(":").map(Number);
        const optionTime = new Date(firstPreferenceDate);
        optionTime.setHours(optionHour, optionMinute);
        return (
          isAfter(optionTime, addMinutes(selectedTime, 29)) &&
          isBefore(optionTime, addMinutes(selectedTime, 61))
        );
      });

      setFirstEndTimeOptions(options);
      setLoadingEndTime(false); // 終了時間のオプションが設定されたらローディングを終了
    } else {
      setFirstEndTimeOptions([]);
      setLoadingEndTime(false);
    }
  }, [firstPreferenceStartTime, firstTimeOptions, firstPreferenceDate]);

  //-------------------------------------2-------------------------------
  // 選択された日付が変更された時に時間オプションを再計算
  useEffect(() => {
    // NG時間を除外して時間オプションを生成する関数を更新
    const generateTimeOptions = (secondPreferenceDate: Date): OptionType[] => {
      const options: OptionType[] = [];
      const dateString = format(secondPreferenceDate, "yyyy-MM-dd");
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

    setSecondTimeOptions(generateTimeOptions(secondPreferenceDate));
    setSecondPreferenceStartTime(null);
    setSecondPreferenceEndTime(null);
    setLoadingEndTime(false);
  }, [secondPreferenceDate, NGTimeRanges]);

  // 開始時間が選択された時に終了時間のオプションを計算
  useEffect(() => {
    if (!secondPreferenceStartTime) {
      setSecondEndTimeOptions([]);
      return;
    }
    if (secondPreferenceStartTime) {
      const selectedTime = new Date(secondPreferenceDate);
      const [hour, minute] = secondPreferenceStartTime.value
        .split(":")
        .map(Number);
      selectedTime.setHours(hour, minute);

      // 選択された開始時間に基づいて利用可能な終了時間をフィルタリング
      const options = secondTimeOptions.filter((option) => {
        const [optionHour, optionMinute] = option.value.split(":").map(Number);
        const optionTime = new Date(secondPreferenceDate);
        optionTime.setHours(optionHour, optionMinute);
        return (
          isAfter(optionTime, addMinutes(selectedTime, 29)) &&
          isBefore(optionTime, addMinutes(selectedTime, 61))
        );
      });

      setSecondEndTimeOptions(options);
      setLoadingEndTime(false); // 終了時間のオプションが設定されたらローディングを終了
    } else {
      setSecondEndTimeOptions([]);
      setLoadingEndTime(false);
    }
  }, [secondPreferenceStartTime, secondTimeOptions, secondPreferenceDate]);

  //-------------------------------------------------------------------------

  return (
    <div>
      <div
        className="p-8 mx-auto bg-c-black_100 rounded-lg shadow-md flex flex-col space-y-3"
        style={{ minWidth: "300px", maxWidth: "100%" }}
      >
        <ReservationTags
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <StaffList
          staffData={staffData}
          staffError={staffError}
          onSelect={setSelectedStaffMember}
          selectedTeacherId={selectedStaffMember}
        />
        {/* 第一希望日時 */}
        {/* 日付ピッカーコンポーネント */}
        <div className="w-60 bg-white rounded p-2 shadow-lg border border-c-black_200">
          <h1 className="m-2">第一希望日を入力</h1>
          <div>
            <DatePicker
              selected={firstPreferenceDate}
              onChange={(date: Date) => setFirstPreferenceDate(date)}
              dateFormat="yyyy-MM-dd"
              locale={ja}
              minDate={new Date()}
              excludeDates={excludeDates}
              customInput={<CustomInput />} //デザインはここ
            />
          </div>
          {/* 開始時間のためのセレクトコンポーネント */}
          <div>
            <Select
              id="startselect1"
              instanceId="startselect1"
              options={firstTimeOptions}
              value={firstPreferenceStartTime}
              onChange={handleFirstStartTimeChange}
              placeholder="開始時間を選択..."
              styles={customSelectStyles}
            />
          </div>
          {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
          {loadingEndTime ? (
            <p className="text-gray-500 text-xs p-0.5">終了時間を計算中...</p>
          ) : firstPreferenceStartTime ? (
            firstEndTimeOptions.length > 0 ? (
              <Select
                id="endselect1"
                instanceId="endselect1"
                options={firstEndTimeOptions}
                value={firstPreferenceEndTime}
                onChange={(option) => setFirstPreferenceEndTime(option)}
                placeholder="終了時間を選択..."
                styles={customSelectStyles}
              />
            ) : (
              <p className="text-red-500  text-xs p-0.5">
                選択できる終了時間はありません。
                <br />
                開始時間を変更してください。
              </p>
            )
          ) : (
            <p className="text-gray-500  text-xs p-0.5">
              開始時間を先に選択してください。
            </p>
          )}
        </div>

        {/* 第二希望日時 */}
        {/* 日付ピッカーコンポーネント */}
        <div className="w-60 bg-white rounded p-2 shadow-lg border border-c-black_200">
          <h1 className="m-2">第二希望日を入力</h1>
          <div>
            <DatePicker
              selected={secondPreferenceDate}
              onChange={(date: Date) => setSecondPreferenceDate(date)}
              dateFormat="yyyy-MM-dd"
              locale={ja}
              minDate={new Date()}
              excludeDates={excludeDates}
              customInput={<CustomInput />} //デザインはここ
            />
          </div>
          {/* 開始時間のためのセレクトコンポーネント */}
          <Select
            id="startselect2"
            instanceId="startselect2"
            options={secondTimeOptions}
            value={secondPreferenceStartTime}
            onChange={handleSecondStartTimeChange}
            placeholder="開始時間を選択..."
            styles={customSelectStyles}
          />
          {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
          {loadingEndTime ? (
            <p className="text-gray-500 text-xs p-0.5">終了時間を計算中...</p>
          ) : secondPreferenceStartTime ? (
            secondEndTimeOptions.length > 0 ? (
              <Select
                id="endselect2"
                instanceId="endselect2"
                options={secondEndTimeOptions}
                value={secondPreferenceEndTime}
                onChange={(option) => setSecondPreferenceEndTime(option)}
                placeholder="終了時間を選択..."
                styles={customSelectStyles}
              />
            ) : (
              <p className="text-red-500  text-xs p-0.5">
                選択できる終了時間はありません。
                <br />
                開始時間を変更してください。
              </p>
            )
          ) : (
            <p className="text-gray-500 text-xs p-0.5">
              開始時間を先に選択してください。
            </p>
          )}
        </div>

        <BookingPost
          selectedStaffMember={selectedStaffMember}
          selectedTag={selectedTag}
          selectedDate={firstPreferenceDate}
          startTime={firstPreferenceStartTime}
          endTime={firstPreferenceEndTime}
          resetAll={resetAll}
        />
      </div>
    </div>
  );
};

export default InterviewScheduler;
