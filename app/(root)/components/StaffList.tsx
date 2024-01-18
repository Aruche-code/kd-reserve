import React from "react";
import { Staff } from "@/app/components/types";

/**
 * StaffList Component
 * @param {any} staffData - 職員のデータが入っていると予想されるオブジェクト
 * @param {any} staffError - データの取得に成功したかどうかを判断する
 * @param {Array} staff - 職員のデータを含む配列。
 * @param {Function} onSelect - 職員が選択された時に呼び出される関数。選択された職員のIDを引数として受け取る。
 * @param {String} selectedTeacherId - 現在選択されている職員のID。このIDは選択された職員をハイライト表示するために使用される。
 */

// スケルトンボディコンポーネント
const SkeletonBody = () => {
  return (
    <div className="animate-pulse flex flex-wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="p-2 m-1 border rounded bg-gray-200 w-48 h-12"
        ></div>
      ))}
    </div>
  );
};

interface StaffListProps {
  staffData: any;
  staffError: any;
  onSelect: (id: string | null) => void;
  selectedTeacherId: string | null;
}

const StaffList: React.FC<StaffListProps> = ({
  staffData,
  staffError,
  onSelect,
  selectedTeacherId,
}) => {
  // 職員のデータを取り出す
  const staff: Staff[] = staffData?.staffUsers || [];

  if (staffError) return <div>職員リストの取得に失敗。</div>;
  if (!staffData) return <SkeletonBody />;
  return (
    <div className="flex flex-wrap">
      <h1 className="w-full">先生一覧</h1>
      {/* 「指定なし」オプションを追加 */}
      <div
        onClick={() => onSelect(null)} // onSelectをnullで呼び出す
        className={`p-2 m-1 border rounded cursor-pointer ${
          selectedTeacherId === null ? "bg-blue-200" : "bg-white"
        }`}
      >
        <h2>指定なし</h2>
      </div>
      {/* 既存の職員リスト表示 */}
      {staff.map((staffMember) => (
        <div
          key={staffMember.id}
          onClick={() => onSelect(staffMember.id)}
          className={`p-2 m-1 border rounded cursor-pointer ${
            selectedTeacherId === staffMember.id ? "bg-blue-200" : "bg-white"
          }`}
        >
          <h2>{staffMember.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
