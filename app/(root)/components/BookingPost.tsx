import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
      !secondPreferenceEndTime ||
      !thirdPreferenceDate ||
      !thirdPreferenceStartTime ||
      !thirdPreferenceEndTime
    );
  };

  const handleConfirmSubmit = async () => {
    closeModal();
    setIsLoading(true);
    if (isAnyFieldNull()) {
      toast.error("予約内容、\n全ての希望日時は必須です。", {
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
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-kd-m p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg text-kd-a_100 font-semibold mb-4 ">
          予約内容を確認
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="col-span-2">
            <span className="font-medium">
              <span className="flex items-center">
                <InfoIcon style={{ marginRight: 5, opacity: 0.4 }} />
                {selectedTag}
              </span>
            </span>
          </p>
          <p className="col-span-2">
            <span className="font-medium">
              <span className="flex items-center">
                <PersonIcon style={{ marginRight: 5, opacity: 0.4 }} />
                {findStaffNameById(staffData, selectedStaffMember)}
              </span>
            </span>
          </p>
          <p className="col-span-2 mt-3">
            <span className="  font-bold text-kd-black-cl">
              希望日１:{"  "}
            </span>
            <span className="font-medium">
              {firstPreferenceDate
                ? format(firstPreferenceDate, "yyyy-MM-dd")
                : null}
              <span className="flex items-center mt-1">
                <AccessTimeIcon style={{ marginRight: 5, opacity: 0.4 }} />
                {firstPreferenceStartTime?.value}～
                {firstPreferenceEndTime?.value}
              </span>
            </span>
          </p>
          <p className="col-span-2 mt-3">
            <span className="  font-bold text-kd-black-cl">
              希望日２:{"  "}
            </span>
            <span className="font-medium">
              {secondPreferenceDate
                ? format(secondPreferenceDate, "yyyy-MM-dd")
                : null}
              <span className="flex items-center mt-1">
                <AccessTimeIcon style={{ marginRight: 5, opacity: 0.4 }} />
                {secondPreferenceStartTime?.value}～
                {secondPreferenceEndTime?.value}
              </span>
            </span>
          </p>
          <p className="col-span-2 mt-3">
            <span className="  font-bold text-kd-black-cl">
              希望日３:{"  "}
            </span>
            <span className="font-medium">
              {thirdPreferenceDate
                ? format(thirdPreferenceDate, "yyyy-MM-dd")
                : null}
              <span className="flex items-center">
                <AccessTimeIcon style={{ marginRight: 5, opacity: 0.4 }} />
                {thirdPreferenceStartTime?.value}～
                {thirdPreferenceEndTime?.value}
              </span>
            </span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleConfirmSubmit}
            disabled={isLoading}
            className={`px-4 py-1.5 text-sm text-white rounded transition duration-300 ease-in-out transform ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-kd-a_100 hover:bg-blue-400 hover:scale-105"
            }`}
          >
            {isLoading ? "送信中..." : "送信"}
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm text-white rounded transition duration-300 ease-in-out transform bg-red-500 hover:bg-red-600 hover:scale-105"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={openModal}
        className="w-full px-4 py-1.5 text-sm shadow-md border-none text-white rounded-b-md transition duration-300 ease-in-out transform bg-kd-a_100 hover:bg-blue-400 "
        style={{ minWidth: "100px" }}
      >
        <div
          className="flex justify-center items-center"
          style={{ minWidth: "80px" }}
        >
          確認
        </div>
      </button>

      {(isModalOpen || isLoading) && renderModal()}
    </>
  );
};

export default BookingPost;
