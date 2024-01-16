"use client";

import useSWR from "swr";
import axios from "axios";
import StaffList from "../../components/StaffList";
import ReservationTags from "../../components/ReservationTags";
import BookingPost from "../../components/BookingPost";
import { StaffNgData } from "@/app/components/types";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { customSelectStyles } from "@/app/components/styles/ReactSelect";
import {
  setHours,
  setMinutes,
  addMinutes,
  isSameDay,
  addDays,
  format,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja"; // date-fnsの日本語ロケール
import CustomInput from "@/app/components/styles/DatePicker";

interface OptionType {
  value: string;
  label: string;
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

  const [loadingEndTime, setLoadingEndTime] = useState(false);
  const [excludeDates, setExcludeDates] = useState<Date[]>([]);

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

  // NG日を考慮して初期値を設定する関数
  const setInitialDateConsideringNG = (ngDates: any) => {
    let initialDate = new Date();
    while (ngDates.some((ngDate: any) => isSameDay(ngDate, initialDate))) {
      initialDate = addDays(initialDate, 1);
    }
    setFirstPreferenceDate(initialDate);
  };

  //  NG日データが更新された時に初期値を設定
  useEffect(() => {
    if (ngData && ngData.staffNgData) {
      const newExcludeDates = ngData.staffNgData[0].staffng
        .filter((ng: any) => ng.time.includes("allng"))
        .map((ng: any) => new Date(ng.ymd));
      setExcludeDates(newExcludeDates);
      setInitialDateConsideringNG(newExcludeDates);
    }
  }, [ngData]);

  //送信完了時リセット
  const resetAll = () => {
    setSelectedStaffMember(null);
    setSelectedTag(null);
    setFirstPreferenceDate(new Date()); // 現在の日付または適当な初期日付
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
  };

  // 開始時間を更新し、終了時間をリセットするハンドラー1
  const handleFirstStartTimeChange = (option: OptionType | null) => {
    setFirstPreferenceStartTime(option);
    setFirstPreferenceEndTime(null);
    setLoadingEndTime(true); // 開始時間が選択されたらローディングを開始
  };

  // 開始時間を生成する関数
  const generateTimeOptions = (): OptionType[] => {
    const options: OptionType[] = [];
    let time = setHours(setMinutes(new Date(), 0), 9);

    while (time <= setHours(setMinutes(new Date(), 0), 17)) {
      const timeString = format(time, "HH:mm");
      options.push({
        value: timeString,
        label: timeString,
      });
      time = addMinutes(time, 30);
    }

    return options;
  };

  // 選択されたスタッフに基づいてNG日を取得し更新
  useEffect(() => {
    if (ngData) {
      const newExcludeDates: Date[] = [];
      ngData.staffNgData[0]?.staffng.forEach((ngDate: StaffNgData) => {
        const dateParts = ngDate.ymd
          .split("-")
          .map((part) => parseInt(part, 10));
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

        if (ngDate.time.includes("allng")) {
          newExcludeDates.push(dateObj);
        }
      });
      setExcludeDates(newExcludeDates);
    }
  }, [ngData]);

  console.log(ngData);

  //-------------------------------------1----------------------------------------
  //アンマウント、開始時間を生成
  useEffect(() => {
    setFirstTimeOptions(generateTimeOptions());
  }, []);

  // 選択された日付が変更された時にリセット
  useEffect(() => {
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
    setLoadingEndTime(false);
  }, [firstPreferenceDate]);

  // 開始時間が選択された時に終了時間のオプションを計算
  useEffect(() => {
    if (firstPreferenceStartTime) {
      const generateEndTimeOptions = () => {
        const options: OptionType[] = [];
        const [hour, minute] = firstPreferenceStartTime.value
          .split(":")
          .map(Number);
        let time = new Date(firstPreferenceDate);
        time.setHours(hour, minute);

        // 選択された開始時間から30分後の時間を最初のオプションとして設定
        time = addMinutes(time, 30);

        // 17:00までの時間を30分刻みでオプションとして追加
        while (
          time <= setHours(setMinutes(new Date(firstPreferenceDate), 0), 17)
        ) {
          const timeString = format(time, "HH:mm");
          options.push({
            value: timeString,
            label: timeString,
          });
          time = addMinutes(time, 30);
        }

        return options;
      };

      setFirstEndTimeOptions(generateEndTimeOptions());
    } else {
      // 開始時間が未選択の場合は終了時間のオプションをクリア
      setFirstEndTimeOptions([]);
    }
    setLoadingEndTime(false); // 終了時間のオプションが設定されたらローディングを終了
  }, [firstPreferenceStartTime, firstPreferenceDate]);

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

        <BookingPost
          selectedStaffMember={selectedStaffMember}
          selectedTag={selectedTag}
          firstPreferenceDate={firstPreferenceDate}
          firstPreferenceStartTime={firstPreferenceStartTime}
          firstPreferenceEndTime={firstPreferenceEndTime}
          resetAll={resetAll}
        />
      </div>
    </div>
  );
};

export default InterviewScheduler;
