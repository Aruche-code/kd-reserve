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
  selectedDate: Date;
  startTime: OptionType | null;
  endTime: OptionType | null;
  resetAll: () => void;
}

const BookingPost: React.FC<BookingPostProps> = ({
  selectedStaffMember,
  selectedTag,
  selectedDate,
  startTime,
  endTime,
  resetAll,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [message, setMessage] = useState("");

  const isAnyFieldNull = () => {
    return (
      !selectedStaffMember ||
      !selectedTag ||
      !selectedDate ||
      !startTime ||
      !endTime
    );
  };

  const handleWaitingSubmit = async () => {
    if (isAnyFieldNull()) {
      toast.error(
        "予約内容、職員、日付、開始時間、\n終了時間を選択してください"
      );
      return;
    }

    setIsLoading(true); // 送信処理開始
    // setMessage(""); // メッセージをリセット

    const data = {
      staffUserId: selectedStaffMember,
      details: selectedTag,
      firstYmd: format(selectedDate, "yyyy-MM-dd"),
      firstStartTime: startTime?.value,
      firstEndTime: endTime?.value,
      secondYmd: null,
      secondStartTime: null,
      secondEndTime: null,
      thirdYmd: null,
      thirdStartTime: null,
      thirdEndTime: null,
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
      <button onClick={handleWaitingSubmit} disabled={isLoading}>
        {isLoading ? "送信中..." : "Submit"}
      </button>
      {/* <p>{message}</p> メッセージの表示 */}
    </>
  );
};

export default BookingPost;
