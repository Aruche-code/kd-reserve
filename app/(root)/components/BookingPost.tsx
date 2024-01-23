import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

/**
 * StaffList Component
 * @param {any} staffData - 職員のデータが入っていると予想されるオブジェクト
 */

//ヘルパー関数
const findStaffNameById = (
  staffData: any,
  selectedStaffMember: string | null
) => {
  for (let i = 0; i < staffData.staffUsers.length; i++) {
    if (staffData.staffUsers[i].id === selectedStaffMember) {
      return staffData.staffUsers[i].name;
    }
  }
  return "指名なし";
};

interface OptionType {
  value: string;
  label: string;
}

interface BookingPostProps {
  staffData: any;
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
  staffData,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルを開く関数
  const openModal = () => setIsModalOpen(true);

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsModalOpen(false);
    setIsLoading(false); // モーダルを閉じるときにローディング状態もリセット
  };

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

  const isAnyThirdFieldNull = () => {
    return (
      !thirdPreferenceDate ||
      !thirdPreferenceStartTime ||
      !thirdPreferenceEndTime
    );
  };

  const handleConfirmSubmit = async () => {
    closeModal();
    setIsLoading(true); // 送信処理開始
    if (isAnyFieldNull()) {
      toast.error("予約内容、第一希望日時、\n第二希望日時は必須です。", {
        style: {
          textAlign: "center",
          color: "#ef4444",
          lineHeight: "1.5",
          fontSize: "14px",
        },
      });
      setIsLoading(false);
      return;
    }

    if (isAnyThirdFieldNull()) {
      toast.error("第三希望日の入力に不備があります。", {
        style: {
          textAlign: "center",
          color: "#ef4444",
          lineHeight: "1.5",
          fontSize: "14px",
        },
      });
      setIsLoading(false);
      return;
    }

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

  // モーダルのレンダリング
  const renderModal = () => (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="p-3 px-6 rounded-t-md bg-kd-s text-white text-center">
          予約内容を確認
        </div>
        <div>
          <div>{selectedTag}</div>
          <div>{findStaffNameById(staffData, selectedStaffMember)}</div>
          <div>
            {firstPreferenceDate
              ? format(firstPreferenceDate, "yyyy-MM-dd")
              : null}
          </div>
          <div>{firstPreferenceStartTime?.value}</div>
          <div>{firstPreferenceEndTime?.value}</div>
          <div>
            {secondPreferenceDate
              ? format(secondPreferenceDate, "yyyy-MM-dd")
              : null}
          </div>
          <div>{secondPreferenceStartTime?.value}</div>
          <div>{secondPreferenceEndTime?.value}</div>
          <div>
            {thirdPreferenceDate
              ? format(thirdPreferenceDate, "yyyy-MM-dd")
              : null}
          </div>
          <div>{thirdPreferenceStartTime?.value}</div>
          <div>{thirdPreferenceEndTime?.value}</div>
          <button
            onClick={handleConfirmSubmit}
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
              {isLoading ? "送信中..." : "送信"}
            </div>
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 text-sm text-white rounded transition duration-300 ease-in-out transform bg-red-500 hover:bg-red-600 hover:scale-105 "
            style={{ minWidth: "100px" }} // 最小幅を設定
          >
            <div
              className="flex justify-center items-center"
              style={{ minWidth: "80px" }}
            >
              キャンセル
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={openModal}
        className="w-full px-4 py-1.5 text-sm shadow-md border border-kd-a_100 text-white rounded-b-md transition duration-300 ease-in-out transform bg-kd-a_100 hover:bg-blue-400 "
        style={{ minWidth: "100px" }}
      >
        <div
          className="flex justify-center items-center"
          style={{ minWidth: "80px" }}
        >
          確認
        </div>
      </button>

      {/* モーダルの条件付きレンダリング */}
      {(isModalOpen || isLoading) && renderModal()}
    </>
  );
};

export default BookingPost;
