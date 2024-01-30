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
  isSaturday,
  isSunday,
  format,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja"; // date-fnsの日本語ロケール
import CustomInput from "@/app/components/styles/DatePicker";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface OptionType {
  value: string;
  label: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const InterviewScheduler: React.FC = () => {
  const [startTimeOptions, setStartTimeOptions] = useState<OptionType[]>([]);
  // 選択された予約内容、職員、日付、時間、オプションの状態管理
  const [selectedStaffMember, setSelectedStaffMember] = useState<string | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [firstPreferenceDate, setFirstPreferenceDate] = useState<Date | null>(
    null
  );
  const [firstPreferenceStartTime, setFirstPreferenceStartTime] =
    useState<OptionType | null>(null);
  const [firstPreferenceEndTime, setFirstPreferenceEndTime] =
    useState<OptionType | null>(null);
  const [firstEndTimeOptions, setFirstEndTimeOptions] = useState<OptionType[]>(
    []
  );

  const [secondPreferenceDate, setSecondPreferenceDate] = useState<Date | null>(
    null
  );
  const [secondPreferenceStartTime, setSecondPreferenceStartTime] =
    useState<OptionType | null>(null);
  const [secondPreferenceEndTime, setSecondPreferenceEndTime] =
    useState<OptionType | null>(null);
  const [secondEndTimeOptions, setSecondEndTimeOptions] = useState<
    OptionType[]
  >([]);

  const [thirdPreferenceDate, setThirdPreferenceDate] = useState<Date | null>(
    null
  );
  const [thirdPreferenceStartTime, setThirdPreferenceStartTime] =
    useState<OptionType | null>(null);
  const [thirdPreferenceEndTime, setThirdPreferenceEndTime] =
    useState<OptionType | null>(null);
  const [thirdEndTimeOptions, setThirdEndTimeOptions] = useState<OptionType[]>(
    []
  );

  const [excludeDates, setExcludeDates] = useState<Date[]>([]);

  //
  //--------------------------------------------------関数エリア-------------------------------------------------------------------------
  //

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

  // 土日を除外する関数
  const isWeekday = (date: Date) => {
    return !isSaturday(date) && !isSunday(date);
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

  // 送信完了時リセット関数
  const resetAll = () => {
    setSelectedStaffMember(null);
    setSelectedTag(null);
    setFirstPreferenceDate(null);
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
    setSecondPreferenceDate(null);
    setSecondPreferenceStartTime(null);
    setSecondPreferenceEndTime(null);
    setThirdPreferenceDate(null);
    setThirdPreferenceStartTime(null);
    setThirdPreferenceEndTime(null);
  };

  const resetFirst = () => {
    setFirstPreferenceDate(null);
    setFirstPreferenceStartTime(null);
    setFirstPreferenceEndTime(null);
  };
  const resetSecond = () => {
    setSecondPreferenceDate(null);
    setSecondPreferenceStartTime(null);
    setSecondPreferenceEndTime(null);
  };
  const resetThird = () => {
    setThirdPreferenceDate(null);
    setThirdPreferenceStartTime(null);
    setThirdPreferenceEndTime(null);
  };

  // 開始時間を更新し、終了時間をリセットするハンドラー1
  const handleFirstStartTimeChange = (option: OptionType | null) => {
    setFirstPreferenceStartTime(option);
    setFirstPreferenceEndTime(null);
  };

  // 開始時間を更新し、終了時間をリセットするハンドラー2
  const handleSecondStartTimeChange = (option: OptionType | null) => {
    setSecondPreferenceStartTime(option);
    setSecondPreferenceEndTime(null);
  };
  // 開始時間を更新し、終了時間をリセットするハンドラー3
  const handleThirdStartTimeChange = (option: OptionType | null) => {
    setThirdPreferenceStartTime(option);
    setThirdPreferenceEndTime(null);
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

  //-------------------------------------1----------------------------------------
  //アンマウント、開始時間を生成
  useEffect(() => {
    setStartTimeOptions(generateTimeOptions());
  }, []);

  useEffect(() => {
    setFirstPreferenceDate(null);
    setSecondPreferenceDate(null);
    setThirdPreferenceDate(null);
  }, [selectedStaffMember]);

  // 開始時間が選択された時に終了時間のオプションを計算1
  useEffect(() => {
    if (firstPreferenceStartTime) {
      const generateEndTimeOptions = () => {
        const options: OptionType[] = [];
        const [hour, minute] = firstPreferenceStartTime.value
          .split(":")
          .map(Number);
        let time = new Date();
        time.setHours(hour, minute);

        // 選択された開始時間から30分後の時間を最初のオプションとして設定
        time = addMinutes(time, 30);

        // 17:00までの時間を30分刻みでオプションとして追加
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

      setFirstEndTimeOptions(generateEndTimeOptions());
    } else {
      // 開始時間が未選択の場合は終了時間のオプションをクリア
      setFirstEndTimeOptions([]);
    }
  }, [firstPreferenceStartTime]);

  // 開始時間が選択された時に終了時間のオプションを計算2
  useEffect(() => {
    if (secondPreferenceStartTime) {
      const generateEndTimeOptions = () => {
        const options: OptionType[] = [];
        const [hour, minute] = secondPreferenceStartTime.value
          .split(":")
          .map(Number);
        let time = new Date();
        time.setHours(hour, minute);

        // 選択された開始時間から30分後の時間を最初のオプションとして設定
        time = addMinutes(time, 30);

        // 17:00までの時間を30分刻みでオプションとして追加
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

      setSecondEndTimeOptions(generateEndTimeOptions());
    } else {
      // 開始時間が未選択の場合は終了時間のオプションをクリア
      setSecondEndTimeOptions([]);
    }
  }, [secondPreferenceStartTime]);

  // 開始時間が選択された時に終了時間のオプションを計算3
  useEffect(() => {
    if (thirdPreferenceStartTime) {
      const generateEndTimeOptions = () => {
        const options: OptionType[] = [];
        const [hour, minute] = thirdPreferenceStartTime.value
          .split(":")
          .map(Number);
        let time = new Date();
        time.setHours(hour, minute);

        // 選択された開始時間から30分後の時間を最初のオプションとして設定
        time = addMinutes(time, 30);

        // 17:00までの時間を30分刻みでオプションとして追加
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

      setThirdEndTimeOptions(generateEndTimeOptions());
    } else {
      // 開始時間が未選択の場合は終了時間のオプションをクリア
      setThirdEndTimeOptions([]);
    }
  }, [thirdPreferenceStartTime]);

  //-------------------------------------------------------------------------

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-full lg:w-4/5 bg-white rounded-md shadow-md">
        <div className="p-3 px-6 rounded-t-lg bg-kd-s text-white text-center">
          予約内容を選んでください
        </div>
        <div className=" m-4 bg-white rounded-md ">
          {/* 詳細エリア */}
          <h2 className="text-base font-bold p-4">
            <InfoIcon style={{ fontSize: "30px", opacity: 0.4 }} />
          </h2>
          <ReservationTags
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
          {/* 職員表示エリア */}
          <h2 className="text-base font-bold p-4">
            <PersonIcon style={{ fontSize: "30px", opacity: 0.4 }} />
          </h2>
          <StaffList
            staffData={staffData}
            staffError={staffError}
            onSelect={setSelectedStaffMember}
            selectedTeacherId={selectedStaffMember}
          />

          {/* 各希望日時選択 エリア*/}
          <div className="p-4 rounded-md">
            <h2 className=" text-base font-bold mb-4 mt-1"></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-0 m-0 sm:pb-7">
              {/* 第一希望日時 */}
              {/* 日付ピッカーコンポーネント */}
              <div className=" rounded p-2 mx-auto bg-slate-100">
                <span className="opacity-30 m-2 ">※必須</span>
                <div className="flex justify-between items-center">
                  <h1 className="ml-2 mt-3 mb-3">第一希望日を入力</h1>
                  <button
                    onClick={resetFirst}
                    className="mr-1 border-none rounded transition duration-300 ease-in-out transform hover:scale-110 focus:scale-110 focus:outline-none"
                  >
                    <DeleteForeverIcon style={{ opacity: 0.4 }} />
                  </button>
                </div>
                <div>
                  <DatePicker
                    selected={firstPreferenceDate}
                    onChange={(date: Date | null) => {
                      // onChange ハンドラーで選択された日付が null でない場合のみ状態を更新
                      if (date) {
                        setFirstPreferenceDate(date);
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    locale={ja}
                    minDate={new Date()}
                    excludeDates={excludeDates}
                    filterDate={isWeekday}
                    customInput={<CustomInput />} //デザインはここ
                  />
                </div>
                {/* 開始時間のためのセレクトコンポーネント */}
                <div>
                  <Select
                    id="startselect1"
                    instanceId="startselect1"
                    options={startTimeOptions}
                    value={firstPreferenceStartTime}
                    onChange={handleFirstStartTimeChange}
                    placeholder="開始時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                </div>
                {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
                {firstEndTimeOptions.length > 0 ? (
                  <Select
                    id="endselect0"
                    instanceId="endselect0"
                    options={firstEndTimeOptions}
                    value={firstPreferenceEndTime}
                    onChange={(option) => setFirstPreferenceEndTime(option)}
                    placeholder="終了時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                ) : (
                  <p className="text-red-500 text-xs text-center p-0.5 ">
                    選択できる終了時間はありません。
                    <br />
                    開始時間を変更してください。
                  </p>
                )}
              </div>

              {/* 第二希望日時 */}
              {/* 日付ピッカーコンポーネント   */}
              <div className=" rounded p-2 mx-auto bg-slate-100">
                <span className="opacity-30 m-2 ">※必須</span>
                <div className="flex justify-between items-center">
                  <h1 className="ml-2 mt-3 mb-3">第二希望日を入力</h1>
                  <button
                    onClick={resetSecond}
                    className="mr-1 border-none rounded transition duration-300 ease-in-out transform hover:scale-110 focus:scale-110 focus:outline-none"
                  >
                    <DeleteForeverIcon style={{ opacity: 0.4 }} />
                  </button>
                </div>
                <div>
                  <DatePicker
                    selected={secondPreferenceDate}
                    onChange={(date: Date | null) => {
                      // onChange ハンドラーで選択された日付が null でない場合のみ状態を更新
                      if (date) {
                        setSecondPreferenceDate(date);
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    locale={ja}
                    minDate={new Date()}
                    excludeDates={excludeDates}
                    filterDate={isWeekday}
                    customInput={<CustomInput />} //デザインはここ
                  />
                </div>
                {/* 開始時間のためのセレクトコンポーネント */}
                <div>
                  <Select
                    id="startselect1"
                    instanceId="startselect1"
                    options={startTimeOptions}
                    value={secondPreferenceStartTime}
                    onChange={handleSecondStartTimeChange}
                    placeholder="開始時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                </div>
                {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
                {secondEndTimeOptions.length > 0 ? (
                  <Select
                    id="endselect1"
                    instanceId="endselect1"
                    options={secondEndTimeOptions}
                    value={secondPreferenceEndTime}
                    onChange={(option) => setSecondPreferenceEndTime(option)}
                    placeholder="終了時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                ) : (
                  <p className="text-red-500 text-xs text-center p-0.5">
                    選択できる終了時間はありません。
                    <br />
                    開始時間を変更してください。
                  </p>
                )}
              </div>
              {/* 第三希望日時 */}
              {/* 日付ピッカーコンポーネント */}
              <div className=" rounded p-2 mx-auto bg-slate-100">
                <span className="opacity-30 m-2 ">※必須</span>
                <div className="flex justify-between items-center">
                  <h1 className="ml-2 mt-3 mb-3">第三希望日を入力</h1>
                  <button
                    onClick={resetThird}
                    className="mr-1 border-none rounded transition duration-300 ease-in-out transform hover:scale-110 focus:scale-110 focus:outline-none"
                  >
                    <DeleteForeverIcon style={{ opacity: 0.4 }} />
                  </button>
                </div>
                <div>
                  <DatePicker
                    selected={thirdPreferenceDate}
                    onChange={(date: Date | null) => {
                      // onChange ハンドラーで選択された日付が null でない場合のみ状態を更新
                      if (date) {
                        setThirdPreferenceDate(date);
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    locale={ja}
                    minDate={new Date()}
                    excludeDates={excludeDates}
                    filterDate={isWeekday}
                    customInput={<CustomInput />} //デザインはここ
                  />
                </div>
                {/* 開始時間のためのセレクトコンポーネント */}
                <div>
                  <Select
                    id="startselect2"
                    instanceId="startselect2"
                    options={startTimeOptions}
                    value={thirdPreferenceStartTime}
                    onChange={handleThirdStartTimeChange}
                    placeholder="開始時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                </div>
                {/* 選択された開始時間に基づいて終了時間のセレクトまたはメッセージを条件付きレンダリング */}
                {thirdEndTimeOptions.length > 0 ? (
                  <Select
                    id="endselect2"
                    instanceId="endselect2"
                    options={thirdEndTimeOptions}
                    value={thirdPreferenceEndTime}
                    onChange={(option) => setThirdPreferenceEndTime(option)}
                    placeholder="終了時間を選択..."
                    styles={customSelectStyles}
                    menuPlacement="auto"
                    isSearchable={false}
                  />
                ) : (
                  <p className="text-red-500 text-xs text-center p-0.5">
                    選択できる終了時間はありません。
                    <br />
                    開始時間を変更してください。
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* 送信ボタン */}
        </div>
        <div>
          <BookingPost
            staffData={staffData}
            selectedStaffMember={selectedStaffMember}
            selectedTag={selectedTag}
            firstPreferenceDate={firstPreferenceDate}
            firstPreferenceStartTime={firstPreferenceStartTime}
            firstPreferenceEndTime={firstPreferenceEndTime}
            secondPreferenceDate={secondPreferenceDate}
            secondPreferenceStartTime={secondPreferenceStartTime}
            secondPreferenceEndTime={secondPreferenceEndTime}
            thirdPreferenceDate={thirdPreferenceDate}
            thirdPreferenceStartTime={thirdPreferenceStartTime}
            thirdPreferenceEndTime={thirdPreferenceEndTime}
            resetAll={resetAll}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
