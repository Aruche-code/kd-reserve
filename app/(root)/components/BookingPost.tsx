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
      toast.error("予約内容、第一希望日時、\n第二希望日時は必須です。", {
        style: {
          textAlign: "center",
          color: "#ef4444",
          lineHeight: "1.5",
          fontSize: "14px",
        },
      });
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
        toast.success("予約を送信しました", {
          style: {
            textAlign: "center",
            lineHeight: "1.5",
            fontSize: "14px",
          },
        });
        resetAll();
      } else {
        toast.error("予約が送信できませんでした", {
          style: {
            textAlign: "center",
            lineHeight: "1.5",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      console.error("Error sending data: ", error);
      toast.error("エラーが発生しました", {
        style: {
          textAlign: "center",
          lineHeight: "1.5",
          fontSize: "14px",
        },
      });
    } finally {
      setIsLoading(false); // 送信処理終了
    }
  };

  return (
    <>
      <button
        onClick={handleWaitingSubmit}
        disabled={isLoading}
        className={`px-4 py-1.5 text-sm text-white rounded transition duration-300 ease-in-out transform ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-kd-a_100 hover:bg-blue-400 hover:scale-105"
        }`}
        style={{ minWidth: "100px" }} // 最小幅を設定
      >
        <div
          className="flex justify-center items-center"
          style={{ minWidth: "80px" }}
        >
          {/* テキストの幅を固定 */}
          {isLoading ? "送信中..." : "送信"}
        </div>
      </button>

      {/* <p>{message}</p> メッセージの表示 */}
    </>
  );
};

export default BookingPost;
