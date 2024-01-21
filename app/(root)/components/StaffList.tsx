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
    <div className="animate-pulse m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="m-1 p-1 border rounded bg-gray-300 text-center"
        >
          <div className="h-5 mb-1 rounded" />
        </div>
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
    <div className="m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
      {/* 「指定なし」オプション */}
      <div
        onClick={() => onSelect(null)}
        className={`m-1 p-1 border rounded cursor-pointer shadow hover:shadow-md transition-all  ${
          selectedTeacherId === null ? "bg-blue-200" : "bg-white"
        } text-center`}
      >
        <h2>指定なし</h2>
      </div>
      {/* 既存の職員リスト表示 */}
      {staff.map((staffMember) => (
        <div
          key={staffMember.id}
          onClick={() => onSelect(staffMember.id)}
          className={`m-1 p-1 border rounded cursor-pointer shadow hover:shadow-md transition-all  ${
            selectedTeacherId === staffMember.id ? "bg-blue-200" : "bg-white"
          } text-center`}
        >
          <h2>{staffMember.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
