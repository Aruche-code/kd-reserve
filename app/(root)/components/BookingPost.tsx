import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

interface OptionType {
  value: string;
  label: string;
}

interface BookingPostProps {
  selectedStaffMember: string | null;
  selectedTag: string | null;
  firstPreferenceDate: Date | null;
  firstPreferenceStartTime: OptionType | null;
  firstPreferenceEndTime: OptionType | null;
  secondPreferenceDate: Date | null;
  secondPreferenceStartTime: OptionType | null;
  secondPreferenceEndTime: OptionType | null;
  thirdPreferenceDate: Date | null;
  thirdPreferenceStartTime: OptionType | null;
  thirdPreferenceEndTime: OptionType | null;
  resetAll: () => void;
}

const BookingPost: React.FC<BookingPostProps> = ({
  selectedStaffMember,
  selectedTag,
  firstPreferenceDate,
  firstPreferenceStartTime,
  firstPreferenceEndTime,
  secondPreferenceDate,
  secondPreferenceStartTime,
  secondPreferenceEndTime,
  thirdPreferenceDate,
  thirdPreferenceStartTime,
  thirdPreferenceEndTime,
  resetAll,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [message, setMessage] = useState("");

  const isAnyFieldNull = () => {
    return (
      !selectedTag || //予約内容
      !firstPreferenceDate ||
      !firstPreferenceStartTime ||
      !firstPreferenceEndTime ||
      !secondPreferenceDate ||
      !secondPreferenceStartTime ||
      !secondPreferenceEndTime
    );
  };

  const handleWaitingSubmit = async () => {
    if (isAnyFieldNull()) {
      toast.error("予約内容\n第一希望日時\n第二希望日時は必須です。");
      return;
    }

    setIsLoading(true); // 送信処理開始
    // setMessage(""); // メッセージをリセット

    const data = {
      staffUserId: selectedStaffMember,
      details: selectedTag,
      firstYmd: firstPreferenceDate
        ? format(firstPreferenceDate, "yyyy-MM-dd")
        : null,
      firstStartTime: firstPreferenceStartTime?.value,
      firstEndTime: firstPreferenceEndTime?.value,
      secondYmd: secondPreferenceDate
        ? format(secondPreferenceDate, "yyyy-MM-dd")
        : null,
      secondStartTime: secondPreferenceStartTime?.value,
      secondEndTime: secondPreferenceEndTime?.value,
      thirdYmd: thirdPreferenceDate
        ? format(thirdPreferenceDate, "yyyy-MM-dd")
        : null,
      thirdStartTime: thirdPreferenceStartTime?.value,
      thirdEndTime: thirdPreferenceEndTime?.value,
    };

    try {
      const response = await axios.post("/api/student/booking", data);
      // ステータスコードに応じたメッセージを設定
      if (response.status === 200) {
        toast.success("予約を送信しました");
        resetAll();
      } else {
        toast.error("予約が送信できませんでした");
      }
    } catch (error) {
      console.error("Error sending data: ", error);
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false); // 送信処理終了
    }
  };

  return (
    <>
      <button
        onClick={handleWaitingSubmit}
        disabled={isLoading}
        className={`max-w-xs px-6 py-2 rounded text-white font-bold transition duration-300 ease-in-out transform ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-kd-button-cl hover:bg-blue-500 hover:scale-110"
        }max-w-xs`}
      >
        {isLoading ? "送信中..." : "送信"}
      </button>

      {/* <p>{message}</p> メッセージの表示 */}
    </>
  );
};

export default BookingPost;
